/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../../../global/state'
import { SQLiftingAcc } from '../../../api/sqlifting'

import styles from '../../../styles/social/discover/discover.module.scss'

import DiscoverNav from './discover-nav'
import FindPeople from './find-people'
import Community from './community'
import { Input } from 'godspeed'

const Discover = () => {
	const [{ user }] = useStateValue()

	const [term, setTerm] = useState('')
	const [people, setPeople] = useState([])

	function fetchPeople() {
		SQLiftingAcc.get(`/users/${user.details.uid}`)
			.then(res => {
				setPeople(res.data)
			})
			.catch(err => console.log(err))
	}

	function searchPeople() {
		SQLiftingAcc.get(`/usersByTerm/${user.details.uid}/${term}`)
			.then(res => {
				setPeople(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		fetchPeople()
	}, [])

	useEffect(() => {
		people.length > 0 && console.log('%cDiscovery', 'color: lightskyblue', { people });
	}, [people])


	useEffect(() => {
		if (term.length === 1) return fetchPeople()
		const timeout = setTimeout(() => {
			term && searchPeople()
		}, 500);
		return () => clearTimeout(timeout)
	}, [term])

	const props = {
		term,
		fetchPeople,
		people,
	}

	return (
		<div className={styles.discover}>
			<DiscoverNav />
			<section>
				<Route exact path='/social/discover' render={() => (
					<>
						<div className={styles.main}>
							<p>Recently shared</p>
							<p>Recently Assembled</p>
						</div>
					</>
				)} />
				<Route path='/social/discover/community' render={() => (
					<>
						<div className={styles.community}>
							<Community />
						</div>
					</>
				)} />
				<Route path='/social/discover/people' render={() => (
					<div className={styles.find_people}>
						<div className={styles.title}>
							<h2>Find People</h2>
							<Input
								placeholder="Search"
								value={term}
								onChange={(e) => setTerm(e.target.value)} />
						</div>
						<FindPeople {...props} />
					</div>
				)} />
			</section>
		</div>
	)
}

export default Discover
