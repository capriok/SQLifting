import React, { useState, useRef } from 'react'
import { useStateValue } from '../../../global/state'
import { BlockPicker } from 'react-color';
import useOutsideClick from '../../../utils/useOutsideClick'

import styles from '../../../styles/sidebar/options/picker.module.scss'

const Primary: React.FC = () => {
	const [{ options }, dispatch] = useStateValue()
	const [picker, setPicker] = useState(false)

	const ref: any = useRef()
	useOutsideClick(ref, () => {
		if (picker) setPicker(false)
	});

	const defaultColors = [
		'#757575',
		'#969696',
		'#bfbfbf',
		'#d1d1d1',
		'#f0f0f0',
	]

	function set(color) {
		let newOptions = {
			...options,
			primaryOption: color
		}
		document.documentElement.style.setProperty('--app-primary', color)
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
	}

	return (
		<>
			<li className={styles.li}>
				<p>Primary color</p>
				<span style={{ backgroundColor: options.primaryOption }} onClick={() => setPicker(!picker)} />
			</li>
			{picker &&
				<div className={styles.picker} ref={ref}>
					<BlockPicker
						color={options.primaryOption}
						colors={defaultColors}
						onChangeComplete={color => set(color.hex)}
					/>
				</div>
			}
		</>
	)
}

export default Primary
