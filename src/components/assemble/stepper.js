import React from 'react'
import { useStateValue } from '../../state'

import stepper from '../../styles/assemble/stepper.scss'

import { makeStyles, Stepper as MStepper, Step, StepLabel } from '@material-ui/core';
import { Button } from 'godspeed'

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

const Stepper = (props) => {
	const { activeStep, setActiveStep } = props
	const [{ },] = useStateValue()

	const cls = useStyles()

	const steps = [
		'Choose Equipment',
		'Choose Exercise',
		'Choose Muscle'
	]

	return (
		<>
			<MStepper className={cls.root} activeStep={activeStep} alternativeLabel>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconProps={{
							classes: {
								root: cls.icon, active: cls.AI, completed: cls.CI
							}
						}}>
							{label}
						</StepLabel>
					</Step>
				))}
			</MStepper>
			{activeStep === steps.length ? (
				<>
					<p className={cls.instructions}>All steps completed</p>
					<Button text="Reset" onClick={() => setActiveStep(0)} />
				</>
			) : (
					<>
						<Button
							text="Back"
							disabled={activeStep === 0}
							onClick={() => setActiveStep(activeStep - 1)} />
						<Button
							text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							onClick={() => setActiveStep(activeStep + 1)} />
					</>
				)}
		</>
	)
}

export default Stepper
