/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import useOutsideClick from '../../../utils/useOutsideClick'

import nullIcon from '../../../images/null-icon.png'
import styles from '../../../styles/social/user/following.module.scss'

import { Button } from 'godspeed'

const Following = ({
	queryUID,
	fetchFollowing,
	followUser,
	unfollowUser,
	following
}) => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const [confirming, setConfirm] = useState()

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming === parseInt(ref.current.id)) setConfirm()
	});

	useEffect(() => {
		fetchFollowing()
	}, [queryUID])

	useEffect(() => {
		following.length > 0 && console.log('%cFollowing', 'color: lightskyblue', { following });
	}, [following])

	async function follow(uid) {
		await followUser(uid)
		fetchFollowing()
	}

	async function unfollow(uid) {
		await unfollowUser(uid)
		fetchFollowing()
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
							<Link to={`/social/user/${f.uid}/profile`}>
								<img className={styles.icon} src={f.icon !== null ? f.icon : nullIcon} alt="" />
								<span className={styles.username}>{f.username}</span>
							</Link>
							{f.uid === uid
								? <></>
								: queryUID === uid
									? confirming === f.uid
										? <div ref={ref} id={f.uid}>
											<Button
												className={styles.warn}
												text="Confirm"
												size="xsm"
												onClick={() => unfollow(f.uid)} />
										</div>
										: <Button
											text="Unfollow"
											size="xsm"
											onClick={() => setConfirm(f.uid)} />
									: !f.isFollowed
										? <Button
											text="Follow"
											size="xsm"
											onClick={() => follow(f.uid)} />
										: confirming === f.uid
											? <div ref={ref} id={f.uid}>
												<Button
													className={styles.warn}
													text="Confirm"
													size="xsm"
													onClick={() => unfollow(f.uid)} />
											</div>
											: <Button
												text="Unfollow"
												size="xsm"
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
