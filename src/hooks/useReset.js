import { useStateValue } from '../state'

const useReset = () => {
  const [{
    compositions: {
      equipments,
      muscles,
      exercises,
      movements
    },
    composites: {
      circs,
      excos,
      wocos
    }
  }, dispatch] = useStateValue()

  const resetAll = async () => {
    const reset = data => {
      data.forEach(data => data.checked = false)
    }
    reset(equipments)
    reset(muscles)
    reset(exercises)
    reset(movements)
    reset(circs)
    reset(excos)
    reset(wocos)
    dispatch({
      type: 'COMPOSITION_ACTION',
      compositions: {
        equipments,
        muscles,
        exercises,
        movements
      }
    })
    dispatch({
      type: 'COMPOSITE_ACTION',
      composites: {
        circs,
        excos,
        wocos
      }
    })

  }

  return resetAll
}

export default useReset