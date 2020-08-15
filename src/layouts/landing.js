import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state'

import styles from '../styles/landing.module.scss'

import landingBlur from '../gallery/landing_blur.jpg'
import logo from '../gallery/official_logo.png'
import assemble from '../gallery/landing_assemble.png'
import manage from '../gallery/landing_manage.png'
import workout from '../gallery/landing_workout.png'

const Landing = () => {
	const [{ user: { isAuthenticated, details: { username } } }] = useStateValue()
	return (
		<div className={styles.landing}>
			<nav>
				<h1>SQLifting</h1>
				<section>
					<Link to="/login"><button>Sign In</button></Link>
				</section>
			</nav>
			<header>
				<img src={logo} alt="" />
				<section>
					<h1>Exercise Smarter</h1>
				</section>
				<img className={styles.bg} src={landingBlur} alt="" />
			</header>
			<main>
				<div>
					<span>
						<img src={assemble} alt="" />
						<h1>Create</h1>
					</span>
					<span>
						<img src={manage} alt="" />
						<h1>Manage</h1>
					</span>
					<span>
						<img src={workout} alt="" />
						<h1>Workout</h1>
					</span>
				</div>
			</main>
		</div>
	)
}

export default Landing
