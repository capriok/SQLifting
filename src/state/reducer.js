const stateReducer = (state, action) => {
	switch (action.type) {
		case "AUTHORIZATION":
			return {
				...state,
				user: action.user
			};
		case "LOGOUT":
			return {
				...state,
				user: {
					isAuthenticated: false,
					token: '',
					details: {
						uid: undefined,
						username: ''
					}
				}
			};
		case "OPTION_ACTION":
			return {
				...state,
				options: action.options
			};
		case "COMPONENT_ACTION":
			return {
				...state,
				components: action.components
			};
		case "WEATHER_ACTION":
			return {
				...state,
				weather: action.weather
			};
		case "COMPOSITION_ACTION":
			return {
				...state,
				compositions: action.compositions
			};
		case "COMPOSITE_ACTION":
			return {
				...state,
				composites: action.composites
			};
		case "MANAGE_ACTION":
			return {
				...state,
				manage: action.manage
			};
		case "RESET_MANAGE":
			return {
				...state,
				manage: {
					active: {},
					preview: {},
					editor: {},
					selector: {
						selection: []
					},
				}
			};
		case "ASSEMBLE_ACTION":
			return {
				...state,
				assemble: action.assemble
			};
		case "RESET_ASSEMBLE":
			return {
				...state,
				assemble: {
					active: {},
					steps: [],
					activeStep: 0,
					activeEntities: [],
					build: {}
				}
			};
		case "WORKOUT_ACTION":
			return {
				...state,
				workout: action.workout
			};
		case "RESET_WORKOUT":
			return {
				...state,
				workout: {
					active: {},
					preview: {}
				}
			};
		default:
			return state;
	}
}

export default stateReducer