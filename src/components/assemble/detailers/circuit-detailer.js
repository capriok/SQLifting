import React from 'react'
import { useStateValue } from '../../../state/state'

import styles from '../../../styles/assemble/detailers/circuit-detailer.module.scss'

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
		if (val === '') val = 0
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
		<>
			{build.hasOwnProperty('movements') &&
				<div className={styles.circuit_detailer}>
					<div className={styles.detailer_cont}>
						<h1>Movement details</h1>
						<div className={styles.details}>
							{build.movements.map((mov, i) => (
								<div className={styles.detail} key={i}>
									<p>{mov.name}</p>
									<div>
										<Input
											// onWheel={() => console.log('wheel')}
											type="number"
											min={0}
											step={2}
											placeholder="Duration"
											onChange={e => setDuration(e.target.value, i)} />
										<select
											value={mov.durationType}
											onChange={e => setDurationType(e.target.value, i)}>
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
			}
		</>
	)
}

export default CircuitDetailer