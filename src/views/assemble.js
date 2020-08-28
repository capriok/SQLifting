import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import useAssembleActions from '../components/actionbar/useAssembleActions'
import useActiveByPath from '../utils/useActiveByPath'
import styles from '../styles/assemble/assemble.module.scss'

const Assemble = () => {
	const [{ },] = useStateValue()
	useEffect(() => {
		console.log('ASSEMBLE');
		return () => fullReset()
	}, [])
	const activeByPath = useActiveByPath()
	const { fullReset } = useAssembleActions()

	console.log(activeByPath);

	return (
		<>
			<h1 className={styles.assemble}>Assemble</h1>
		</>
	)
}

export default Assemble
