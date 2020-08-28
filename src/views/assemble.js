import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import useAssembleActions from '../components/actionbar/useAssembleActions'
import useActiveByPath from '../utils/useActiveByPath'
import styles from '../styles/assemble/assemble.module.scss'
import stepper from '../styles/assemble/stepper.scss'

import { makeStyles, Stepper, Step, StepLabel } from '@material-ui/core';

import { Button } from 'godspeed'

const Assemble = () => {
	const [{ },] = useStateValue()
	const activeByPath = useActiveByPath()
	const { fullReset } = useAssembleActions()

	useEffect(() => {
		console.log(stepper);
		return () => fullReset()
	}, [])

	const [activeStep, setActiveStep] = React.useState(0);

	const useStyles = makeStyles(() => ({
		root: {
			backgroundColor: stepper.backgroundColor
		},
		step: {
			color: stepper.stepperInactiveColor,
			"&$AI": { color: stepper.stepperActiveColor },
			"&$CI": { color: stepper.stepperCompletedColor }
		},
		AI: {},
		CI: {}
	}))

	const cls = useStyles()


	const steps = [
		'Choose Equipment',
		'Choose Exercise',
		'Choose Muscle'
	]


	const nextStep = () => setActiveStep(activeStep + 1)
	const prevStep = () => setActiveStep(activeStep - 1)
	const resetSteps = () => setActiveStep(0)

	return (
		<>
			<Stepper
				className={cls.root}
				activeStep={activeStep}
				alternativeLabel>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconProps={{ classes: { root: cls.step, active: cls.AI, completed: cls.CI } }}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length ? (
				<>
					<p className={cls.instructions}>All steps completed</p>
					<Button text="Reset" onClick={resetSteps} />
				</>
			) : (
					<>
						<Button
							text="Back"
							disabled={activeStep === 0}
							onClick={prevStep} />
						<Button
							text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							onClick={nextStep} />
					</>
				)}
		</>
	)
}

export default Assemble
