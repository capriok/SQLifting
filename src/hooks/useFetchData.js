/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'

import { DATA_API, installProps } from '../api/sqlifting'

const useFetchData = () => {
  const [{ user }, dispatch] = useStateValue()
  const queryParams = { params: { uid: user.details.uid } }

  const populateCompositions = async () => {
    DATA_API.get('/compositions', queryParams)
      .then(res => {
        const final = installProps(res)
        console.log(final)
        dispatch({
          type: 'COMPOSITION_ACTION',
          compositions: {
            equipments: final.equipments,
            muscles: final.muscles,
            exercises: final.exercises,
            movements: final.movements
          }
        })
      })
      .catch(err => console.log(err))
  }

  const populateComposites = async () => {
    DATA_API.get('/composites', queryParams)
      .then(res => {
        const final = installProps(res)
        console.log(final)
        dispatch({
          type: 'COMPOSITE_ACTION',
          composites: {
            excos: final.exercises,
            wocos: final.workouts,
            circos: final.circuits
          }
        })
      })
      .catch(err => console.log(err))
  }

  return {
    populateCompositions,
    populateComposites
  }
}

export default useFetchData
