/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { isEmpty } from 'lodash'
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state'
import useUpdate from '../../utils/useUpdate';

import main from '../../styles/manage/main.module.scss'
import styles from '../../styles/manage/selector.module.scss'
import X from '../../gallery/x_black.png'
import useManagerActions from '../../utils/useManagerActions';

const Selector = () => {
	const [{
		manager: {
			selector: {
				selection
			}
		}
	}] = useStateValue()

	const { removeFromSelection } = useManagerActions()
	const update = useUpdate()

	return (
		<div className={main.extension}>
			<p className={main.title}>Selection</p>
			<div className={styles.selector}>
				<ul>
					{selection.map((entity, i) => (
						<li key={i}>
							<span>{entity.name}</span>
							<img
								src={X}
								alt=""
								draggable={false}
								onClick={() => removeFromSelection(entity.id)}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Selector
