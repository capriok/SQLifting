import { useStateValue } from '../state'

const useReset = () => {

  const [{ data, exercises, workouts }, dispatch] = useStateValue()

  const resetAll = () => {
    let { equipment: dataEQ, muscles: dataMU, exercises: dataEX } = data
    let WO = workouts
    let EX = exercises
    const reset = data => {
      data.forEach(data => data.checked = false)
    }
    reset(dataEQ)
    reset(dataMU)
    reset(dataEX)
    reset(EX)
    reset(WO)
    dispatch({
      type: 'DBaction',
      data: {
        equipment: dataEQ,
        muscles: dataMU,
        exercises: dataEX
      }
    })
    dispatch({ type: 'EXaction', exercises: EX })
    dispatch({ type: 'WOaction', workouts: WO })
  }

  return resetAll
}

export default useReset