/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../state/state'

import styles from '../../styles/sidebar/sidebar.module.scss'
import ops from '../../styles/sidebar/options.module.scss'
import gear from '../../images/gear.png'

import TipsOption from './options/tips'
import BackgroundOption from './options/background'
import PrimaryOption from './options/primary'
import SecondaryOption from './options/secondary'
import SidebarOption from './options/sidebar'

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
	const [{
		user: {
			details: {
				uid
			}
		},
		social: {
			active
		}
	}] = useStateValue()

	const [optionsOpen, setOptions] = useState(false)

	const flipOptions = () => setOptions(!optionsOpen)

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
		],
		workout: [
			{ name: 'Go', pathname: '' }
		],
		user: [
			{ name: 'View profile', pathname: `/user/${uid}/profile` }
		],
		discover: [
			{ name: 'Find people', pathname: '/discover' }
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
	const workout = {
		pathname: '/workout',
		workout: [...router.workout]
	}
	const social = {
		pathname: '/social',
		user: [...router.user],
		discover: [...router.discover]
	}

	const activePath = '/' + window.location.pathname.split('/').filter((_, i) => i !== 0).join('/')

	const activeLI = pathname => {
		return pathname === activePath ? styles.active_li : null
	}

	const createMap = (srcPath, src) => (
		src.map((op, i) => (
			<Link key={i} to={srcPath + src[i].pathname} onClick={setSidebar}>
				<li className={activeLI(srcPath + src[i].pathname)}>{op.name}</li>
			</Link>
		))
	)

	return (
		<>
			<div id="sidebar" className={styles.sidebar}>
				<div className={styles.head}>
					<img
						className={styles.gear}
						src={gear} alt=""
						onClick={flipOptions}
						draggable={false}
					/>
				</div>
				{optionsOpen
					? <SidebarOptions flipOptions={flipOptions} />
					: <>
						<h1>Manage</h1>
						<p>Compositions</p>
						<ul>
							{createMap('/manage', manage.compositions)}
						</ul>
						<p>Composites</p>
						<ul>
							{createMap('/manage', manage.composites)}
						</ul>
						<h1>Assemble</h1>
						<ul>
							{createMap('/assemble', assemble.composites)}
						</ul >
						<h1>Workout</h1>
						<ul>
							{createMap('/workout', workout.workout)}
						</ul>
						<h1 className={ops.profile}>Social</h1>
						<ul>
							{createMap('/social', social.user)}
							{createMap('/social', social.discover)}
						</ul>
					</>
				}
			</div>
		</>
	)
}

const SidebarOptions = ({ flipOptions }) => {
	const [, dispatch] = useStateValue()

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
				<BackgroundOption />
				<PrimaryOption />
				<SecondaryOption />
				<TipsOption />
				{notMobile && <SidebarOption flipOptions={flipOptions} />}
			</ul>
			<h1 className={ops.logout} onClick={() => logoutActions()}>Logout</h1>
		</div>
	)
}

export default Sidebar