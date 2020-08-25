import { useStateValue } from '../state'

const useActiveByPath = () => {
	const [initialState] = useStateValue()

	let group = window.location.pathname.split('/')[2]
	let entity = window.location.pathname.split('/')[3]
	let nameQuery = entity

	if (group === 'composites') {
		if (entity === 'circuits') entity = 'circs'
		if (entity === 'exercises') entity = 'excos'
		if (entity === 'workouts') entity = 'wocos'
	}
	initialState.manager.active = {
		name: nameQuery.capitalize(),
		groupState: initialState[group],
		entity: entity,
		group: group,
		table: entity.slice(0, -1)
	}
	return initialState.manager.active
}

export default useActiveByPath