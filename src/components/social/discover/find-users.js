/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'
import useOutsideClick from '../../../utils/useOutsideClick'

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

	const [confirming, setConfirm] = useState()

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming === parseInt(ref.current.id)) setConfirm()
	});


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
			<table className={styles.users}>
				<thead>
					<tr>
						<th>Icon</th>
						<th>Username</th>
						<th>Location</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users.map((u, i) => (
						<tr key={i}>
							{u.uid !== uid && <>
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
											? <Button
												text="Follow"
												size="xsm"
												onClick={() => followUser(u.uid)} />
											: confirming === u.uid
												? <div ref={ref} id={u.uid}>
													<Button
														className={styles.warn}
														text="Confirm"
														size="xsm"
														onClick={() => unfollowUser(u.uid)} />
												</div>
												: <Button
													text="Unfollow"
													size="xsm"
													onClick={() => setConfirm(u.uid)} />
										}
									</div>
								</td>
							</>}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default FindUsers
