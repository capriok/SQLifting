import { useStateValue } from '../state'

const useActiveByPath = () => {
	const [initialState,] = useStateValue()
	let fullPath = window.location.pathname
	let path = window.location.pathname.split('/')[2]
	let query = window.location.pathname.split('/')[3]
	if (path === 'composites') {
		if (query === 'circuits') query = 'circs'
		if (query === 'exercises') query = 'excos'
		if (query === 'workouts') query = 'wocos'
	}

	initialState.active = {
		name: query.capitalize(),
		pathname: fullPath,
		parent: initialState[path],
		entity: query
	}
	return initialState.active
}

export default useActiveByPath