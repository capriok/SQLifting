/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../global/state'
import useAssembleActions from '../actionbar/useAssembleActions'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'

const AssembleActions = () => {
	const [{
		assemble: {
			steps,
			activeStep,
			readyForNext,
			build
		}
	},] = useStateValue()

	const { incStep, decStep, resetSteps, submitBuild } = useAssembleActions()

	return (
		<div className={styles.assemble_actions}>
			{activeStep === steps.length
				? <>
					<Button text="Reset" onClick={() => resetSteps()} />
				</>
				: <>
					<Button
						text="Back"
						disabled={activeStep === 0 || activeStep === steps.length}
						onClick={() => activeStep > 0 && decStep()} />
					<Button
						text="Next"
						disabled={activeStep === steps.length - 1 || activeStep === steps.length || !readyForNext}
						onClick={() => incStep()} />
					<Button
						text="Submit"
						disabled={activeStep < steps.length - 1 || !build.name || !readyForNext}
						onClick={() => submitBuild()} />
				</>
			}
		</div>
	)
}

export default AssembleActions
