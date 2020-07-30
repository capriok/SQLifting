import { useStateValue } from '../state'

import { DATA_API, installProps } from '../api/sqlifting'

const useFetchData = () => {
  const [{ user, data }, dispatch] = useStateValue()
  // const queryParams = { params: { uid: user.details.user_id } }
  const queryParams = { params: { uid: 1 } }

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
            exercises: final.exercises
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
            exercises: final.exercises,
            workouts: final.workouts,
            circuits: final.circuits
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
