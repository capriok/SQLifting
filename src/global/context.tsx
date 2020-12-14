export const globalState: GlobalState = {
	user: {
		isAuthenticated: false,
		token: '',
		details: {
			uid: '',
			username: ''
		}
	},
	weather: {},
	options: {
		backgroundOption: '#C7C7C7',
		primaryOption: '#f0f0f0',
		secondaryOption: '#206fa3',
		tipsOption: true,
		sidebarOption: true,
		dropsOption: false
	},
	components: {
		sidebar: true
	},
	compositions: {
		equipments: [],
		muscles: [],
		exercises: [],
		movements: []
	},
	composites: {
		circuits: [],
		exercises: [],
		workouts: []
	}
}

let LStoken = localStorage.getItem('SQLifting-token')
let LSuser = localStorage.getItem('SQLifting-user')
if (LStoken && LSuser) {
	const parsedLSuser = JSON.parse(LSuser)
	globalState.user = {
		isAuthenticated: true,
		token: LStoken,
		details: parsedLSuser
	}
	let LSops = localStorage.getItem('SQLifting-options')
	if (LSops) {
		const parsedLSops = JSON.parse(LSops)
		globalState.options = parsedLSops
		document.documentElement.style.setProperty('--app-background', parsedLSops.backgroundOption)
		document.documentElement.style.setProperty('--app-primary', parsedLSops.primaryOption)
		document.documentElement.style.setProperty('--app-secondary', parsedLSops.secondaryOption)
	}
}
let LScomponents = localStorage.getItem('SQLifting-components')
if (LScomponents) {
	const parsedLScomponents = JSON.parse(LScomponents)
	globalState.components = {
		...globalState.components,
		sidebar: parsedLScomponents.sidebar
	}
}