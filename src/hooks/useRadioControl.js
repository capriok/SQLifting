import { useStateValue } from '../state'

const useRadioControl = (
  exerciseBuild,
  setExerciseBuild,
  setPickedWorkout
) => {
  const [{ data, exercises, workouts }, dispatch] = useStateValue()

  const controlEXRadio = (i, prop) => {
    const copy = [...data[prop]]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({ type: 'DBaction', data: { ...data, copy } })
    switch (prop) {
      case 'equipment':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          equipment: copy[i].name
        })
        break;
      case 'muscles':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          muscle: copy[i].name
        })
        break;
      case 'exercises':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          exercise: copy[i].name
        })
        break;
      default:
        break;
    }
  }

  const controlBWRadio = (i, item) => {
    const copy = [...workouts]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({ type: 'WOaction', workouts: copy })
    setPickedWorkout(item)
  }


  return {
    controlEXRadio,
    controlBWRadio
  }
}

export default useRadioControl