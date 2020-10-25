const globalReducer = (state, action) => {
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
		default:
			return state;
	}
}

export default globalReducer