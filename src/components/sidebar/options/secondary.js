import React, { useState, useRef } from 'react'
import { useStateValue } from '../../../global/state'
import { BlockPicker } from 'react-color';
import useOutsideClick from '../../../utils/useOutsideClick'

import styles from '../../../styles/sidebar/options/picker.module.scss'

const Secondary = () => {
	const [{ options }, dispatch] = useStateValue()
	const [picker, setPicker] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (picker) setPicker(false)
	});

	const defaultColors = [
		'#0c0c0c',
		'#206fa3',
		'#168a29',
		'#be0d0d',
		'#7926bd',
		'#383838',
		'#48989b',
		'#50b947',
		'#7c0606',
		'#b80ca9',
	]

	function set(color) {
		let newOptions = {
			...options,
			secondaryOption: color
		}
		document.documentElement.style.setProperty('--app-secondary', color)
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
	}

	return (
		<>
			<li className={styles.li}>
				<p>Secondary color</p>
				<span style={{ backgroundColor: options.secondaryOption }} onClick={() => setPicker(!picker)} />
			</li>
			{picker &&
				<div className={styles.picker} ref={ref}>
					<BlockPicker
						color={options.secondaryOption}
						colors={defaultColors}
						onChangeComplete={color => set(color.hex)}
					/>
				</div>
			}
		</>
	)
}

export default Secondary
