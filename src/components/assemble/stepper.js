/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../state/state'

import stepper from '../../styles/assemble/stepper.scss'

import { makeStyles, Stepper as MStepper, Step, StepLabel } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: stepper.backgroundColor
	},
	icon: {
		color: stepper.stepperInactiveColor,
		"&$AI": { color: stepper.stepperActiveColor },
		"&$CI": { color: stepper.stepperCompletedColor }
	},
	AI: {},
	CI: {}
}))

const Stepper = () => {
	const [{
		assemble: {
			steps,
			activeStep
		}
	}] = useStateValue()

	const cls = useStyles()

	return (
		<>
			<MStepper className={cls.root} activeStep={activeStep} alternativeLabel>
				{steps.map((step, i) => (
					<Step key={i}>
						<StepLabel StepIconProps={{
							classes: { root: cls.icon, active: cls.AI, completed: cls.CI }
						}}>
							{step.label}
						</StepLabel>
					</Step>
				))}
			</MStepper>
		</>
	)
}

export default Stepper
