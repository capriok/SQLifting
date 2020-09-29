import React from 'react'
import { useStateValue } from '../../../state/state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Tips = () => {
	const [{ options, options: { tipsOption } }, dispatch] = useStateValue()

	const set = () => {
		let newOptions = {
			...options,
			tipsOption: !tipsOption
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
	}

	return (
		<li>
			<p>Show tips</p>
			<label className={styles.switch}>
				<input
					type="checkbox"
					checked={tipsOption}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default Tips
