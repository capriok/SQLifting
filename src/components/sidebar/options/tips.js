import React from 'react'
import { useStateValue } from '../../../state'
import styles from '../../../styles/sidebar/options/toggle.module.scss'

const Tips = () => {
	const [{ options, options: { tips } }, dispatch] = useStateValue()

	const set = () => {
		let newOptions = {
			...options,
			tips: !tips
		}
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTIONS_ACTION', options: newOptions })
	}

	return (
		<li>
			<p>Toggle tips</p>
			<label className={styles.switch}>
				<input
					type="checkbox"
					checked={tips}
					onChange={() => set()}
				/>
				<span />
			</label>
		</li>
	)
}

export default Tips
