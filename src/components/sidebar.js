/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/sidebar.module.scss'

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