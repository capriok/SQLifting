import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import useAssembleActions from '../components/actionbar/useAssembleActions'
import useActiveByPath from '../utils/useActiveByPath'
import styles from '../styles/assemble/assemble.module.scss'

import Stepper from "../components/assemble/stepper";

const Assemble = () => {
	const [{ },] = useStateValue()
	const activeByPath = useActiveByPath()
	const { fullReset } = useAssembleActions()

	useEffect(() => {
		return () => fullReset()
	}, [])


	const [activeStep, setActiveStep] = React.useState(0);

	const stepperProps = {
		activeStep, setActiveStep
	}

	return (
		<div className={styles.stepper}>
			<Stepper {...stepperProps} />
		</div>
	)
}

export default Assemble
