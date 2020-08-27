/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../state'

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/selector.module.scss'
import X from '../../gallery/x_black.png'
import useManageActions from '../../utils/useManageActions';

const Selector = () => {
	const [{
		manage: {
			selector: {
				selection
			}
		}
	}] = useStateValue()


	return (
		<div className={view.extension}>
			<p className={view.title}>Selection</p>
			<div className={styles.selector}>
				<ul>
					{selection.map((entity, i) => (
						<li key={i}>
							<span>{entity.name}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Selector
