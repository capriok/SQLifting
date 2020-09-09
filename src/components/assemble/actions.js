/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../state/state'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'
import useAssembleActions from '../actionbar/useAssembleActions'
import { buildQueries } from '@testing-library/react'

const AssembleActions = () => {
	const [{
		assemble: {
			steps,
			activeStep,
			readyForNext,
			build
		}
	},] = useStateValue()

	const { setActiveStep, submitBuild } = useAssembleActions()

	return (
		<div className={styles.assemble_actions}>
			<div className={styles.select_group}></div>
			{activeStep === steps.length
				? <>
					<Button text="Reset" onClick={() => setActiveStep(0)} />
				</>
				: <>
					<Button
						text="Back"
						disabled={activeStep === 0 || activeStep === steps.length}
						onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)} />
					<Button
						text="Next"
						disabled={activeStep === steps.length - 1 || activeStep === steps.length || !readyForNext}
						onClick={() => setActiveStep(activeStep + 1)} />
					<Button
						text="Submit"
						disabled={activeStep < steps.length - 1 || !build.name}
						onClick={() => submitBuild()} />
				</>
			}

		</div>
	)
}

export default AssembleActions
