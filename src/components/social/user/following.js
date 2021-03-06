/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../global/state'
import useOutsideClick from '../../../utils/useOutsideClick'

import nullIcon from '../../../assets/null-icon.png'
import styles from '../../../styles/social/user/following.module.scss'

import { Button } from 'godspeed'

const Following = ({
	paramUID,
	fetchFollowing,
	followUser,
	unfollowUser,
	following
}) => {
	const [{ user }] = useStateValue()

	const [confirming, setConfirm] = useState()

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming === parseInt(ref.current.id)) setConfirm()
	});

	useEffect(() => {
		fetchFollowing()
	}, [paramUID])

	useEffect(() => {
		following.length > 0 && console.log(`%cUser Following (${paramUID})`, 'color: lightskyblue', { following });
	}, [following])

	async function follow(uid) {
		await followUser(uid)
		setConfirm()
		fetchFollowing()
	}

	async function unfollow(uid) {
		await unfollowUser(uid)
		setConfirm()
		fetchFollowing()
	}

	return (
		<>
			<section>
				<div className={styles.following_title}>
					<h1>Following</h1>
					<Link to={`profile`}><Button text="◄ Back" /></Link>
				</div>
				<div className={styles.following}>
					{following.map((f, i) => (
						<div key={i} className={styles.followee}>
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
												onClick={() => unfollow(f.uid)} />
										</div>
										: <Button
											text="Unfollow"
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

export default Following
