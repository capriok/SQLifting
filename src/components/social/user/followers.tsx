/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../global/state'
import useOutsideClick from '../../../utils/useOutsideClick'

import nullIcon from '../../../assets/null-icon.png'
import styles from '../../../styles/social/user/followers.module.scss'

import { Button } from 'godspeed'

interface Props {
	paramUID: number
	fetchFollowers: () => void
	followUser: (uid: number) => void
	unfollowUser: (uid: number) => void
	unfollowOwnUser: (uid: number) => void
	followers: any
}

const Followers: React.FC<Props> = ({
	paramUID,
	fetchFollowers,
	followUser,
	unfollowUser,
	unfollowOwnUser,
	followers
}) => {
	const [{ user }] = useStateValue()

	const [confirming, setConfirm] = useState(null)

	const ref: any = useRef()
	useOutsideClick(ref, () => {
		if (confirming === parseInt(ref.current.id)) setConfirm(null)
	});

	useEffect(() => {
		fetchFollowers()
	}, [paramUID])

	useEffect(() => {
		followers.length > 0 && console.log(`%cUser Followers (${paramUID})`, 'color: lightskyblue', { followers });
	}, [followers])

	async function follow(uid) {
		await followUser(uid)
		setConfirm(null)
		fetchFollowers()
	}

	async function unfollow(uid) {
		await unfollowUser(uid)
		setConfirm(null)
		fetchFollowers()
	}

	async function unfollowOwn(uid) {
		await unfollowOwnUser(uid)
		setConfirm(null)
		fetchFollowers()
	}

	return (
		<>
			<section>
				<div className={styles.followers_title}>
					<h1>Followers</h1>
					<Link to="profile"><Button text="◄ Back" /></Link>
				</div>
				<div className={styles.followers}>
					{followers.map((f, i) => (
						<div key={i} className={styles.follower}>
							<Link to={`/social/user/${f.uid}/profile`}>
								<img className={styles.icon} src={f.icon !== null ? f.icon : nullIcon} alt="" />
								<span className={styles.username}>{f.username}</span>
							</Link>
							{f.uid === user.details.uid
								? <></>
								: paramUID === user.details.uid
									? confirming === f.uid
										? <div ref={ref} id={f.uid}>
											<Button
												className={styles.warn}
												text="Confirm"
												onClick={() => unfollowOwn(f.uid)} />
										</div>
										: <Button
											text="Remove"
											onClick={() => setConfirm(f.uid)} />
									: !f.isFollowed
										? <Button
											text="Follow"
											onClick={() => follow(f.uid)} />
										: confirming === f.uid
											? <div ref={ref} id={f.uid}>
												<Button
													className={styles.warn}
													text="Confirm"
													onClick={() => unfollow(f.uid)} />
											</div>
											: <Button
												text="Unfollow"
												onClick={() => setConfirm(f.uid)} />
							}
						</div>
					))}
				</div>
			</section>
		</>
	)
}

export default Followers
