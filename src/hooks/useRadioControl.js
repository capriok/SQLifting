import { useStateValue } from '../state'

const useRadioControl = (exerciseBuild, setExerciseBuild, setPickedWorkout) => {
  const [{ compositions, compositions: { exercises }, workouts }, dispatch] = useStateValue()

  const controlEXRadio = (i, prop) => {
    const copy = [...compositions[prop]]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({
      type: 'COMPOSITION_ACTION',
      compositions: { ...compositions, [prop]: copy }
    })
    switch (prop) {
      case 'equipments':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          equipment: { id: copy[i].id, name: copy[i].name }
        })
        break;
      case 'muscles':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          muscle: { id: copy[i].id, name: copy[i].name }
        })
        break;
      case 'exercises':
        setExerciseBuild({
          ...exerciseBuild,
          id: exercises.length + 1,
          exercise: { id: copy[i].id, name: copy[i].name }
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