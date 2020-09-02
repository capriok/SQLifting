/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../../state/state'

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/selector.module.scss'

const Selector = () => {
	const [{
		manage: {
			selector: {
				selection
			}
		}
	}] = useStateValue()

	const notMobile = window.screen.width >= 420

	return (
		<div className={view.extension}>
			<p className={view.title}>Selection</p>
			<div className={styles.selector}>
				{notMobile
					? <>
						{selection.length <= 0
							? <p className={styles.disclaimer}>Select entites to delete</p>
							: <ul>
								{selection.map((entity, i) => (
									<li key={i}>
										<span>{entity.name}</span>
									</li>
								))}
							</ul>
						}
					</>
					: <p className={styles.disclaimer}>Select entites to delete</p>
				}
			</div>
		</div >
	)
}

export default Selector
