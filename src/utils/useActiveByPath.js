import { useStateValue } from '../state'

const useActiveByPath = () => {
	const [initialState] = useStateValue()

	let view = window.location.pathname.split('/')[1]
	let group = window.location.pathname.split('/')[2]
	let entity = window.location.pathname.split('/')[3]
	let nameQuery = entity

	if (group === 'composites') {
		if (entity === 'circuits') entity = 'circs'
		if (entity === 'exercises') entity = 'excos'
		if (entity === 'workouts') entity = 'wocos'
	}
	let state

	switch (view) {
		case 'manage':
			state = initialState.manage.active = {
				name: nameQuery.capitalize(),
				groupState: initialState[group],
				entity: entity,
				group: group,
				table: entity.slice(0, -1)
			}
			break;
		case 'assemble':
			state = initialState.assemble.active = {
				name: nameQuery.capitalize(),
				groupState: initialState[group],
				entity: entity,
				group: group,
				table: entity.slice(0, -1)
			}
			break;
		default:
			break;
	}

	return state
}

export default useActiveByPath