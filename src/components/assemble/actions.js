import React, { useState, useRef } from 'react'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../global/state'
import useUpdate from '../../utils/useUpdate'
import useOutsideClick from '../../utils/useOutsideClick'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'

const AssembleActions = ({ state, dispatch }) => {
	const [{ user }] = useStateValue()
	const update = useUpdate()
	const { steps, activeStep, readyForNext, currentBuild } = state
	const build = state[currentBuild]

	const [confirming, setConfirming] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	})

	const notReadyForNext = !readyForNext
	const isFirstStep = activeStep === 0
	const isLastStep = activeStep === steps.length - 1
	const notLastStep = activeStep < steps.length - 1
	const noBuildName = state[currentBuild] && !state[currentBuild].name

	function submitBuild() {
		console.log('%cSubmitted Build', 'color: lightskyblue;', build);
		let table
		switch (currentBuild) {
			case 'exerciseBuild':
				table = 'exco'
				break;
			case 'circuitBuild':
				table = 'circ'
				break;
			case 'workoutBuild':
				table = 'woco'
				break;
			default:
				break;
		}
		SQLifting.post(table, { build, uid: user.details.uid })
			.then(res => {
				update('composites', [table + 's'])
				console.log('%cSuccessfully inserted', 'color: lightskyblue;');
			})
			.catch(err => console.log(err))
	}

	return (
		<div className={styles.assemble_actions}>
			<>
				<Button
					text="Back"
					disabled={isFirstStep}
					onClick={() => dispatch({ type: 'DEC_ACTIVESTEP' })} />
				<Button
					text="Next"
					disabled={isLastStep || notReadyForNext}
					onClick={() => dispatch({ type: 'INC_ACTIVESTEP' })} />
				{confirming
					? <div ref={ref}>
						<Button
							text="Confirm"
							className={styles.warn}
							onClick={() => { submitBuild(); setConfirming(false) }} />
					</div>
					: <Button
						text="Submit"
						onClick={() => setConfirming(true)}
						disabled={notLastStep || notReadyForNext || noBuildName} />
				}
			</>
		</div>
	)
}

export default AssembleActions
