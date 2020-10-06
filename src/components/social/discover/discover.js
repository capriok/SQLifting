/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../../../state/state'
import { SQLiftingAcc } from '../../../api/sqlifting'

import styles from '../../../styles/social/discover/discover.module.scss'

import DiscoverNav from './discover-nav'
import FindPeople from './find-people'
import Community from './community'
import { Button, Input } from 'godspeed'

const Discover = () => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	const [term, setTerm] = useState('')
	const [people, setPeople] = useState([])

	const fetchPeople = () => {
		SQLiftingAcc.get(`/users/${uid}`)
			.then(res => {
				setPeople(res.data)
			})
			.catch(err => console.log(err))
	}

	const searchPeople = () => {
		SQLiftingAcc.get(`/usersByTerm/${uid}/${term}`)
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
		const to = setTimeout(() => {
			searchPeople()
		}, 500);
		return () => clearTimeout(to)
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
