/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../state/state'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'
import useAssembleActions from '../actionbar/useAssembleActions'

const AssembleActions = () => {
	const [{
		assemble,
		assemble: {
			steps,
			activeStep
		}
	}, dispatch] = useStateValue()

	const { setActiveStep } = useAssembleActions()

	return (
		<div className={styles.assemble_actions}>
			{/* <div className={styles.select_group}></div> */}
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
						disabled={activeStep === steps.length - 1 || activeStep === steps.length}
						onClick={() => setActiveStep(activeStep + 1)} />
					<Button
						text="Submit"
						disabled={activeStep < steps.length - 1}
						onClick={() => { }} />
				</>
			}

		</div>
	)
}

export default AssembleActions
