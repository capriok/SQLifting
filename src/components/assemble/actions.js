/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../state/state'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'

const AssembleActions = () => {
	const [{
		assemble,
		assemble: {
			steps,
			activeStep
		}
	}, dispatch] = useStateValue()

	const setStep = (val) => {
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				activeStep: val
			}
		})
	}
	return (
		<div className={styles.assemble_actions}>
			{/* <div className={styles.select_group}></div> */}
			{activeStep === steps.length
				? <>
					<Button text="Reset" onClick={() => setStep(0)} />
				</>
				: <>
					<Button
						text="Back"
						disabled={activeStep === 0 || activeStep === steps.length}
						onClick={() => activeStep > 0 && setStep(activeStep - 1)} />
					<Button
						text="Next"
						disabled={activeStep === steps.length - 1 || activeStep === steps.length}
						onClick={() => setStep(activeStep + 1)} />
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
