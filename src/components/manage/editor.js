/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state/state'
import useUpdate from '../../utils/useUpdate';

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/editor.module.scss'
import { Button, Input } from 'godspeed'


const Editor = ({ entity }) => {
	const [{ user, options }] = useStateValue()

	useEffect(() => {
		!isEmpty(entity) && console.log('%cEditing', 'color: lightskyblue', entity);
	}, [])

	const [value, setValue] = useState('')
	const update = useUpdate()

	const submit = (e) => {
		e.preventDefault()
		SQLifting.post('/updateName', { table: entity.table, name: value, id: entity.id, uid: user.details.uid })
			.then(() => {
				update(entity.group, [`${entity.table}s`])
				setValue('')
			})
	}
	return (
		<>
			<p className={view.title}>{entity.name}</p>
			<div className={styles.editor}>
				<form onSubmit={e => submit(e)}>
					<Input
						placeholder="Edit name"
						value={value}
						onChange={e => setValue(e.target.value.replace(/[^a-zA-Z&(\)\[\]\{\}\,\'\"\-+]+/ig, ''))} />
					<Button className={styles.submit} text="Submit" />
				</form>
				{options.tipsOption && <p className={styles.tip}>Change entity name</p>}
			</div>
		</>
	)
}

export default Editor
