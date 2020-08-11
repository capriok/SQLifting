import React from 'react'
import styles from './styles/sidebar.module.scss'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	return (
		<>
			<div className={styles.sidebar}>
				<h1>Manage</h1>
				<h3>Compositions</h3>
				<ul className={styles.panel}>
					<Link to='/manager'><li>Equipment</li></Link>
					<Link to='/manager'><li>Muscles</li></Link>
					<Link to='/manager'><li>Exercises</li></Link>
					<Link to='/manager'><li>Movements</li></Link>
				</ul>
				<h3>Composites</h3>
				<ul className={styles.panel}>
					<Link to='/manager'><li>Circuits</li></Link>
					<Link to='/manager'><li>Exercises</li></Link>
					<Link to='/manager'><li>Workouts</li></Link>
				</ul>
				<br />
				<h1 >Assemble</h1>
				<h3>Composites</h3>
				<ul className={styles.panel}>
					<Link to={'/assembly'}><li>Circuits</li></Link>
					<Link to={'/assembly'}><li>Exercises</li></Link>
					<Link to={'/assembly'}><li>Workouts</li></Link>
				</ul>
				<br />
				<h1 >Workout</h1>
				<ul className={styles.panel}><Link to={'/workout'}>Go</Link></ul>
			</div>
		</>
	)
}

export default Sidebar



























// const [depth, setDepth] = React.useState({ a: false, b: false, c: false })
// let d = depth
// return (
// <>
// <div className={styles.sidebar}>
// 	<h1 onClick={() => setDepth({ a: !d.a, b: false, c: false })}>Manage</h1>
// 	{d.a && <>
// 		<h3>Compositions</h3>
// 		<ul className={styles.panel}>
// 			<Link to='/manager'><li>Equipment</li></Link>
// 			<Link to='/manager'><li>Muscles</li></Link>
// 			<Link to='/manager'><li>Exercises</li></Link>
// 			<Link to='/manager'><li>Movements</li></Link>
// 		</ul>
// 		<h3>Composites</h3>
// 		<ul className={styles.panel}>
// 			<Link to='/manager'><li>Circuits</li></Link>
// 			<Link to='/manager'><li>Exercises</li></Link>
// 			<Link to='/manager'><li>Workouts</li></Link>
// 		</ul>
// 	</>}
// 	<br />
// 	<h1 onClick={() => setDepth({ b: !d.b, a: false, c: false })}>Assemble</h1>
// 	{d.b && <>
// 		<h3>Composites</h3>
// 		<ul className={styles.panel}>
// 			<Link to={'/assembly'}><li>Circuits</li></Link>
// 			<Link to={'/assembly'}><li>Exercises</li></Link>
// 			<Link to={'/assembly'}><li>Workouts</li></Link>
// 		</ul>
// 	</>}
// 	<br />
// 	<h1 onClick={() => setDepth({ c: !d.c, a: false, b: false })}>Workout</h1>
// 	{d.c && <>
// 		<ul className={styles.panel}><Link to={'/workout'}>Go</Link></ul>
// 	</>}
// </div>
// </>
// )