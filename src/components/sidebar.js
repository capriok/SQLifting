import React from 'react'
import styles from './styles/sidebar.module.scss'

const Sidebar = () => {
	const [depth, setDepth] = React.useState({ a: true, b: true, c: false })
	return (
		<>
			<div className={styles.sidebar}>
				<h1 onClick={() => setDepth({ ...depth, a: !depth.a })}>Manage</h1>
				{depth.a && <>
					<ul className={styles.panel}>
						<h3>Compositions</h3>
						<ul className={styles.panel}>
							<li>Equipment</li>
							<li>Muscles</li>
							<li>Exercises</li>
							<li>Movements</li>
						</ul>
					</ul>
					<ul className={styles.panel}>
						<h3>Composites</h3>
						<ul className={styles.panel}>
							<li>Circuits</li>
							<li>Exercises</li>
							<li>Workouts</li>
						</ul>
					</ul>
				</>}
				<br />
				<h1 onClick={() => setDepth({ ...depth, b: !depth.b })}>Assemble</h1>
				{depth.b && <>
					<ul className={styles.panel}>
						<h3>Compositions</h3>
						<ul className={styles.panel}>
							<li>Equipment</li>
							<li>Muscles</li>
							<li>Exercises</li>
							<li>Movements</li>
						</ul>
						<ul>
						</ul>
						<h3>Composites</h3>
						<ul className={styles.panel}>
							<li>Circuits</li>
							<li>Exercises</li>
							<li>Workouts</li>
						</ul>
					</ul>
				</>}
				<br />
				<h1 onClick={() => setDepth({ ...depth, c: !depth.c })}>Workout</h1>
				{depth.c && <>
					<ul className={styles.panel}>Go</ul>
				</>}
			</div>
		</>
	)
}

export default Sidebar
