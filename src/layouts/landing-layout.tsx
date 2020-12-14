import React from 'react'
import { Link } from 'react-router-dom'

import styles from './landing.module.scss'

import landing_shape1 from '../assets/landing_shape1.png'
import landing_shape2 from '../assets/landing_shape2.png'
import '../styles/common/waves.scss'
import { Button } from 'godspeed'

const LandingLayout = () => {
	return (
		<div className={styles.landing}>
			<main>
				<div className={styles.float}>
					<div className={styles.head}>
						<h1 className={styles.app_name}>
							SQLifting
						</h1>
					</div>
					<div className={styles.content}>

						<p className={styles.slogan}>
							Lift Smarter | Plan Ahead
						</p>
						<p className={styles.description}>
							Sqlifting is a versitile workout building application, built with weight lifters mind.
						</p>
						<p className={styles.description}>
							Its up to you to exercise smarter!
						</p>
						<Link to="/login">
							<Button text="Login now!" />
						</Link>
					</div>
					<img className={styles.ls1} src={landing_shape1} alt="" />
					<img className={styles.ls2} src={landing_shape2} alt="" />
				</div>
				<div className="wave-container">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 24 150 28"
						preserveAspectRatio="none"
						shapeRendering="auto"
						className="waves">
						<defs>
							<path id="gentle-wave"
								d="M-160 44c30 0 58-18 
								88-18s 58 18 88 18 
								58-18 88-18 58 18
								 88 18 v44h-352z"/>
						</defs>
						<g>
							<use className="p1 parallax" xlinkHref="#gentle-wave" x="48" y="0" fill=" rgba(0, 25, 47, 0.9)" />
						</g>
					</svg>
				</div>
				<div className="wavebody" />
			</main>
		</div>
	)
}

export default LandingLayout
