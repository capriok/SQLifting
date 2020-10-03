/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../state/state'
import { SQLiftingAcc } from '../../api/sqlifting'

import styles from '../../styles/user/following.module.scss'
import nullIcon from '../../images/null-icon.png'

import { Button } from 'godspeed'

const Following = ({ queryUID, followUser, unfollowUser }) => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const [following, setFollowing] = useState([])

	const fetchFollowing = async () => {
		await SQLiftingAcc.get(`/following/${queryUID}/${uid}`)
			.then((res) => {
				setFollowing(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchFollowing()
	}, [])

	useEffect(() => {
		following.length > 0 && console.log('%cFollowing', 'color: lightskyblue', following);
	}, [following])

	async function follow(uid) {
		await followUser(uid)
		await fetchFollowing()
	}

	async function unfollow(uid) {
		await unfollowUser(uid)
		await fetchFollowing()
	}

	return (
		<>
			<section>
				<div className={styles.following_title}>
					<h1>Following</h1>
					<Link to={`profile`}><Button text="◄ Back" size="xsm" /></Link>
				</div>
				<div className={styles.following}>
					{following.map((f, i) => (
						<div key={i} className={styles.followee}>
							<Link to={`/user/${f.uid}/profile`}>
								<img className={styles.icon} src={f.icon !== null ? f.icon : nullIcon} alt="" />
								<span className={styles.username}>{f.username}</span>
							</Link>
							{f.uid === uid
								? <></>
								: queryUID === uid
									? <Button text="Unfollow" size="xsm" onClick={() => unfollow(f.uid)} />
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

export default Following
