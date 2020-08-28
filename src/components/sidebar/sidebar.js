/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState } from 'react'
import { useStateValue } from '../../state'
import { Link } from 'react-router-dom'

import styles from '../../styles/sidebar/sidebar.module.scss'
import ops from '../../styles/sidebar/options.module.scss'
import gear from '../../images/gear.png'

import Tips from './options/tips'
import Accent from './options/accent'

const Sidebar = ({ open, set }) => {
	const notMobile = window.screen.width >= 420
	if (notMobile) {
		return (
			<SidebarContent CTX={() => { }} />
		)
	} else {
		return (
			<>
				{open &&
					<SidebarContent CTX={() => set(!open)} />
				}
			</>
		)
	}
}

const SidebarContent = ({ CTX }) => {
	const [{
		compositions,
		composites
	},] = useStateValue()

	const [OPS, setOPS] = useState(false)

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

	const activeLI = pathname => {
		let path = window.location.pathname.split('/').slice(1)
		let windowPath = `/${path[0]}/${path[1]}/${path[2]}`
		return pathname === windowPath ? styles.active_li : null
	}
	return (
		<>
			<div id="sidebar" className={styles.sidebar}>
				<div className={styles.head}>
					<img
						className={styles.gear}
						src={gear}
						alt=""
						onClick={() => setOPS(!OPS)}
						draggable={false}
					/>
				</div>
				{OPS
					? <SidebarOptions />
					: <>
						<h1>Manage</h1>
						<p>Compositions</p>
						<ul>
							{manage.compositions.map((op, i) => (
								<Link key={i} to={`${manage.pathname}${op.pathname}`} onClick={() => CTX()}>
									<li className={activeLI(`${manage.pathname}${op.pathname}`)}>{op.name}</li>
								</Link>
							))}
						</ul>
						<p>Composites</p>
						<ul>
							{manage.composites.map((op, i) => (
								<Link key={i} to={`${manage.pathname}${op.pathname}`} onClick={() => CTX()}>
									<li className={activeLI(`${manage.pathname}${op.pathname}`)}>{op.name}</li>
								</Link>
							))}
						</ul>
						<h1>Assemble</h1>
						<ul>
							{assembler.composites.map((op, i) => (
								<Link key={i} to={`${assembler.pathname}${op.pathname}`} onClick={() => CTX()}>
									<li className={activeLI(`${assembler.pathname}${op.pathname}`)}>{op.name}</li>
								</Link>
							))
							}
						</ul >
						<h1>Workout</h1>
						<ul>
							<Link to={'/workout'}><li>Go</li></Link>
						</ul>
					</>
				}
			</div>
		</>
	)
}

const SidebarOptions = () => {
	const [{ options }, dispatch] = useStateValue()

	const logoutActions = async () => {
		await dispatch({ type: 'LOGOUT' })
		localStorage.removeItem('SQLifting-token')
		localStorage.removeItem('SQLifting-user')
		window.location.pathname = '/'
	}

	return (
		<div className={ops.options}>
			<h1>Options</h1>
			<ul>
				<Accent />
				<Tips />
			</ul>
			<h1 className={ops.logout} onClick={() => logoutActions()}>Logout</h1>
		</div>
	)
}

export default Sidebar