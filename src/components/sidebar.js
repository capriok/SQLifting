import React from 'react'
import styles from '../styles/sidebar.module.scss'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	const manager = {
		route: '/manage:entId',
		compositions: [
			{ name: 'Equipment', },
			{ name: 'Muscles', },
			{ name: 'Exercises', },
			{ name: 'Movements', }
		],
		composites: [
			{ name: 'Circuits', },
			{ name: 'Exercises', },
			{ name: 'Workouts', }
		],
	}
	const assembler = {
		route: '/assemble',
		composites: [
			{ name: 'Circuits', },
			{ name: 'Exercises', },
			{ name: 'Workouts', }
		],
	}
	return (
		<>
			<div className={styles.sidebar}>
				<h1 className={styles.sql}>SQLifting</h1>
				<h1>Manage</h1>
				<h3>Compositions</h3>
				<ul className={styles.panel}>
					{manager.compositions.map((op, i) => (
						<Link to={manager.route} key={i}><li>{op.name}</li></Link>
					))}
				</ul>
				<h3>Composites</h3>
				<ul className={styles.panel}>
					{manager.compositions.map((op, i) => (
						<Link to={manager.route} key={i}><li>{op.name}</li></Link>
					))}
				</ul>
				<br />
				<h1>Assembly</h1>
				<ul className={styles.panel}>
					{assembler.composites.map((op, i) => (
						<Link to={assembler.route} key={i}><li>{op.name}</li></Link>
					))}
				</ul>
				<br />
				<h1 >Workout</h1>
				<ul className={styles.panel}>
					<Link to={'/workout'}><li>Go</li></Link>
				</ul>
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
// 			<Link to='/manager'><li>'Equipment'</li></Link>
// 			<Link to='/manager'><li>'Muscles'</li></Link>
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