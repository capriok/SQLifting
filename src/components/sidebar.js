/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { useStateValue } from '../state'
import { Link } from 'react-router-dom'

import styles from '../styles/sidebar.module.scss'
import gear from '../gallery/gear.png'
import close from '../gallery/x_black.png'

const Sidebar = () => {
	const [{
		components,
		components: {
			sidebar
		},
		compositions,
		composites
	}, dispatch] = useStateValue()

	const router = {
		compositions: [
			{ name: 'Equipments', pathname: '/compositions/equipments', parent: compositions, entity: 'equipments' },
			{ name: 'Muscles', pathname: '/compositions/muscles', parent: compositions, entity: 'muscles' },
			{ name: 'Exercises', pathname: '/compositions/exercises', parent: compositions, entity: 'exercises' },
			{ name: 'Movements', pathname: '/compositions/movements', parent: compositions, entity: 'movements' }
		],
		composites: [
			{ name: 'Exercises', pathname: '/composites/exercises', parent: composites, entity: 'excos' },
			{ name: 'Circuits', pathname: '/composites/circuits', parent: composites, entity: 'circs' },
			{ name: 'Workouts', pathname: '/composites/workouts', parent: composites, entity: 'wocos' }
		]
	}

	const manage = {
		pathname: '/manage',
		compositions: [...router.compositions],
		composites: [...router.composites]
	}
	const assembler = {
		pathname: '/assemble',
		composites: [...router.composites]
	}

	const CTX = (op) => {
		window.innerWidth <= 750 && closeSidebar()
	}

	const activeLI = pathname => {
		let path = window.location.pathname.split('/').slice(1)
		let windowPath = `/${path[0]}/${path[1]}/${path[2]}`
		return pathname === windowPath ? styles.active_li : null
	}

	const closeSidebar = () => {
		dispatch({
			type: 'COMPONENT_ACTION',
			components: {
				...components,
				sidebar: false
			}
		})
	}

	return (
		<>
			{sidebar &&
				<div className={styles.sidebar}>
					<div className={styles.head}>
						<img className={styles.gear} src={gear} alt="" draggable={false} />
						<img className={styles.close} src={close} alt="" onClick={() => closeSidebar()} />
					</div>
					<h1>Manage</h1>
					<p>Compositions</p>
					<ul>
						{manage.compositions.map((op, i) => (
							<Link key={i}
								to={`${manage.pathname}${op.pathname}`}
								onClick={() => CTX()}>
								<li className={activeLI(`${manage.pathname}${op.pathname}`)}>{op.name}</li>
							</Link>
						))}
					</ul>
					<p>Composites</p>
					<ul>
						{manage.composites.map((op, i) => (
							<Link key={i}
								to={`${manage.pathname}${op.pathname}`}
								onClick={() => CTX()}>
								<li className={activeLI(`${manage.pathname}${op.pathname}`)}>{op.name}</li>
							</Link>
						))}
					</ul>
					<h1>Assemble</h1>
					<ul>
						{assembler.composites.map((op, i) => (
							<Link key={i}
								to={`${assembler.pathname}${op.pathname}`}
								onClick={() => CTX()}>
								<li className={activeLI(`${assembler.pathname}${op.pathname}`)}>{op.name}</li>
							</Link>
						))
						}
					</ul >
					<h1>Workout</h1>
					<ul>
						<Link to={'/workout'}><li>Go</li></Link>
					</ul>
				</div>
			}
		</>
	)
}

export default Sidebar