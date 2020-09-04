import { useStateValue } from '../state/state'

const useActiveByPath = () => {
	const [initialState] = useStateValue()

	let view = window.location.pathname.split('/')[1]
	let group = window.location.pathname.split('/')[2]
	let entity = window.location.pathname.split('/')[3]
	let fragment = window.location.pathname.split('/')[4]
	let activePath = `${view}/${group}/${entity}`
	let name = entity
	let table = entity

	if (group === 'composites') {
		if (entity === 'circuits') entity = 'circs'
		if (entity === 'exercises') entity = 'excos'
		if (entity === 'workouts') entity = 'wocos'
	}
	let state

	switch (view) {
		case 'manage':
			state = initialState.manage.active = {
				name: name.capitalize(),
				groupState: initialState[group],
				activePath: activePath,
				entity: entity,
				group: group,
				table: table.slice(0, -1),
				fragment: fragment
			}
			break;
		case 'assemble':
			state = initialState.assemble.active = {
				name: name.capitalize(),
				groupState: initialState[group],
				activePath: activePath,
				entity: entity,
				group: group,
				table: table.slice(0, -1),
				fragment: fragment
			}
			break;
		default:
			break;
	}

	return state
}

export default useActiveByPath