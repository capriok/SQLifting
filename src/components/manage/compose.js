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
import Preview from './preview'

const Compose = () => {
	const [{
		user: {
			details: {
				uid
			}
		},
		options: {
			tipsOption
		}
	}] = useStateValue()
	const [value, setValue] = useState('')

	const update = useUpdate()

	const params = useParams()

	if (params.entities === 'excos' || params.entities === 'circs' || params.entities === 'wocos') return <Preview />

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
		SQLifting.post('/composition', { table: table, name: value, uid: uid })
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
				{tipsOption && <p className={styles.tip}>{tip()}</p>}
			</div>
		</>
	)
}

export default Compose
