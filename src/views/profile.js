/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state/state'
import { SQLiftingAcc } from '../api/sqlifting'

import { Input } from 'godspeed'

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

	const [profile, setProfile] = useState({})

	const fileRef = useRef(null)
	const inputRef = useRef('')
	const [preview, setPreview] = useState()

	useEffect(() => {
		SQLiftingAcc.get(`/profile/${uid}`)
			.then(res => {
				console.log(res);
				setProfile(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		console.log(profile);
	}, [profile])

	const changeIcon = (e) => {
		let reader = new FileReader();
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			reader.onloadend = () => {
				setPreview(reader.result)
			};
			fileRef.current = file
			reader.readAsDataURL(file)
		}
	}

	const submitIcon = (e) => {
		e.preventDefault();
		let formData = new FormData();
		const file = fileRef.current
		if (!file) return
		formData.append('uid', uid);
		formData.append('icon', fileRef.current);
		SQLiftingAcc.post('/updateIcon', formData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => {
				setProfile({
					...profile,
					icon: res.data.data
				})
				setPreview();
				inputRef.current.value = ''
				fileRef.current.value = 'null'
			})
			.catch(err => console.log(err))
	}

	return (
		<div className={styles.profile}>
			<nav>
				<div>
					<h1>{profile.username}</h1>
					<img src={profile.icon} alt="" />
				</div>
				<div>
					<p>Followers<span>{profile.followers}</span></p>
					<p>Following<span>{profile.following}</span></p>
					<button>Follow</button>
				</div>
			</nav>
			<main>
				{/* <section className={styles.details}>
					<h1>Details</h1>
					<p>First Name <Input type="text" value={profile.first_name} /></p>
					<p>Last Name <Input type="text" value={profile.last_name} /></p>
					<p>Biography <Input type="text" value={profile.bio} /></p>
				</section> */}
				<section className={styles.compositions}>
					<div>
						<p>Equipmnents</p>
						<p>{compositions.equipments.length}</p>
					</div>
					<div>
						<p>Muscles</p>
						<p>{compositions.muscles.length}</p>
					</div>
					<div>
						<p>Exercises</p>
						<p>{compositions.exercises.length}</p>
					</div>
					<div>
						<p>Movements</p>
						<p>{compositions.movements.length}</p>
					</div>
				</section>
				<section className={styles.composites}>
					<div>
						<p>Exercises</p>
						<p>{composites.excos.length}</p>
					</div>
					<div>
						<p>Circuits</p>
						<p>{composites.circs.length}</p>
					</div>
					<div>
						<p>Workouts</p>
						<p>{composites.wocos.length}</p>
					</div>
				</section>
			</main>


			{/* <h1>Profile</h1>
			<p>Usernmae: {profile.username}</p>
			<div>
				<p>Profile Icon</p>
				<img src={profile.icon} alt=""></img>
			</div>
			<p>Join Date: {profile.join_date}</p>
			<div>
				<p>Update icon</p>
				<form onSubmit={e => submitIcon(e)}>
					<input
						ref={inputRef}
						accept="image/jpeg, image/png"
						type="file"
						onChange={e => changeIcon(e)} />
					<button type="submit">Submit</button>
				</form>
				<p>Preview</p>
				<img src={preview} alt="" />
			</div> */}
		</div>
	)
}

export default Profile
