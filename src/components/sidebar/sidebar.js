/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../global/state'

import styles from '../../styles/sidebar/sidebar.module.scss'
import acc from '../../styles/sidebar/accordian.module.scss'
import ops from '../../styles/sidebar/options.module.scss'
import gear from '../../assets/gear.png'

import TipsOption from './options/tips'
import BackgroundOption from './options/background'
// import PrimaryOption from './options/primary'
import SecondaryOption from './options/secondary'
import SidebarOption from './options/sidebar'
import MultipleDrops from './options/multiple-drops'

const notMobile = window.screen.width >= 420

const Sidebar = () => {
	const [{
		options: { sidebarOption },
		components
	}, dispatch] = useStateValue()

	useEffect(() => {
		!notMobile && dispatch({
			type: 'COMPONENT_ACTION',
			components: { ...components, sidebar: false }
		})
	}, [])

	function flipSidebar() {
		dispatch({
			type: 'COMPONENT_ACTION',
			components: { ...components, sidebar: !components.sidebar }
		})
	}

	if (notMobile) {
		if (!sidebarOption) {
			return (
				<>
					{(!sidebarOption && components.sidebar) &&
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
				{components.sidebar &&
					<SidebarContent setSidebar={() => flipSidebar()} />
				}
			</>
		)
	}
}

const SidebarContent = ({ setSidebar }) => {
	const [{ user, options }] = useStateValue()

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
			{ name: 'View profile', pathname: `/user/${user.details.uid}/profile` }
		],
		discover: [
			{ name: 'Discover', pathname: '/discover' }
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

	function activeLI(pathname) {
		return pathname === activePath ? styles.active_li : null
	}

	function createMap(srcPath, src) {
		return (
			src.map((op, i) => (
				<Link key={i} to={srcPath + src[i].pathname} onClick={setSidebar}>
					<li className={activeLI(srcPath + src[i].pathname)}>{op.name}</li>
				</Link>
			))
		)
	}

	let LSsettings = JSON.parse(localStorage.getItem('SQLifting-settings'))

	const [acrd, setAcrd] = useState(LSsettings || {
		a: false,
		b: false,
		c: false,
		d: false,
	})

	function set(name) {
		console.log();
		let isSame = Object.keys(acrd).includes(name)
		let active = acrd[name] === true
		let newAcrdOne = { [name]: isSame && active ? false : true }
		let newAcrdMultiple = { ...acrd }
		newAcrdMultiple[name] = !newAcrdMultiple[name]
		setAcrd(options.dropsOption ? newAcrdMultiple : newAcrdOne)
		localStorage.setItem('SQLifting-settings', JSON.stringify(options.dropsOption ? newAcrdMultiple : newAcrdOne))
	}

	function SectionTitle({ title, name }) {
		return (
			<h1
				className={`${acc.title} ${acrd[name] && acc.open}`}
				onClick={() => set(name)}>
				{title}
			</h1>
		)
	}

	function sectionClass(name) {
		return `${acc.item} ${!acrd[name] && acc.collapsed}`
	}

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
					? <SidebarOptions flipOptions={flipOptions} setAcrd={setAcrd} />
					: <>
						<div className={acc.accordion}>
							<SectionTitle title="Manage" name="a" />
							<div className={sectionClass('a')}>
								<p>Compositions</p>
								<ul>
									{createMap('/manage', manage.compositions)}
								</ul>
								<p>Assembled</p>
								<ul>
									{createMap('/manage', manage.composites)}
								</ul>
							</div>
							<SectionTitle title="Assemble" name="b" />
							<div className={sectionClass('b')}>
								<ul>
									{createMap('/assemble', assemble.composites)}
								</ul>
							</div> <SectionTitle title="Workout"
								name="c" />
							<div className={sectionClass('c')}>
								<ul>
									{createMap('/workout', workout.workout)}
								</ul>
							</div>
							<SectionTitle title="Social" name="d" />
							<div className={sectionClass('d')}>
								<ul>
									{createMap('/social', social.user)}
									{/* {createMap('/social', social.discover)} */}
								</ul>
							</div>
						</div>
					</>
				}
			</div>
		</>
	)
}

const SidebarOptions = ({ flipOptions, setAcrd }) => {
	const [, dispatch] = useStateValue()

	async function logoutActions() {
		await dispatch({ type: 'LOGOUT' })
		localStorage.removeItem('SQLifting-token')
		localStorage.removeItem('SQLifting-user')
		window.location.pathname = '/'
	}

	return (
		<div className={ops.options}>
			<h1>Options</h1>
			<p>Appearance</p>
			<ul>
				<BackgroundOption />
				{/* <PrimaryOption /> */}
				<SecondaryOption />
			</ul>
			<p>Application</p>
			<ul>
				<TipsOption />
			</ul>
			<p>Sidebar</p>
			<ul>
				{notMobile && <SidebarOption flipOptions={flipOptions} />}
				<MultipleDrops setAcrd={setAcrd} />
			</ul>
			<h1 className={ops.logout} onClick={() => logoutActions()}>Logout</h1>
		</div>
	)
}

export default Sidebar