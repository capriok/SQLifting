/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../api/sqlifting'
import { useStateValue } from '../state'
import useUpdate from '../utils/useUpdate';

import styles from '../styles/selector.module.scss'


const Selector = () => {
	const [{
		manager: {
			selector,
		}
	}] = useStateValue()

	const update = useUpdate()

	return (
		<div className={styles.selector}>
			<p className={styles.title}>Selector</p>
		</div>
	)
}

export default Selector
