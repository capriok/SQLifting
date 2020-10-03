/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Link, Route } from 'react-router-dom'
import { useStateValue } from '../state/state'
import { SQLiftingAcc } from '../api/sqlifting'

import { Button, Input } from 'godspeed'

import nullIcon from '../images/null-icon.png'

import styles from '../styles/user/user.module.scss'

import Profile from '../components/user/profile'
import Followers from '../components/user/followers'
import Following from '../components/user/following'
import { queries } from '@testing-library/react'

const INIT_PROFILE = {
	data: {},
	followers: [],
	following: []
}

const User = () => {
	const [{
		user: {
			details: {
				uid,
				username
			}
		}
	},] = useStateValue()

	const fileRef = useRef(null)
	const inputRef = useRef('')
	const [editing, setEdit] = useState(false)
	const [profile, setProfile] = useState(INIT_PROFILE)
	const [changes, setChanges] = useState({})

	let queryUID = parseInt(window.location.pathname.split('/')[2])

	const fetchProfile = async () => {
		await SQLiftingAcc.get(`/profile/${queryUID}/${uid}`)
			.then(res => {
				setProfile(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchProfile()
	}, [queryUID])

	useEffect(() => {
		Object.keys(profile.data).length > 0 && console.log('%cProfile', 'color: lightskyblue', { profile });
	}, [profile])

	const followUser = async (UID) => {
		await SQLiftingAcc.post(`/follow`, {
			follower_uid: uid,
			following_uid: UID
		})
			.then(() => fetchProfile())
			.catch(err => console.log(err))
	}

	const unfollowUser = async (UID) => {
		await SQLiftingAcc.post(`/unfollow`, {
			follower_uid: uid,
			following_uid: UID
		})
			.then(() => fetchProfile())
			.catch(err => console.log(err))
	}

	const unfollowOwnUser = async (UID) => {
		await SQLiftingAcc.post(`/unfollowOwn`, {
			follower_uid: UID,
			following_uid: uid
		})
			.then(() => fetchProfile())
			.catch(err => console.log(err))
	}

	const changeIcon = (e) => {
		let reader = new FileReader();
		const file = e.target.files[0];
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
		formData.append('status', changes.status);
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
			.then(() => {
				setEdit(false)
				setChanges({})
				fileRef.current.value = 'null'
				fetchProfile()
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

	const props = {
		queryUID,
		fetchProfile,
		followUser,
		unfollowUser,
		unfollowOwnUser,
		profile,
		editing,
		changes,
		setChanges
	}

	return (
		<div className={styles.user}>
			<nav>
				<div className={styles.left}>
					<div className={styles.icon_cont}>
						<Link to={`profile`}>
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
						</Link>
						{editing && <>
							<label className={styles.edit_button} htmlFor="iconInput">Change Icon</label>
							<input
								id="iconInput"
								ref={inputRef}
								accept="image/jpeg, image/png"
								type="file"
								onChange={e => changeIcon(e)} />
						</>}
					</div>
					<div className={styles.user_info}>
						<h1>{profile.username}</h1>
						{editing
							? <><textarea
								rows="4"
								maxLength="120"
								placeholder={profile.status}
								onChange={e => setChanges({ ...changes, status: e.target.value })} />
								<p className={styles.area_details}>
									<span>Max length 120 characters</span>
									<span>{changes.hasOwnProperty('status') && changes.status.length}</span>
								</p>
							</>
							: <p className={styles.status}>{profile.status}</p>
						}
					</div>
				</div>
				<div className={styles.right}>
					<Link to="followers">
						<p>Followers<span>{profile.follower_count}</span></p>
					</Link>
					<Link to="following">
						<p>Following<span>{profile.following_count}</span></p>
					</Link>
					{window.location.pathname !== `/user/${queryUID}/profile` && queryUID === uid
						? <></>
						: queryUID === uid
							? <Button
								text="Edit Profile"
								size="xsm"
								onClick={() => setEdit(true)}
								disabled={editing} />
							: !profile.isFollowed
								? <Button
									text="Follow"
									size="xsm"
									onClick={async () => {
										await followUser(queryUID)
										await fetchProfile()
									}}
									disabled={editing} />
								: <Button
									text="Unfollow"
									size="xsm"
									onClick={async () => {
										await unfollowUser(queryUID)
										await fetchProfile()
									}}
									disabled={editing} />
					}
				</div>
			</nav>
			<main>
				<Route path="/user/:uid/profile" render={() => (
					<>
						<Profile {...props} />
					</>
				)} />
				<Route path="/user/:uid/followers" render={() => (
					<>
						<Followers {...props} />
					</>
				)} />
				<Route path="/user/:uid/following" render={() => (
					<>
						<Following {...props} />
					</>
				)} />
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

export default User