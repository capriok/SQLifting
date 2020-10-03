/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState, useEffect, useRef } from 'react'
import { Route } from 'react-router-dom'
import { useStateValue } from '../state/state'

import User from '../components/social/user/user'
import Discover from '../components/social/discover/discover'

const Social = () => {
	const [{
		user: {
			details: {
				uid
			}
		}
	},] = useStateValue()

	return (
		<>
			<Route path='/social/user' render={() => (
				<>
					<User />
				</>
			)} />
			<Route path='/social/discover' render={() => (
				<>
					<Discover />
				</>
			)} />
		</>
	)
}

export default Social