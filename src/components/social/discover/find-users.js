/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'

import nullIcon from '../../../images/null-icon.png'
import styles from '../../../styles/social/discover/find-users.module.scss'

import { Button } from 'godspeed'

const FindUsers = ({ fetchUsers, users }) => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const followUser = async (UID) => {
		await SQLiftingAcc.post(`/follow`, {
			follower_uid: uid,
			following_uid: UID
		})
			.then(() => fetchUsers())
			.catch(err => console.log(err))
	}

	const unfollowUser = async (UID) => {
		await SQLiftingAcc.post(`/unfollow`, {
			follower_uid: uid,
			following_uid: UID
		})
			.then(() => fetchUsers())
			.catch(err => console.log(err))
	}

	return (
		<>
			<h2 className={styles.title}>Find Friends</h2>
			<table className={styles.users}>
				<tr className={styles.title_row}>
					<th>Icon</th>
					<th>Username</th>
					<th>Location</th>
					<th></th>
				</tr>
				{users.map((u, i) => (
					<>
						{
							u.uid !== uid &&
							<tr key={i} className={styles.user_row}>
								<td><Link to={`user/${u.uid}/profile`}>
									<img className={styles.icon} src={u.icon !== null ? u.icon : nullIcon} alt="" />
								</Link></td>
								<td><Link to={`user/${u.uid}/profile`}>
									{u.username}
								</Link></td>
								<td><Link to={`user/${u.uid}/profile`}>
									{u.location || 'Unknown'
									}</Link></td>
								<td>
									<div className={styles.actions}>
										{!u.isFollowed
											? <Button text="Follow" size="xsm" onClick={() => followUser(u.uid)} />
											: <Button text="Unfollow" size="xsm" onClick={() => unfollowUser(u.uid)} />
										}
									</div>
								</td>
							</tr >
						}
					</>
				))}
			</table >
		</>
	)
}

export default FindUsers
