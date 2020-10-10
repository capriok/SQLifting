/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Route, useParams } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'

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

	const params = useParams()

	const fileRef = useRef(null)
	const [editing, setEdit] = useState(false)
	const [changes, setChanges] = useState({})

	const [submitting, setSubmitting] = useState(false)

	const [profile, setProfile] = useState(INIT_PROFILE)
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])


	const fetchProfile = async () => {
		await SQLiftingAcc.get(`/profile/${params.uid}/${uid}`)
			.then(res => {
				setProfile(res.data)
			})
			.catch(err => console.log(err))
	}


	const fetchFollowers = async () => {
		await SQLiftingAcc.get(`/followers/${params.uid}/${uid}`)
			.then((res) => {
				setFollowers(res.data)
			})
			.catch(err => console.log(err))
	}


	const fetchFollowing = async () => {
		await SQLiftingAcc.get(`/following/${params.uid}/${uid}`)
			.then((res) => {
				setFollowing(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchProfile()
	}, [params.uid])

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
				setSubmitting(false)
				await fetchProfile()
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		let newChanges = {}
		for (let prop in changes) {
			if (changes[prop] !== '') {
				newChanges[prop] = changes[prop]
			}
			if (Object.keys(newChanges).length === 0) {
				setChanges(newChanges)
			}
		}
	}, [changes])

	const props = {
		params, fileRef, fetchProfile, fetchFollowers, fetchFollowing,
		saveChanges, cancelChanges, followUser, unfollowUser, unfollowOwnUser,
		profile, followers, following, editing, setEdit, changes, setChanges,
		submitting, setSubmitting
	}

	return (
		<div className={styles.user}>
			<UserNav {...props} />
			<main>
				<Route path="/social/user/:uid/profile" render={() => (
					<>
						<Profile {...props} />
					</>
				)} />
				<Route path="/social/user/:uid/followers" render={() => (
					<>
						<Followers {...props} />
					</>
				)} />
				<Route path="/social/user/:uid/following" render={() => (
					<>
						<Following {...props} />
					</>
				)} />
			</main>
		</div>
	)
}

export default User