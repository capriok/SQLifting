import { useStateValue } from '../state'

const useFetchData = (workoutBuild, setWorkoutBuild) => {
  const [{ data, exercises, workouts }, dispatch] = useStateValue()


  const controlDBCheckbox = (i, type, prop, setter) => {
    let copy
    const flipbox = () => copy[i].checked = !copy[i].checked
    let selection = []
    switch (type) {
      case 'data':
        copy = [...data[prop]]
        flipbox()
        dispatch({ type: 'DBaction', data: { ...data, copy } })
        copy.map((item) => {
          item.checked && selection.push(item.name)
          setter(selection)
        })
        break;
      case 'workouts':
        copy = [...workouts]
        flipbox()
        dispatch({ type: 'WOaction', workouts: copy })
        copy.map((item) => {
          item.checked && selection.push(item.name)
          setter(selection)
        })
        break;
      case 'exercises':
        copy = [...exercises]
        flipbox()
        dispatch({ type: 'EXaction', exercises: copy })
        copy.map((item) => {
          item.checked && selection.push(item.name)
          setter(selection)
        })
        break;
      default:
        break;
    }
  }

  const controlWOCheckbox = (i, name) => {
    const copy = [...exercises]
    let isDupe = false
    workoutBuild.workout.forEach(item => {
      if (item.name === name) isDupe = true
    });
    if (copy[i].checked) {
      let filteredWorkout = workoutBuild.workout.filter(item => {
        return item.name !== name
      })
      copy[i].checked = !copy[i].checked
      setWorkoutBuild({
        ...workoutBuild,
        workout: filteredWorkout
      })
      return
    }
    if (!isDupe && name) {
      copy[i].checked = !copy[i].checked
      setWorkoutBuild({
        ...workoutBuild,
        workout: [
          ...workoutBuild.workout,
          {
            id: workouts.length + 1,
            name: name,
            exercise: exercises[i],
            reps: 1,
            sets: 1
          }
        ]
      })
    }
  }


  return {
    controlDBCheckbox,
    controlWOCheckbox
  }
}

export default useFetchData
