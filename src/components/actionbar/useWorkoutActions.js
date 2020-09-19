/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../../state/state'

const useWorkoutActions = () => {
	const [, dispatch] = useStateValue()

	const fullReset = () => {
		dispatch({ type: 'RESET_ASSEMBLE' })
	}

	return {
		fullReset
	}
}

export default useWorkoutActions
