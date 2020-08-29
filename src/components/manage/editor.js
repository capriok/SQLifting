/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state'
import useUpdate from '../../utils/useUpdate';

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/editor.module.scss'
import { Button, Input } from 'godspeed'


const Editor = () => {
	const [{
		options: {
			tipsOption
		},
		manage: {
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
			.then(() => {
				console.log(group);
				console.log(table);
				update(group, [`${table}s`])
				setValue('')
			})
	}
	return (
		<div className={view.extension}>
			<p className={view.title}>{entity.name}</p>
			<div className={styles.editor}>
				<form onSubmit={e => submit(e)}>
					<Input placeholder="Edit name" value={value} onChange={e => setValue(e.target.value)} />
					<Button className={styles.submit} type="submit" text="Submit" size="xsm" />
				</form>
				{tipsOption && <p className={styles.tip}>Change entity name</p>}
			</div>
		</div>
	)
}

export default Editor
