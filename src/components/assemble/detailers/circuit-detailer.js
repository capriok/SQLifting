import React from 'react'
import { useStateValue } from '../../../state/state'

import style from '../../../styles/assemble/detailers/circuit-detailer.module.scss'

import { Input } from 'godspeed'

const CircuitDetailer = () => {
	const [{
		assemble,
		assemble: {
			build
		}
	}, dispatch] = useStateValue()

	const setDuration = (val, i) => {
		let newMovements = [...build.movements]
		newMovements[i].durationValue = parseFloat(val)
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				build: {
					...build,
					movements: newMovements
				}
			}
		})
	}

	const setDurationType = (val, i) => {
		let newMovements = [...build.movements]
		newMovements[i].durationType = val
		dispatch({
			type: 'ASSEMBLE_ACTION',
			assemble: {
				...assemble,
				build: {
					...build,
					movements: newMovements
				}
			}
		})
	}

	return (
		<div className={style.circuit_detailer}>
			<div className={style.detailer_cont}>
				<h1>Movement details</h1>
				<div className={style.details}>
					{build.hasOwnProperty('movements') &&
						build.movements.map((mov, i) => (
							<div className={style.detail} key={i}>
								<p>{mov.name}</p>
								<div>
									<Input type="number" min={0} step={2} value={mov.durationValue} placeholder="Duration" onChange={e => setDuration(e.target.value, i)} />
									<select value={mov.durationType} onChange={e => setDurationType(e.target.value, i)}>
										<option value="Reps">Reps</option>
										<option value="Seconds">Seconds</option>
										<option value="Minutes">Minutes</option>
									</select>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default CircuitDetailer