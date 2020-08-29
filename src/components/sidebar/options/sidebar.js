import React from 'react'
import { useStateValue } from '../../../state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Sidebar = ({ setOptions }) => {
	const [{
		options,
		options: { sidebarOption },
		components,
		components: { sidebar }
	}, dispatch] = useStateValue()

	const flipSidebar = () => dispatch({ type: 'COMPONENT_ACTION', components: { ...components, sidebar: !sidebar } })

	const set = () => {
		let newOptions = {
			...options,
			sidebarOption: !sidebarOption
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
		flipSidebar()
		!sidebar && setOptions()
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
