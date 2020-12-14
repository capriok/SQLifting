import React from 'react'
import { useStateValue } from '../../../global/state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

interface Props {
	flipOptions: () => void
}

const Sidebar: React.FC<Props> = ({ flipOptions }) => {
	const [{ options, components }, dispatch] = useStateValue()

	function set() {
		let newOptions = {
			...options,
			sidebarOption: !options.sidebarOption
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
		!components.sidebar && flipOptions()
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
