import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../../../state/state'
import { BlockPicker } from 'react-color';
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


export default Background
