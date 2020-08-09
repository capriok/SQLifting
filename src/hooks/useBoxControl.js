/*eslint array-callback-return: "off"*/
import { useStateValue } from '../state'
import { SQLifting } from '../api/sqlifting'

const useFetchData = (build, setBuild) => {
  const [{ compositions, composites, composites: { excos, wocos } }, dispatch] = useStateValue()

  const controlDBCheckbox = (i, type, prop, setter) => {
    let copy
    const flipbox = () => copy[i].checked = !copy[i].checked
    const setSelection = () => {
      copy.map((item) => {
        item.checked && selection.push(item.id)
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
        setSelection()
        break;
      case 'COMPOSITE_ACTION':
        copy = [...composites[prop]]
        flipbox()
        dispatch({
          type: type,
          composites: { ...composites, copy }
        })
        setSelection()
        break;
      default:
        break;
    }
  }

  // next id still bugged
  // must know current highest pk
  // repeat in radioControl   

  const controlWOCheckbox = async (i, name) => {
    const res = await SQLifting.get('/get/MAXpk', { params: { table: 'woco', id: 'woco_id' } })
    let nextId = res.data + 1
    console.log('next id', nextId);
    const copy = [...excos]
    let isDupe = false
    build.deps.forEach(item => {
      if (item.name === name) isDupe = true
    });
    if (copy[i].checked) {
      let filteredWorkout = build.deps.filter(item => {
        return item.name !== name
      })
      copy[i].checked = !copy[i].checked
      setBuild({
        ...build,
        deps: filteredWorkout
      })
      return
    }
    if (!isDupe && name) {
      copy[i].checked = !copy[i].checked
      setBuild({
        ...build,
        id: nextId,
        deps: [
          ...build.deps,
          {
            id: excos[i].id,
            name: name,
            sets: 4,
            reps: 10,
            weight: 10
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
