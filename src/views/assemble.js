/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import useAssembleActions from '../components/actionbar/useAssembleActions'

import styles from '../styles/assemble/assemble.module.scss'

import check from '../images/check_black.png'

import Stepper from "../components/assemble/stepper";
import { Input, Button } from 'godspeed';
import { isEmpty } from 'lodash'
import ExercisesExtension from '../components/assemble/extensions/exercises'

const Assemble = () => {
	const [{
		composites,
		compositions,
		assemble: {
			steps,
			active,
			activeStep,
			activeEntities,
			build
		}
	},] = useStateValue()

	const {
		fullReset,
		setSteps,
		setActiveEntities,
		addToBuild,
		submitBuild
	} = useAssembleActions()

	const [name, setName] = useState('')

	useEffect(() => { return () => fullReset() }, [])

	useEffect(() => {
		setActiveEntities()
	}, [composites, compositions])

	useEffect(() => {
		setActiveEntities()
	}, [steps])

	useEffect(() => {
		setActiveEntities()
	}, [activeStep])

	useEffect(() => {
		setSteps()
	}, [active.entity])

	const submit = (e) => {
		e.preventDefault()
		submitBuild(name)
	}

	const activeEntity = entity => {
		const idleClass = styles.entity
		const activeClass = `${styles.entity} ${styles.active_entity}`
		const check = () => {
			if (build[activeEntities[0].table] === undefined) return idleClass
			let inBuild = build[activeEntities[0].table].id === entity.id
			return inBuild ? activeClass : idleClass
		}
		if (!isEmpty(build)) {
			return check()
		} else {
			return idleClass
		}
	}

	return (
		<>
			<div className={styles.stepper}>
				<Stepper />
			</div>
			<div className={styles.stepper_gap}></div>
			<div className={styles.assemble}>
				{activeStep < steps.length - 1
					? <>
						<div className={styles.entities}>
							{activeEntities.map((entity, i) => (
								<div key={i} className={styles.entity_cont}>
									<div className={activeEntity(entity)} onClick={() => addToBuild(entity)}>
										{/* {selector.selection.some(s => s.id === entity.id) && <img src={check} alt="" />} */}
										<div><p>{entity.name}</p></div>
									</div>
								</div>
							))}
						</div>
						<div className={styles.extension}>
							{name ? <p className={styles.title}>{name}</p> : <p className={styles.name_placeholder}></p>}
							<div className={styles.name_form}>
								<form onSubmit={e => submit(e)}>
									<Input placeholder="Give it a name" onChange={e => setName(e.target.value)} />
								</form>
							</div>
							<ExercisesExtension />
						</div>
					</>
					: <>
						<h1>Review</h1>
					</>
				}
			</div>
		</>
	)
}

export default Assemble
