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
        const final = installProps(res)
        console.log('Composites', final)
        dispatch({
          type: 'COMPOSITE_ACTION',
          composites: { ...composites, ...final }
        })
      })
      .catch(err => console.log(err))
  }

  return updatePopulation
}

export default usePopulator