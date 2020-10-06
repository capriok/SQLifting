/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'
import useOutsideClick from '../../../utils/useOutsideClick'

import nullIcon from '../../../images/null-icon.png'
import styles from '../../../styles/social/discover/find-people.module.scss'

import { Button } from 'godspeed'

const FindPeople = ({ term, fetchPeople, people }) => {
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
			.then(() => fetchPeople())
			.catch(err => console.log(err))
	}

	const unfollowUser = async (UID) => {
		await SQLiftingAcc.post(`/unfollow`, {
			follower_uid: uid,
			following_uid: UID
		})
			.then(() => {
				setConfirm()
				fetchPeople()
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			<table className={styles.people}>
				<thead>
					<tr>
						<th>Icon</th>
						<th>Username</th>
						<th>Location</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{people.map((p, i) => (
						<>
							{p.uid !== uid && <>
								<tr key={i}>
									<td>
										<Link to={`/social/user/${p.uid}/profile`}>
											<img className={styles.icon} src={p.icon !== null ? p.icon : nullIcon} alt="" />
										</Link>
									</td>
									<td>
										<Link to={`/social/user/${p.uid}/profile`}>
											{p.username}
										</Link>
									</td>
									<td>
										<Link to={`/social/user/${p.uid}/profile`}>
											{p.location || 'Unknown'}
										</Link>
									</td>
									<td>
										<div className={styles.actions}>
											{!p.isFollowed
												? <Button
													text="Follow"
													onClick={() => followUser(p.uid)} />
												: confirming === p.uid
													? <div ref={ref} id={p.uid}>
														<Button
															className={styles.warn}
															text="Confirm"
															onClick={() => unfollowUser(p.uid)} />
													</div>
													: <Button
														text="Unfollow"
														onClick={() => setConfirm(p.uid)} />
											}
										</div>
									</td>
								</tr>
							</>}
						</>
					))}
				</tbody>
			</table>
		</>
	)
}

export default FindPeople
