const globalState = {
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
let LSuser = JSON.parse(localStorage.getItem('SQLifting-user'))
if (LStoken && LSuser) {
	globalState.user = {
		isAuthenticated: true,
		token: LStoken,
		details: LSuser
	}
	let LSops = JSON.parse(localStorage.getItem('SQLifting-options'))
	if (LSops) {
		globalState.options = LSops
		document.documentElement.style.setProperty('--app-background', LSops.backgroundOption)
		document.documentElement.style.setProperty('--app-primary', LSops.primaryOption)
		document.documentElement.style.setProperty('--app-secondary', LSops.secondaryOption)
	}
}
let LScomponents = JSON.parse(localStorage.getItem('SQLifting-components'))
if (LScomponents) {
	globalState.components = {
		...globalState.components,
		sidebar: LScomponents.sidebar
	}
}

export default globalState