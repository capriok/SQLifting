/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Route, useParams } from 'react-router-dom'
import { useStateValue } from '../../../global/state'
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
	const [{ user }] = useStateValue()

	const params = useParams()
	const paramUID = parseInt(params.uid)

	const fileRef = useRef(null)
	const [editing, setEdit] = useState(false)
	const [changes, setChanges] = useState({})

	const [submitting, setSubmitting] = useState(false)

	const [profile, setProfile] = useState(INIT_PROFILE)
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])

	async function fetchProfile() {
		await SQLiftingAcc.get(`/profile/${paramUID}/${user.details.uid}`)
			.then(res => {
				setProfile(res.data)
			})
			.catch(err => console.log(err))
	}

	async function fetchFollowers() {
		await SQLiftingAcc.get(`/followers/${paramUID}/${user.details.uid}`)
			.then((res) => {
				setFollowers(res.data)
			})
			.catch(err => console.log(err))
	}

	async function fetchFollowing() {
		await SQLiftingAcc.get(`/following/${paramUID}/${user.details.uid}`)
			.then((res) => {
				setFollowing(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchProfile()
	}, [paramUID])

	async function followUser(UID) {
		await SQLiftingAcc.post(`/follow`, {
			follower_uid: user.details.uid,
			following_uid: UID
		})
			.then(() => fetchProfile())
			.catch(err => console.log(err))
	}

	async function unfollowUser(UID) {
		await SQLiftingAcc.post(`/unfollow`, {
			follower_uid: user.details.uid,
			following_uid: UID
		})
			.then(() => fetchProfile())
			.catch(err => console.log(err))
	}

	async function unfollowOwnUser(UID) {
		await SQLiftingAcc.post(`/unfollowOwn`, {
			follower_uid: UID,
			following_uid: user.details.uid
		})
			.then(() => fetchProfile())
			.catch(err => console.log(err))
	}

	function cancelChanges() {
		setEdit(false)
		setChanges({})
	}

	function saveChanges() {
		if (Object.keys(changes).length === 0) return
		let formData = new FormData();
		formData.append('uid', user.details.uid);
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
		paramUID, fileRef, fetchProfile, fetchFollowers, fetchFollowing,
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