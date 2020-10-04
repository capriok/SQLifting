/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'

import { Button } from 'godspeed'

import styles from '../../../styles/social/user/user.module.scss'

import UserNav from './user-nav'
import Profile from './profile'
import Followers from './followers'
import Following from './following'

const INIT_PROFILE = {
	data: {},
	followers: [],
	following: []
}

const User = () => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const queryUID = parseInt(window.location.pathname.split('/')[3])

	const fileRef = useRef(null)
	const [editing, setEdit] = useState(false)
	const [changes, setChanges] = useState({})

	const [profile, setProfile] = useState(INIT_PROFILE)
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])


	const fetchProfile = async () => {
		await SQLiftingAcc.get(`/profile/${queryUID}/${uid}`)
			.then(res => {
				setProfile(res.data)
			})
			.catch(err => console.log(err))
	}


	const fetchFollowers = async () => {
		await SQLiftingAcc.get(`/followers/${queryUID}/${uid}`)
			.then((res) => {
				setFollowers(res.data)
			})
			.catch(err => console.log(err))
	}


	const fetchFollowing = async () => {
		await SQLiftingAcc.get(`/following/${queryUID}/${uid}`)
			.then((res) => {
				setFollowing(res.data)
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
		queryUID, fileRef, fetchProfile, fetchFollowers, fetchFollowing,
		followUser, unfollowUser, unfollowOwnUser, followers, following,
		profile, editing, setEdit, changes, setChanges
	}

	return (
		<div className={styles.user}>
			<UserNav {...props} />
			<main>
				<Route path="/social/user/:quid/profile" render={() => (
					<>
						<Profile {...props} />
					</>
				)} />
				<Route path="/social/user/:quid/followers" render={() => (
					<>
						<Followers {...props} />
					</>
				)} />
				<Route path="/social/user/:quid/following" render={() => (
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