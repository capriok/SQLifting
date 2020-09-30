/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { SQLiftingAcc } from '../api/sqlifting'
import { useStateValue } from '../state/state'
import styles from '../styles/profile/profile.module.scss'
const Profile = () => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const [profile, setProfile] = useState({})
	const [preview, setPreview] = useState()
	const [icon, setIcon] = useState()

	useEffect(() => {
		SQLiftingAcc.get(`/profile/${uid}`)
			.then(res => {
				const result = {
					...res.data,
					icon: 'data:image/png;base64,' + new Buffer(`${profile.icon}`, 'binary').toString('base64')
				}
				setProfile(result)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		console.log(profile);
	}, [profile])


	const changeIcon = (e) => {
		let reader = new FileReader();
		const file = e.target.files[0];
		if (file) {
			console.log("new pic", file);
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			setIcon(file);
			reader.readAsDataURL(file);
		}
	}

	const updateIcon = () => {
		let formData = new FormData();
		formData.append('uid', uid);
		formData.append('icon', icon);
		SQLiftingAcc.post('/updateIcon', formData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log(err))
	}

	return (
		<div className={styles.profile}>
			<h1>Profile</h1>
			<p>{profile.username}</p>
			<input
				accept="image/jpeg, image/png"
				type="file"
				onChange={e => changeIcon(e)} />
			<button onClick={() => updateIcon()}>Submit</button>
			<img src={preview} alt=""></img>
			<p>{profile.join_date}</p>
			<div>
				<img style={{ maxWidth: '100px' }} src={profile.icon} alt=""></img>
			</div>
		</div>
	)
}

export default Profile
