/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'

import styles from '../../../styles/social/discover/discover.module.scss'

import FindUsers from './find-users'

const Discover = () => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const [users, setUsers] = useState([])

	const fetchUsers = () => {
		SQLiftingAcc.get(`/users/${uid}`)
			.then(res => {
				setUsers(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	useEffect(() => {
		users.length > 0 && console.log('%cDiscovery', 'color: lightskyblue', { users });
	}, [users])

	const props = {
		fetchUsers,
		users,
	}

	return (
		<div className={styles.discover}>
			<h1>Discover</h1>
			<section>
				<div className={styles.find_users}>
					<h2 className={styles.title}>Find Friends</h2>
					<FindUsers {...props} />
				</div>
				<div className={styles.other}>
					<h2 className={styles.title}>Other</h2>
				</div>
			</section>
		</div >
	)
}

export default Discover
