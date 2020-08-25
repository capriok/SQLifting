/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state'
import useUpdate from '../../utils/useUpdate'

import main from '../../styles/manage/main.module.scss'
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
		manager: {
			active: {
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
			<div className={main.extension}>
				<p className={main.title}>Add {entity.slice(0, -1)}</p>
				<div className={styles.compose}>
					<form onSubmit={e => submit(e)}>
						<Input placeholder="Edit name" value={value} onChange={e => setValue(e.target.value)} />
						<Button className={styles.submit} type="submit" text="Submit" size="xsm" />
					</form>
				</div>
			</div>
		</>
	)
}

export default Compose
