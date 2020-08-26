import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useStateValue } from '../../state'

import styles from '../../styles/assemble/actions.module.scss'

import { Button } from 'godspeed'

const AssembleActions = () => {
	const [{
		assemble: { }
	}] = useStateValue()



	return (
		<div className={styles.assemble_actions}>
			<Button
				text="Edit"
				size="xsm"
			// className={}
			// onClick={() => }
			// disabled={isEmpty()}
			/>
			<div className={styles.select_group}>
				<Button
					text="Select"
					size="xsm"
				// className={}
				// onClick={() => }
				/>
				<Button
					text="Delete"
					size="xsm"
				// className={}
				// onClick={() => }
				// disabled={isEmpty()}
				/>
			</div>
		</div >
	)
}

export default AssembleActions
