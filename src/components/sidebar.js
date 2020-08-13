/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import styles from '../styles/sidebar.module.scss'
import { Link } from 'react-router-dom'

import { useStateValue } from '../state'
const Sidebar = () => {
	const [{ compositions, composites }, dispatch] = useStateValue()

	const router = {
		compositions: [
			{ name: 'Equipments', pathname: '/compositions/equipments', parent: compositions, entity: 'equipments' },
			{ name: 'Muscles', pathname: '/compositions/muscles', parent: compositions, entity: 'muscles' },
			{ name: 'Exercises', pathname: '/compositions/exercises', parent: compositions, entity: 'exercises' },
			{ name: 'Movements', pathname: '/compositions/movements', parent: compositions, entity: 'movements' }
		],
		composites: [
			{ name: 'Circuits', pathname: '/composites/circuits', parent: composites, entity: 'circs' },
			{ name: 'Exercises', pathname: '/composites/exercises', parent: composites, entity: 'excos' },
			{ name: 'Workouts', pathname: '/composites/workouts', parent: composites, entity: 'wocos' }
		]
	}

	const manager = {
		pathname: '/manage',
		compositions: [...router.compositions],
		composites: [...router.composites]
	}
	const assembler = {
		pathname: '/assemble',
		composites: [...router.composites]
	}

	const CTX = (op) => {
		dispatch({
			type: 'ACTIVE_ACTION',
			active: {
				name: op.name,
				parent: op.parent,
				entity: op.entity
			}
		})
	}

	return (
		<>
			<div className={styles.sidebar}>
				<h1 className={styles.sql}>SQLifting</h1>
				<h1>Manage</h1>
				<h3>Compositions</h3>
				<ul className={styles.panel}>
					{manager.compositions.map((op, i) => (
						<Link key={i}
							to={`${manager.pathname}${op.pathname}`}
							onClick={() => CTX(op)}>
							<li>{op.name}</li>
						</Link>
					))}
				</ul>
				<h3>Composites</h3>
				<ul className={styles.panel}>
					{manager.composites.map((op, i) => (
						<Link key={i}
							to={`${manager.pathname}${op.pathname}`}
							onClick={() => CTX(op)}>
							<li>{op.name}</li>
						</Link>
					))}
				</ul>
				<br />
				<h1>Assembly</h1>
				<ul className={styles.panel}>
					{assembler.composites.map((op, i) => (
						<Link key={i}
							to={`${assembler.pathname}${op.pathname}`}
							onClick={() => CTX(op)}>
							<li>{op.name}</li>
						</Link>
					))
					}
				</ul >
				<br />
				<h1 >Workout</h1>
				<ul className={styles.panel}>
					<Link to={'/workout'}><li>Go</li></Link>
				</ul>
			</div >
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