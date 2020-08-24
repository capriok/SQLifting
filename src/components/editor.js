/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../api/sqlifting'
import { useStateValue } from '../state'
import useUpdate from '../utils/useUpdate';

import styles from '../styles/editor.module.scss'
import { Button, Input } from 'godspeed'


const Editor = () => {
	const [{
		manager: {
			editor,
			editor: {
				group,
				table,
				entity
			}
		}
	}] = useStateValue()
	useEffect(() => {
		!isEmpty(entity) && console.log('%cEditing', 'color: lightskyblue', editor);
	}, [])

	const [value, setValue] = useState('')
	const update = useUpdate()

	const submit = (e) => {
		e.preventDefault()
		SQLifting.post('/post/entity_edit', { table: table, id: entity.id, edit: value })
			.then(() => update(`${group}s`, [`${table}s`]))
	}
	return (
		<div className={styles.editor}>
			<p className={styles.title}>{entity.name}</p>
			<form onSubmit={e => submit(e)}>
				<Input placeholder="Edit name" value={value} onChange={e => setValue(e.target.value)} />
				<Button type="submit" text="Submit" size="xsm" bg="rgb(44, 116, 175)" />
			</form>
		</div>
	)
}

export default Editor
