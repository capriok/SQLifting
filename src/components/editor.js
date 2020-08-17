import React, { useState } from 'react'
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'

import styles from '../styles/editor.module.scss'
import { SQLifting } from '../api/sqlifting'
import { Button, Input } from 'godspeed'

const Editor = () => {
	const [{ actionState: { edit: { entity: { ent } } } }] = useStateValue()
	const [value, setValue] = useState('')
	ent.name && console.log('%cEditing', 'color: lightskyblue', ent);
	if (!ent.name) return <div className={styles.editnull}></div>
	const submit = (e) => {
		e.preventDefault()
		SQLifting.post('/edit/compositions', {})
			.then(res => console.log(res))
	}
	return (
		<div className={styles.editor}>
			<p>{ent.name}</p>
			<form onSubmit={e => submit(e)}>
				<Input placeholder="Edit name" value={value} onChange={e => setValue(e.target.value)} />
				<Button type="submit" text="Submit" size="xsm" bg=" #0a3147" />
			</form>
		</div>
	)
}

export default Editor
