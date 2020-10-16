/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import useOutsideClick from '../../utils/useOutsideClick'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'

const AssembleActions = ({ state, dispatch }) => {
	const { steps, activeStep, readyForNext, currentBuild } = state

	const [confirming, setConfirming] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	});

	const notReadyForNext = !readyForNext
	const isFirstStep = activeStep === 0
	const isLastStep = activeStep === steps.length - 1
	const notLastStep = activeStep < steps.length - 1
	const noBuildName = state[currentBuild] && !state[currentBuild].name

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
				{
					confirming
						? <div ref={ref}>
							<Button
								text="Confirm"
								className={styles.warn}
								onClick={() => { setConfirming(false) }} />
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
