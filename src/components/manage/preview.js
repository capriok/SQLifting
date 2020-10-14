/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'

import CompositionPreview from '../manage/previews/composition-preview'
import ExercisePreview from '../manage/previews/exercise-preview'
import CircuitPreview from '../manage/previews/circuit-preview'
import WorkoutPreview from '../manage/previews/workout-preview'

const Preview = ({ entity }) => {

	useEffect(() => {
		(entity && !isEmpty(entity)) && console.log('%cPreviewing', 'color: lightskyblue', entity);
	}, [entity])

	switch (entity && entity.group) {
		case 'compositions':
			return <CompositionPreview entity={entity} />
		case 'composites':
			switch (entity.table) {
				case 'exco':
					return <ExercisePreview entity={entity} />
				case 'circ':
					return <CircuitPreview entity={entity} />
				case 'woco':
					return <WorkoutPreview entity={entity} />
				default:
					break;
			}
			break;
		default:
			return (<><h1>The renderer returned nothing.</h1></>)
	}
}

export default Preview
