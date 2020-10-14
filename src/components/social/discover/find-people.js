/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../global/state'
import { SQLiftingAcc } from '../../../api/sqlifting'
import useOutsideClick from '../../../utils/useOutsideClick'

import nullIcon from '../../../assets/null-icon.png'
import styles from '../../../styles/social/discover/find-people.module.scss'

import { Button } from 'godspeed'

const FindPeople = ({ fetchPeople, people }) => {
	const [{ user }] = useStateValue()

	const [confirming, setConfirm] = useState()

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (confirming === parseInt(ref.current.id)) setConfirm()
	});


	async function followUser(UID) {
		await SQLiftingAcc.post(`/follow`, {
			follower_uid: user.details.uid,
			following_uid: UID
		})
			.then(() => fetchPeople())
			.catch(err => console.log(err))
	}

	async function unfollowUser(UID) {
		await SQLiftingAcc.post(`/unfollow`, {
			follower_uid: user.details.uid,
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
						<React.Fragment key={i}>
							{p.uid !== user.details.uid &&
								<tr>
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
							}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</>
	)
}

export default FindPeople
