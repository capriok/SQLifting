/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state'
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
			tips
		},
		manage: {
			active: {
				entity
			}
		}
	}] = useStateValue()
	const [value, setValue] = useState('')

	const update = useUpdate()

	if (entity === 'excos' || entity === 'circs' || entity === 'wocos') return <Preview />

	const tip = () => {
		switch (entity) {
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
		let table = entity.slice(0, -1)
		e.preventDefault()
		SQLifting.post('/post/composition', { table: table, name: value, uid: uid })
			.then(() => {
				update('compositions', [entity])
				setValue('')
			})
	}
	return (
		<>
			<div className={view.extension}>
				<p className={view.title}>Add {entity.slice(0, -1)}</p>
				<div className={styles.compose}>
					<form onSubmit={e => submit(e)}>
						<Input placeholder="Add name" value={value} onChange={e => setValue(e.target.value)} />
						<Button className={styles.submit} type="submit" text="Submit" size="xsm" />
					</form>
					{tips && <p className={styles.tip}>{tip()}</p>}
				</div>
			</div>
		</>
	)
}

export default Compose
