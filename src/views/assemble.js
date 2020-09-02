import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'
import useActiveByPath from '../utils/useActiveByPath'
import styles from '../styles/assemble/assemble.module.scss'

import Stepper from "../components/assemble/stepper";

const Assemble = () => {
	const [{ composites, assemble: { active } },] = useStateValue()
	const activeByPath = useActiveByPath()
	const { fullReset } = useAssembleActions()

	const [entities, setEntities] = useState([])

	useEffect(() => {
		return () => fullReset()
	}, [])

	useEffect(() => {
		setEntities(active.groupState[active.entity])
	}, [active])


	let stepLabels = []
	switch (activeByPath.entity) {
		case 'excos':
			stepLabels = [
				'Choose Equipment',
				'Choose Exercise',
				'Choose Muscle',
				'Review'
			]
			break;
		case 'circs':
			stepLabels = [
				'Choose Movements',
				'Detail Movements',
				'Review',
			]
			break;
		case 'wocos':
			stepLabels = [
				'Choose Exercises',
				'Choose Circuits',
				'Review',
			]
			break;
		default:
			break;
	}

	const [activeStep, setActiveStep] = React.useState(0);

	const stepperProps = { activeStep, setActiveStep, stepLabels }

	return (
		<div className={styles.stepper}>
			<Stepper {...stepperProps} />
			{entities.map((entity, i) => (
				<div>{entity.name}</div>
			))}
		</div>
	)
}

export default Assemble
