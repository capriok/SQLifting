import React from 'react'
import { useStateValue } from '../../../global/state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Sidebar = ({ flipOtions }) => {
	const [{ options, components }, dispatch] = useStateValue()

	function set() {
		let newOptions = {
			...options,
			sidebarOption: !options.sidebarOption
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
		!components.sidebar && flipOtions()
	}

	return (
		<li>
			<p>Persistant sidebar</p>
			<label className={styles.switch}>
				<input
					type="checkbox"
					checked={options.sidebarOption}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default Sidebar
