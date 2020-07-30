/*eslint array-callback-return: "off"*/
import { useStateValue } from '../state'

const useFetchData = (workoutBuild, setWorkoutBuild) => {
  const [{ compositions, composites }, dispatch] = useStateValue()


  const controlDBCheckbox = (i, type, prop, setter) => {
    let copy
    const flipbox = () => copy[i].checked = !copy[i].checked
    const setSelection = (setter) => {
      copy.map((item) => {
        item.checked && selection.push(item.name)
      })
      setter(selection)
    }
    let selection = []
    switch (type) {
      case 'COMPOSITION_ACTION':
        copy = [...compositions[prop]]
        flipbox()
        dispatch({
          type: type,
          compositions: { ...compositions, copy }
        })
        setSelection(setter)
        break;
      case 'COMPOSITE_ACTION':
        copy = [...composites[prop]]
        flipbox()
        dispatch({
          type: type,
          composites: { ...composites, copy }
        })
        setSelection(setter)
        break;
      default:
        break;
    }
  }

  const controlWOCheckbox = (i, name) => {
    // const copy = [...exercises]
    // let isDupe = false
    // workoutBuild.workout.forEach(item => {
    //   if (item.name === name) isDupe = true
    // });
    // if (copy[i].checked) {
    //   let filteredWorkout = workoutBuild.workout.filter(item => {
    //     return item.name !== name
    //   })
    //   copy[i].checked = !copy[i].checked
    //   setWorkoutBuild({
    //     ...workoutBuild,
    //     workout: filteredWorkout
    //   })
    //   return
    // }
    // if (!isDupe && name) {
    //   copy[i].checked = !copy[i].checked
    //   setWorkoutBuild({
    //     ...workoutBuild,
    //     workout: [
    //       ...workoutBuild.workout,
    //       {
    //         id: workouts.length + 1,
    //         name: name,
    //         exercise: exercises[i],
    //         reps: 1,
    //         sets: 1
    //       }
    //     ]
    //   })
    // }
  }


  return {
    controlDBCheckbox,
    controlWOCheckbox
  }
}

export default useFetchData
