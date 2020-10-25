import React from 'react'
import { useStateValue } from '../../../global/state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Tips = () => {
	const [{ options }, dispatch] = useStateValue()

	function set() {
		let newOptions = {
			...options,
			tipsOption: !options.tipsOption
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
					checked={options.tipsOption}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default Tips
