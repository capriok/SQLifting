/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { SQLifting } from '../../api/sqlifting'
import { useStateValue } from '../../state'
import useUpdate from '../../utils/useUpdate';

import { isEmpty, uniqBy, remove } from 'lodash'

const useAssembleActions = () => {
	const [{
		assemble
	}, dispatch] = useStateValue()

	const update = useUpdate()

	const fullReset = () => {
		dispatch({ type: 'RESET_ASSEMBLE' })
	}

	return {
		fullReset
	}
}

export default useAssembleActions
