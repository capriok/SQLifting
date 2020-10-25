import React from 'react'
import { Link } from 'react-router-dom'

import styles from './landingOLD.module.scss'

import landingBlur from '../assets/landing_blur.jpg'
import logo from '../assets/official_logo.png'
import assemble from '../assets/landing_assemble.png'
import manage from '../assets/landing_manage.png'
import workout from '../assets/landing_workout.png'

const LandingLayout = () => {
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

export default LandingLayout