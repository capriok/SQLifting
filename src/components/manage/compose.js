/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state/state'
import useUpdate from '../../utils/useUpdate'

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/compose.module.scss'

import { Button, Input } from 'godspeed'

const Compose = () => {
	const [{ user, options }] = useStateValue()

	const [value, setValue] = useState('')

	const update = useUpdate()

	const params = useParams()

	if (params.group === 'composites') {
		if (params.entities === 'exercises' ||
			params.entities === 'circuits' ||
			params.entities === 'workouts')
			return (
				<>
					<div className={styles.preview}>
						<p className={view.title}>Select an entity to preview</p>
					</div>
					{ params.entities !== 'workouts' && options.tipsOption &&
						<center>{params.entities.capitalize()} are used to assemble Workouts</center>
					}
				</>
			)
	}

	const tip = () => {
		switch (params.entities) {
			case 'equipments':
				return ('Equipments are used to assemble exercises')
			case 'muscles':
				return ('Muscles are used to assemble exercises')
			case 'exercises':
				return ('Exercises are used to assemble exercises')
			case 'movements':
				return ('Movements are used to assemble circuits')
			default:
				break;
		}
	}

	const submit = (e) => {
		e.preventDefault()
		let table = params.entities.slice(0, -1)
		if (!value) return
		SQLifting.post('/composition', { table: table, name: value, uid: user.details.uid })
			.then(() => {
				update('compositions', [params.entities])
				setValue('')
			})
	}

	return (
		<>
			<p className={view.title}>Add {params.entities.slice(0, -1)}</p>
			<div className={styles.compose}>
				<form onSubmit={e => submit(e)}>
					<Input
						placeholder="Composition name"
						value={value}
						onChange={e => setValue(e.target.value.replace(/[^a-zA-Z&(\)\[\]\{\}\,\'\"\-+]+/ig, ''))} />
					<Button className={styles.submit} text="Submit" />
				</form>
				{options.tipsOption && <p className={styles.tip}>{tip()}</p>}
			</div>
		</>
	)
}

export default Compose
