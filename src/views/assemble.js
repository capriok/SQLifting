import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import useAssembleActions from '../utils/useAssembleActions'
import styles from '../styles/assemble.module.scss'

const Assemble = () => {
	const [{ },] = useStateValue()
	useEffect(() => {
		console.log('ASSEMBLE');
		return () => fullReset()
	}, [])
	const { fullReset } = useAssembleActions()

	return (
		<>
			<h1 className={styles.assemble}>Assemble</h1>
		</>
	)
}

export default Assemble
