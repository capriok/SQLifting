/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import useOutsideClick from '../../../utils/useOutsideClick'

import nullIcon from '../../../images/null-icon.png'
import styles from '../../../styles/social/user/nav.module.scss'

import { Button } from 'godspeed'

const Nav = ({
	queryUID,
	fileRef,
	fetchFollowers,
	followUser,
	unfollowUser,
	profile,
	editing,
	changes,
	setChanges,
	setEdit
}) => {
	const [{
		user: {
			details: {
				uid,
			}
		}
	},] = useStateValue()

	const [confirming, setConfirming] = useState(false)

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming) setConfirming(false)
	});

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

	async function follow(uid) {
		await followUser(uid)
		setConfirming(false)
		fetchFollowers()
	}

	async function unfollow(uid) {
		await unfollowUser(uid)
		setConfirming(false)
		fetchFollowers()
	}

	return (
		<div className={styles.nav}>
			<div className={styles.left}>
				<div className={styles.icon_cont}>
					<Link to="profile">
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
				<div className={styles.cont}>
					<Link to="followers">
						<p>Followers<span>{profile.follower_count}</span></p>
					</Link>
					<Link to="following">
						<p>Following<span>{profile.following_count}</span></p>
					</Link>
					{window.location.pathname !== `/social/user/${queryUID}/profile` && queryUID === uid
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
									onClick={async () => follow(queryUID)}
									disabled={editing} />
								: confirming
									? <div ref={ref}>
										<Button
											className={styles.warn}
											text="Confirm"
											size="xsm"
											onClick={() => unfollow(queryUID)}
											disabled={editing} />
									</div>
									: <Button
										text="Unfollow"
										size="xsm"
										onClick={() => setConfirming(true)}
										disabled={editing} />
					}
				</div>
			</div>
		</div>
	)
}

export default Nav
