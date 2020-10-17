import React from 'react'

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

const Stepper = ({ state }) => {

	const cls = useStyles()

	return (
		<>
			<MStepper className={cls.root} activeStep={state.activeStep} alternativeLabel>
				{state.steps.map((step, i) => (
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
