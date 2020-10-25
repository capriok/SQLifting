/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-useless-escape: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../global/state'
import useUpdate from '../../utils/useUpdate';

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/editor.module.scss'
import { Button, Input } from 'godspeed'


const Editor = ({ preview }) => {
	const [{ user, options }] = useStateValue()

	useEffect(() => {
		!isEmpty(preview) && console.log('%cEditing', 'color: lightskyblue', preview);
	}, [])

	const [value, setValue] = useState('')
	const update = useUpdate()

	function submit(e) {
		e.preventDefault()
		SQLifting.post('/updateName', { table: preview.table, name: value, id: preview.id, uid: user.details.uid })
			.then(() => {
				update(preview.group, [`${preview.table}s`])
				setValue('')
			})
	}
	return (
		<>
			<p className={view.title}>{preview.name}</p>
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
