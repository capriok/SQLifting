/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'

import view from '../../styles/manage/manage.module.scss'
import styles from '../../styles/manage/selector.module.scss'

interface Props {
	selection: any
}

const Selector: React.FC<Props> = ({ selection }) => {
	const notMobile = window.screen.width >= 420
	return (
		<>
			<p className={view.title}>Selection</p>
			<div className={styles.selector}>
				{notMobile
					? <>
						{selection.length <= 0
							? <p className={styles.disclaimer}>Select entites to delete</p>
							: <ul>
								{selection.map((entity, i) => <li key={i}><span>{entity.name}</span></li>)}
							</ul>
						}
					</>
					: <p className={styles.disclaimer}>Select entites to delete</p>
				}
			</div>
		</>
	)
}

export default Selector
