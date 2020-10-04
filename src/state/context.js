const initialState = {
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
		sidebarOption: true
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
		circs: [],
		excos: [],
		wocos: []
	},
	manage: {
		active: {},
		preview: {},
		editor: {},
		selector: {
			selection: []
		},
	},
	assemble: {
		active: {},
		steps: [],
		activeStep: 0,
		activeEntities: [],
		readyForNext: false,
		build: {}
	},
	social: {
		active: {}
	}
}

let LStoken = localStorage.getItem('SQLifting-token')
let LSuser = JSON.parse(localStorage.getItem('SQLifting-user'))
if (LStoken && LSuser) {
	initialState.user = {
		isAuthenticated: true,
		token: LStoken,
		details: LSuser
	}
	let LSops = JSON.parse(localStorage.getItem('SQLifting-options'))
	if (LSops) {
		initialState.options = LSops
		document.documentElement.style.setProperty('--app-background', LSops.backgroundOption)
		document.documentElement.style.setProperty('--app-primary', LSops.primaryOption)
		document.documentElement.style.setProperty('--app-secondary', LSops.secondaryOption)
	}
}
let LScomponents = JSON.parse(localStorage.getItem('SQLifting-components'))
if (LScomponents) {
	initialState.components = {
		...initialState.components,
		sidebar: LScomponents.sidebar
	}
}

export default initialState