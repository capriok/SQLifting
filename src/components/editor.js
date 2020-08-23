/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState } from 'react'
import { useStateValue } from '../state'

import styles from '../styles/editor.module.scss'
import { SQLifting } from '../api/sqlifting'
import { Button, Input } from 'godspeed'

const Editor = () => {
	const [{ actionState: { edit: { entity: { ent } } } }] = useStateValue()
	const [value, setValue] = useState('')
	Object.keys(ent).length > 0 && console.log('%cEditing', 'color: lightskyblue', ent);

	const submit = (e) => {
		e.preventDefault()
		SQLifting.post('/edit/compositions', {})
			.then(res => console.log(res))
	}
	if (ent.name) {
		return (
			<div className={styles.editor}>
				<p className={styles.title}>{ent.name}</p>
				<form onSubmit={e => submit(e)}>
					<Input placeholder="Edit name" value={value} onChange={e => setValue(e.target.value)} />
					<Button type="submit" text="Submit" size="xsm" bg="rgb(44, 116, 175)" />
				</form>
			</div>)
	} else {
		return (
			<div className={styles.editor}>
				<p className={styles.title}>Select an entity to preview or edit</p>
			</div>
		)
	}
}

export default Editor
