/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { useStateValue } from '../../../global/state'
import { BlockPicker } from 'react-color';
import useOutsideClick from '../../../utils/useOutsideClick'

import styles from '../../../styles/sidebar/options/picker.module.scss'

const Background = () => {
	const [{
		options,
		options: { backgroundOption }
	}, dispatch] = useStateValue()
	const [picker, setPicker] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (picker) setPicker(false)
	});

	const defaultColors = [
		'#171717',
		'#2b2b2b',
		'#919191',
		'#c7c7c7',
		'#e6e6e6',
	]

	const set = (color) => {
		let newOptions = {
			...options,
			backgroundOption: color
		}
		document.documentElement.style.setProperty('--app-background', color)
		localStorage.setItem('SQLifting-options', JSON.stringify(newOptions))
		dispatch({ type: 'OPTION_ACTION', options: newOptions })
	}

	return (
		<>
			<li className={styles.li}>
				<p>Background color</p>
				<span style={{ backgroundColor: backgroundOption }} onClick={() => setPicker(!picker)} />
			</li>
			{picker &&
				<div className={styles.picker} ref={ref}>
					<BlockPicker
						color={backgroundOption}
						colors={defaultColors}
						onChangeComplete={color => set(color.hex)}
					/>
				</div>
			}
		</>
	)
}

export default Background
