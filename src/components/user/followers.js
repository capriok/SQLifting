/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../state/state'
import { SQLiftingAcc } from '../../api/sqlifting'

import nullIcon from '../../images/null-icon.png'
import styles from '../../styles/user/followers.module.scss'

import { Button } from 'godspeed'

const Followers = ({ queryUID, followUser, unfollowUser, unfollowOwnUser }) => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const [followers, setFollowers] = useState([])

	const fetchFollowers = async () => {
		await SQLiftingAcc.get(`/followers/${queryUID}/${uid}`)
			.then((res) => {
				setFollowers(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchFollowers()
	}, [queryUID])

	useEffect(() => {
		followers.length > 0 && console.log('%cFollowers', 'color: lightskyblue', followers);
	}, [followers])

	async function follow(uid) {
		await followUser(uid)
		await fetchFollowers()
	}

	async function unfollow(uid) {
		await unfollowUser(uid)
		await fetchFollowers()
	}

	async function unfollowOwn(uid) {
		await unfollowOwnUser(uid)
		await fetchFollowers()
	}

	return (
		<>
			<section>
				<div className={styles.followers_title}>
					<h1>Followers</h1>
					<Link to="profile"><Button text="◄ Back" size="xsm" /></Link>
				</div>
				<div className={styles.followers}>
					{followers.map((f, i) => (
						<div key={i} className={styles.follower}>
							<Link to={`/user/${f.uid}/profile`}>
								<img className={styles.icon} src={f.icon !== null ? f.icon : nullIcon} alt="" />
								<span className={styles.username}>{f.username}</span>
							</Link>
							{f.uid === uid
								? <></>
								: queryUID === uid
									? <Button text="Remove" size="xsm" onClick={() => unfollowOwn(f.uid)} />
									: !f.isFollowed
										? <Button text="Follow" size="xsm" onClick={() => follow(f.uid)} />
										: <Button text="Unfollow" size="xsm" onClick={() => unfollow(f.uid)} />
							}
						</div>
					))}
				</div>
			</section>
		</>
	)
}

export default Followers
