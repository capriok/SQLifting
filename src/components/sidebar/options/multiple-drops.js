import React from 'react'
import { useStateValue } from '../../../global/state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const MultipleDrops = ({ setAcrd }) => {
	const [{ options }, dispatch] = useStateValue()

	function set() {
		let newOptions = {
			...options,
			dropsOption: !options.dropsOption
		}
		options.dropsOption && setAcrd({ a: true })
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
	}

	return (
		<li>
			<p>Multiple Dropdowns</p>
			<label className={styles.switch}>
				<input
					type="checkbox"
					checked={options.dropsOption}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default MultipleDrops
