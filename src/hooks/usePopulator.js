/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'
import { DATA_API, installProps } from '../api/sqlifting'

const usePopulator = () => {
  const [{ user: { details: { uid } }, compositions, composites }, dispatch] = useStateValue()

  let compositionsTable = ['equipments', 'muscles', 'exercises', 'movements']
  let compositesTable = ['circs', 'excos', 'wocos']

  const updatePopulation = (type, tables) => {
    switch (type) {
      case undefined:
        populateCompositions()
        populateComposites()
        break;
      case 'compositions':
        if (tables === undefined) tables = compositionsTable
        populateCompositions(tables)
        break;
      case 'composites':
        if (tables === undefined) tables = compositesTable
        populateComposites(tables)
        break;
      default:
        break;
    }
  }

  const populateCompositions = async (tables) => {
    DATA_API.get('/compositions', { params: { uid, tables } })
      .then(res => {
        const final = installProps(res)
        console.log('Compositions', final)
        dispatch({
          type: 'COMPOSITION_ACTION',
          compositions: { ...compositions, ...final }
        })
      })
      .catch(err => console.log(err))
  }

  const populateComposites = async (tables) => {
    DATA_API.get('/composites', { params: { uid, tables } })
      .then(res => {
        const semiFinal = installProps(res)
        console.log('Composites', semiFinal)
        fetchwocoDeps(semiFinal)
      })
      .catch(err => console.log(err))
  }


  // wocos comes out as the last foreach obj not the whole arr.

  const fetchwocoDeps = (semiFinal) => {
    console.log(semiFinal);
    semiFinal.wocos.forEach(({ id }, i) => {
      DATA_API.get('/woco_excos', { params: { uid, id } })
        .then((res) => {
          const final = {
            ...semiFinal,
            wocos: {
              ...semiFinal.wocos[i],
              woco_excos: res.data
            }
          }
          dispatch({
            type: 'COMPOSITE_ACTION',
            composites: { ...composites, ...final }
          })
        })
        .catch(err => console.log(err))
    })
  }

  return updatePopulation
}

export default usePopulator