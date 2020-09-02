import React from 'react'
import { useStateValue } from '../../../state/state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Sidebar = ({ flipOtions }) => {
	const [{
		options,
		options: { sidebarOption },
		components: { sidebar }
	}, dispatch] = useStateValue()

	const set = () => {
		let newOptions = {
			...options,
			sidebarOption: !sidebarOption
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
		!sidebar && flipOtions()
	}

	return (
		<li>
			<p>Persistant sidebar</p>
			<label className={styles.switch}>
				<input
					type="checkbox"
					checked={sidebarOption}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default Sidebar
