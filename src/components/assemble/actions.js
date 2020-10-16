/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../global/state'
import useAssembleActions from '../actionbar/useAssembleActions'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'

const AssembleActions = ({ state, dispatch }) => {
	const { steps, activeStep, readyForNext, currentBuild } = state

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
				<Button
					text="Submit"
					disabled={notLastStep || notReadyForNext || noBuildName}
					onClick={() => { }} />
			</>
		</div>
	)
}

export default AssembleActions
