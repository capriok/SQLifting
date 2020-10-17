import React from 'react'
import { useStateValue } from '../../../global/state'

import styles from '../../../styles/assemble/detailers/circuit-detailer.module.scss'

import { Input } from 'godspeed'

const CircuitDetailer = ({ state, dispatch }) => {

	const { circuitBuild: build } = state

	const setDurationValue = (val, i) => {
		if (val === '') val = 0
		dispatch({
			type: 'DETAIL_CI_BUILD',
			detail: { durationValue: parseFloat(val) },
			index: i
		})
	}

	const setDurationType = (val, i) => {
		dispatch({
			type: 'DETAIL_CI_BUILD',
			detail: { durationType: val },
			index: i
		})
	}

	return (
		<>
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
										onChange={e => setDurationValue(e.target.value, i)} />
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
		</>
	)
}

export default CircuitDetailer