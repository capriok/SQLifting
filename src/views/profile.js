/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state/state'
import { SQLiftingAcc } from '../api/sqlifting'

import { Button, Input } from 'godspeed'

import nullIcon from '../images/null-icon.png'

import styles from '../styles/profile/profile.module.scss'


const Profile = () => {
	const [{
		user: {
			details: {
				uid
			}
		},
		compositions,
		composites
	},] = useStateValue()

	const fileRef = useRef(null)
	const inputRef = useRef('')
	const [editing, setEdit] = useState(false)
	const [profile, setProfile] = useState({})
	const [changes, setChanges] = useState({})

	let queryUID = window.location.pathname.split('/')[3]

	const fetchProfile = () => {
		console.log(queryUID);
		SQLiftingAcc.get(`/profile/${queryUID}`)
			.then(res => {
				console.log(res);
				setProfile(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchProfile()
	}, [])

	useEffect(() => {
		console.log(profile);
	}, [profile])

	const followUser = UID => {
		SQLiftingAcc.post(`/follower`, {
			following_uid: UID,
			follower_uid: uid
		})
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	const changeIcon = (e) => {
		let reader = new FileReader();
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			reader.onloadend = () => {
				setChanges({
					...changes,
					icon: reader.result
				})
			};
			fileRef.current = file
			reader.readAsDataURL(file)
		}
	}

	const cancelChanges = () => {
		setEdit(false)
		setChanges({})
	}

	const saveChanges = () => {
		if (Object.keys(changes).length === 0) return
		let formData = new FormData();
		formData.append('uid', uid);
		formData.append('icon', fileRef.current);
		formData.append('first_name', changes.first_name);
		formData.append('last_name', changes.last_name);
		formData.append('email', changes.email);
		formData.append('birthday', changes.birthday);
		formData.append('location', changes.location);
		SQLiftingAcc.post('/updateProfile', formData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => {
				setEdit(false)
				setChanges({})
				fetchProfile()
				fileRef.current.value = 'null'
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		for (let prop in changes) {
			if (changes[prop] === '') {
				delete changes[prop]
			}
		}
	}, [changes])

	return (
		<div className={styles.profile}>
			<nav>
				<div>
					<h1>{profile.username}</h1>
					<div className={styles.icon}>
						{editing
							? <img
								src={changes.icon !== undefined ? changes.icon : profile.icon}
								alt="" />
							: <img
								src={profile.icon !== null ? profile.icon : nullIcon}
								alt="" />
						}
					</div>
					{editing && <>
						<label htmlFor="iconInput">Change Icon</label>
						<input
							id="iconInput"
							ref={inputRef}
							accept="image/jpeg, image/png"
							type="file"
							onChange={e => changeIcon(e)} />
					</>}
				</div>
				<div>
					<p>Followers<span onClick={() => console.log(profile.followers)}>{profile.follower_count}</span></p>
					<p>Following<span onClick={() => console.log(profile.following)}>{profile.following_count}</span></p>
					{parseInt(queryUID) === uid
						? <Button
							text="Edit Profile"
							size="xsm"
							onClick={() => setEdit(true)}
							disabled={editing} />
						: <Button
							text="Follow"
							size="xsm"
							onClick={() => followUser(queryUID)}
							disabled={editing} />
					}
				</div>
			</nav>
			<main>
				<div className={styles.head_title}>
					<h1>Profile</h1>
					<p>Join Date | {profile.join_date}</p>
				</div>
				<section className={styles.head}>
					<div className={styles.stats}>
						<ul>
							<h2>Compositions</h2>
							{
								profile.hasOwnProperty('data') && <>
									<li><p>Equipments</p><span>{profile.data.equipments}</span></li>
									<li><p>Muscles</p><span>{profile.data.muscles}</span></li>
									<li><p>Exercises</p><span>{profile.data.exercises}</span></li>
									<li><p>Movements</p><span>{profile.data.movements}</span></li>
									<h2>Composites</h2>
									<li><p>Exercises</p><span>{profile.data.circs}</span></li>
									<li><p>Circuits</p><span>{profile.data.excos}</span></li>
									<li><p>Workouts</p><span>{profile.data.wocos}</span></li>
								</>
							}
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
			</main>
			{editing &&
				<footer>
					<div>
						<Button
							text="Cancel"
							size="xsm"
							onClick={() => cancelChanges()} />
						<Button
							text="Save Changes"
							size="xsm"
							onClick={() => saveChanges()} />
					</div>
				</footer>
			}
		</div>
	)
}

export default Profile
