import React from 'react'
import styles from './styles/sidebar.module.scss'
import { useStateValue } from '../state'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	const [{ auth, focus }, dispatch] = useStateValue()
	const [depth, setDepth] = React.useState({ a: false, b: false, c: false })
	let d = depth
	return (
		<>
			<div className={styles.sidebar}>
				<h1 onClick={() => setDepth({ a: !d.a, b: false, c: false })}>Manage</h1>
				{d.a && <>
					<h3>Compositions</h3>
					<ul className={styles.panel}>
						<li><Link to='/manager'>Equipment</Link></li>
						<li><Link to='/manager'>Muscles</Link></li>
						<li><Link to='/manager'>Exercises</Link></li>
						<li><Link to='/manager'>Movements</Link></li>
					</ul>
					<h3>Composites</h3>
					<ul className={styles.panel}>
						<li><Link to='/manager'>Circuits</Link></li>
						<li><Link to='/manager'>Exercises</Link></li>
						<li><Link to='/manager'>Workouts</Link></li>
					</ul>
				</>}
				<br />
				<h1 onClick={() => setDepth({ b: !d.b, a: false, c: false })}>Assemble</h1>
				{d.b && <>
					<h3>Composites</h3>
					<ul className={styles.panel}>
						<li><Link to={'/assembly'}>Circuits</Link></li>
						<li><Link to={'/assembly'}>Exercises</Link></li>
						<li><Link to={'/assembly'}>Workouts</Link></li>
					</ul>
				</>}
				<br />
				<h1 onClick={() => setDepth({ c: !d.c, a: false, b: false })}>Workout</h1>
				{d.c && <>
					<ul className={styles.panel}><Link to={'/workout'}>Go</Link></ul>
				</>}
			</div>
		</>
	)
}

export default Sidebar