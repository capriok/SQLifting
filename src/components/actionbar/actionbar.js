/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state/state'
import useActiveByPath from '../../utils/useActiveByPath'

import styles from '../../styles/general/actionbar.module.scss'
import ManageActions from '../manage/actions'
import AssembleActions from '../assemble/actions'

const Actionbar = () => {
	const [{
		manage,
		assemble
	}] = useStateValue()

	const activeByPath = useActiveByPath()

	return (
		<>
			<div className={styles.actionbar}>
				<h1>{activeByPath.name}</h1>
				{!isEmpty(manage.active) && <ManageActions />}
				{!isEmpty(assemble.active) && <AssembleActions />}
			</div>
		</>
	)
}

export default Actionbar
