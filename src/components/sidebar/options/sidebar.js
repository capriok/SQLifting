import React from 'react'
import { useStateValue } from '../../../state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Sidebar = ({ setSidebar, sidebarOpen, setOptions }) => {
	const [{ options, options: { sidebar } }, dispatch] = useStateValue()

	const set = () => {
		let newOptions = {
			...options,
			sidebar: !sidebar
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTIONS_ACTION', options: newOptions })
		setSidebar()
		!sidebarOpen && setOptions()
	}

	return (
		<li>
			<p>Show sidebar</p>
			<label className={styles.switch}>
				<input
					type="checkbox"
					checked={sidebar}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default Sidebar
