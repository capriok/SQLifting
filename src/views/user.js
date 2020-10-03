/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../state/state'
import { SQLiftingAcc } from '../api/sqlifting'

import { Button } from 'godspeed'


import styles from '../styles/user/user.module.scss'

import Nav from '../components/user/nav'
import Profile from '../components/user/profile'
import Followers from '../components/user/followers'
import Following from '../components/user/following'

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
	const [editing, setEdit] = useState(false)
	const [profile, setProfile] = useState(INIT_PROFILE)
	const [changes, setChanges] = useState({})

	const queryUID = parseInt(window.location.pathname.split('/')[2])

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
			.then(async () => {
				setEdit(false)
				setChanges({})
				await fetchProfile()
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
		fileRef,
		fetchProfile,
		followUser,
		unfollowUser,
		unfollowOwnUser,
		profile,
		editing,
		setEdit,
		changes,
		setChanges
	}

	return (
		<div className={styles.user}>
			<Nav {...props} />
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
					<Button
						text="Cancel"
						size="xsm"
						onClick={() => cancelChanges()} />
					<Button
						text="Save Changes"
						size="xsm"
						onClick={() => saveChanges()} />
				</footer>
			}
		</div>
	)
}

export default User