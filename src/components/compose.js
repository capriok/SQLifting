/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { SQLifting } from '../api/sqlifting'
import { useStateValue } from '../state'
import useUpdate from '../utils/useUpdate'
import styles from '../styles/compose.module.scss'

import { Button, Input } from 'godspeed'
import Preview from '../components/preview'

const Compose = () => {
	const [{
		user: {
			details: {
				uid
			}
		},
		manager: {
			active: {
				group,
				entity
			}
		}
	}, dispatch] = useStateValue()
	const [value, setValue] = useState('')

	const update = useUpdate()

	if (entity === 'excos' || entity === 'circs' || entity === 'wocos') return <Preview />

	const submit = (e) => {
		let table = entity.slice(0, -1)
		e.preventDefault()
		SQLifting.post('/post/composition', { table: table, name: value, uid: uid })
			.then(() => { update('compositions', [entity]) })
	}
	return (
		<>
			<div className={styles.compose}>
				<p className={styles.title}>Add {entity.slice(0, -1)}</p>
				<form onSubmit={e => submit(e)}>
					<Input placeholder="Edit name" value={value} onChange={e => setValue(e.target.value)} />
					<Button type="submit" text="Submit" size="xsm" bg="rgb(44, 116, 175)" />
				</form>
			</div>
		</>
	)
}

export default Compose
