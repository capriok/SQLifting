/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Input } from 'godspeed'

import styles from '../../styles/user/profile.module.scss'

const Profile = ({ profile, editing, changes, setChanges }) => {
	return (
		<>
			<div className={styles.profile_title}>
				<h1>Profile</h1>
				<p>Join Date | {profile.join_date}</p>
			</div>
			<section className={styles.profile}>
				<div className={styles.stats}>
					<ul>
						<h2>Compositions</h2>
						<li><p>Equipments</p><span>{profile.data.equipments}</span></li>
						<li><p>Muscles</p><span>{profile.data.muscles}</span></li>
						<li><p>Exercises</p><span>{profile.data.exercises}</span></li>
						<li><p>Movements</p><span>{profile.data.movements}</span></li>
						<h2>Composites</h2>
						<li><p>Exercises</p><span>{profile.data.circs}</span></li>
						<li><p>Circuits</p><span>{profile.data.excos}</span></li>
						<li><p>Workouts</p><span>{profile.data.wocos}</span></li>
					</ul>
				</div>
				<div className={styles.account}>
					<ul>
						<h2>Account</h2>
						<li>
							<p>First name</p>
							{editing
								? <Input
									placeholder={profile.first_name}
									onChange={e => setChanges({ ...changes, first_name: e.target.value })} />
								: <span>{profile.first_name}</span>
							}
						</li>
						<li>
							<p>Last name</p>
							{editing
								? <Input
									placeholder={profile.last_name}
									onChange={e => setChanges({ ...changes, last_name: e.target.value })} />
								: <span>{profile.last_name}</span>
							}
						</li>
						<li>
							<p>Email</p>
							{editing
								? <Input
									placeholder={profile.email}
									onChange={e => setChanges({ ...changes, email: e.target.value })} />
								: <span>{profile.email}</span>
							}
						</li>
						<li>
							<p>Birthday</p>
							{editing
								? <Input
									type="date"
									placeholder={profile.birthday}
									onChange={e => setChanges({ ...changes, birthday: e.target.value })} />
								: <span>{profile.birthday}</span>
							}
						</li>
						<li>
							<p>Location</p>
							{editing
								? <Input
									placeholder={profile.location}
									onChange={e => setChanges({ ...changes, location: e.target.value })} />
								: <span>{profile.location}</span>
							}
						</li>
					</ul>
				</div>
			</section>
		</>
	)
}

export default Profile
