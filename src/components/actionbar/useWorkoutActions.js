/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../../state/state'
import useUpdate from '../../utils/useUpdate';

const useWorkoutActions = () => {
	const [, dispatch] = useStateValue()

	const update = useUpdate()

	const fullReset = () => {
		dispatch({ type: 'RESET_ASSEMBLE' })
	}

	return {
		fullReset
	}
}

export default useWorkoutActions
