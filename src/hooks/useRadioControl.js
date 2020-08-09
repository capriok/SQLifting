/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'
import { SQLifting } from '../api/sqlifting'

const useRadioControl = (exerciseBuild, setExerciseBuild, setPickedWorkout) => {
  const [{ composites, compositions, composites: { excos, wocos } }, dispatch] = useStateValue()
  const controlEXRadio = async (i, prop) => {
    const res = await SQLifting.get('/get/MAXpk', { params: { table: 'exco', id: 'exco_id' } })
    let nextId = res.data + 1
    console.log('next id', nextId); const copy = [...compositions[prop]]
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
          id: nextId,
          equipment: { id: copy[i].id, name: copy[i].name }
        })
        break;
      case 'muscles':
        setExerciseBuild({
          ...exerciseBuild,
          id: nextId,
          muscle: { id: copy[i].id, name: copy[i].name }
        })
        break;
      case 'exercises':
        setExerciseBuild({
          ...exerciseBuild,
          id: nextId,
          exercise: { id: copy[i].id, name: copy[i].name }
        })
        break;
      default:
        break;
    }
  }

  const controlBWRadio = (i, item) => {
    const copy = [...wocos]
    copy.forEach(item => item.checked = false);
    copy[i].checked = true
    dispatch({ type: 'COMPOSITE_ACTION', composites: { ...composites, wocos: copy } })
    setPickedWorkout(item)
  }

  return {
    controlEXRadio,
    controlBWRadio
  }
}

export default useRadioControl