import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../../../state/state'
import { BlockPicker } from 'react-color';
import styles from '../../../styles/sidebar/options/picker.module.scss'

const Primary = () => {
	const [{
		options,
		options: { primaryOption }
	}, dispatch] = useStateValue()
	const [picker, setPicker] = useState(false)

	const ref = useRef();
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

	const set = (color) => {
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
				<span style={{ backgroundColor: primaryOption }} onClick={() => setPicker(!picker)} />
			</li>
			{picker &&
				<div className={styles.picker} ref={ref}>
					<BlockPicker
						color={primaryOption}
						colors={defaultColors}
						onChangeComplete={color => set(color.hex)}
					/>
				</div>
			}
		</>
	)
}

const useOutsideClick = (ref, callback) => {
	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};
	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	});
};


export default Primary
