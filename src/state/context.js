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
		sidebarOption: true,
		tipsOption: true,
		accentOption: '#206fa3'
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
		build: {}
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
	if (LSops) initialState.options = LSops
	if (LSops) document.documentElement.style.setProperty('--app-accent', LSops.accentOption)
}

export default initialState