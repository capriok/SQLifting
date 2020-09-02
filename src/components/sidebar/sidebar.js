/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState } from 'react'
import { useStateValue } from '../../state/state'
import { Link } from 'react-router-dom'

import styles from '../../styles/sidebar/sidebar.module.scss'
import ops from '../../styles/sidebar/options.module.scss'
import gear from '../../images/gear.png'

import TipsOption from './options/tips'
import AccentOption from './options/accent'
import SidebarOption from './options/sidebar'
import { useEffect } from 'react'

const notMobile = window.screen.width >= 420

const Sidebar = () => {
	const [{
		options: { sidebarOption },
		components,
		components: { sidebar }
	}, dispatch] = useStateValue()

	useEffect(() => { !notMobile && dispatch({ type: 'COMPONENT_ACTION', components: { ...components, sidebar: false } }) }, [])

	const flipSidebar = () => dispatch({ type: 'COMPONENT_ACTION', components: { ...components, sidebar: !sidebar } })

	if (notMobile) {
		if (!sidebarOption) {
			return (
				<>
					{(!sidebarOption && sidebar) &&
						<SidebarContent setSidebar={() => flipSidebar()} />
					}
				</>
			)
		} else {
			return (
				<>
					{sidebarOption &&
						< SidebarContent setSidebar={() => { }} />
					}
				</>
			)
		}
	} else {
		return (
			<>
				{sidebar &&
					<SidebarContent setSidebar={() => flipSidebar()} />
				}
			</>
		)
	}
}

const SidebarContent = ({ setSidebar }) => {
	const [optionsOpen, setOptions] = useState(false)

	const router = {
		compositions: [
			{ name: 'Equipments', pathname: '/compositions/equipments' },
			{ name: 'Muscles', pathname: '/compositions/muscles' },
			{ name: 'Exercises', pathname: '/compositions/exercises' },
			{ name: 'Movements', pathname: '/compositions/movements' }
		],
		composites: [
			{ name: 'Exercises', pathname: '/composites/exercises' },
			{ name: 'Circuits', pathname: '/composites/circuits' },
			{ name: 'Workouts', pathname: '/composites/workouts' }
		]
	}

	const manage = {
		pathname: '/manage',
		compositions: [...router.compositions],
		composites: [...router.composites]
	}
	const assemble = {
		pathname: '/assemble',
		composites: [...router.composites]
	}

	const activeLI = pathname => {
		let path = window.location.pathname.split('/').slice(1)
		let windowPath = `/${path[0]}/${path[1]}/${path[2]}`
		return pathname === windowPath ? styles.active_li : null
	}

	const createMap = (type, group) => (
		type[group].map((op, i) => (
			<Link key={i} to={`${type.pathname}${op.pathname}`} onClick={() => setSidebar()}>
				<li className={activeLI(`${type.pathname}${op.pathname}`)}>{op.name}</li>
			</Link>
		))
	)

	const flipOtions = () => setOptions(!optionsOpen)

	return (
		<>
			<div id="sidebar" className={styles.sidebar}>
				<div className={styles.head}>
					<img
						className={styles.gear}
						src={gear} alt=""
						onClick={flipOtions}
						draggable={false}
					/>
				</div>
				{optionsOpen
					? <SidebarOptions setOptions={flipOtions} />
					: <>
						<h1>Manage</h1>
						<p>Compositions</p>
						<ul>
							{createMap(manage, 'compositions')}
						</ul>
						<p>Composites</p>
						<ul>
							{createMap(manage, 'composites')}
						</ul>
						<h1>Assemble</h1>
						<ul>
							{createMap(assemble, 'composites')}
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

const SidebarOptions = ({ flipOtions }) => {
	const [{ }, dispatch] = useStateValue()

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
				<AccentOption />
				<TipsOption />
				{notMobile && <SidebarOption flipOtions={flipOtions} />}
			</ul>
			<h1 className={ops.logout} onClick={() => logoutActions()}>Logout</h1>
		</div>
	)
}

export default Sidebar