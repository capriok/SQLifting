/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'

import CompositionPreview from './previews/composition-preview'
import ExercisePreview from './previews/exercise-preview'
import CircuitPreview from './previews/circuit-preview'
import WorkoutPreview from './previews/workout-preview'

interface Props {
	preview: any
}

const Preview: React.FC<Props> = ({ preview }) => {

	useEffect(() => {
		(preview && !isEmpty(preview)) && console.log('%cPreviewing', 'color: lightskyblue', preview);
	}, [preview])

	switch (preview && preview.group) {
		case 'compositions':
			return <CompositionPreview preview={preview} />
		case 'composites':
			switch (preview.table) {
				case 'exco':
					return <ExercisePreview preview={preview} />
				case 'circ':
					return <CircuitPreview preview={preview} />
				case 'woco':
					return <WorkoutPreview preview={preview} />
				default:
					break;
			}
			break;
		default:
			return (<><h1>The renderer returned nothing.</h1></>)
	}
	return (<></>)
}

export default Preview
