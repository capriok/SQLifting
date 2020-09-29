import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../../../state/state'
import { BlockPicker } from 'react-color';
import styles from '../../../styles/sidebar/options/picker.module.scss'

const Secondary = () => {
	const [{
		options,
		options: { secondaryOption }
	}, dispatch] = useStateValue()
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

	const set = (color) => {
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
				<span style={{ backgroundColor: secondaryOption }} onClick={() => setPicker(!picker)} />
			</li>
			{picker &&
				<div className={styles.picker} ref={ref}>
					<BlockPicker
						color={secondaryOption}
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


export default Secondary
