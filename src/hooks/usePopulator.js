/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'
import { DATA_API, installProps } from '../api/sqlifting'


// Need to seriously re think the way we fetch data
// current method not scalable
// usePopulate > getWocos, getExcos, getExercises, etc.
// reform logic grouping arcitecture
// updatepopulation, 2/5 solution


const usePopulator = () => {
  const [{ user: { details: { uid } }, compositions, composites }, dispatch] = useStateValue()

  let compositionsTables = ['equipments', 'muscles', 'exercises', 'movements']
  let compositesTables = ['circs', 'excos', 'wocos']

  const updatePopulation = (type, tables) => {
    switch (type) {
      case undefined:
        populateCompositions(compositionsTables)
        populateComposites(compositesTables)
        break;
      case 'compositions':
        if (tables === undefined) tables = compositionsTables
        populateCompositions(tables)
        break;
      case 'composites':
        if (tables === undefined) tables = compositesTables
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
        if (tables.includes('wocos')) {
          fetchWocoDeps(semiFinal)
        } else {
          console.log('Composites', semiFinal)
          dispatch({
            type: 'COMPOSITE_ACTION',
            composites: { ...composites, ...semiFinal }
          })
        }
      })
      .catch(err => console.log(err))
  }

  const fetchWocoDeps = (semiFinal) => {
    const final = { ...semiFinal }
    semiFinal.wocos.forEach((item, i) => {
      DATA_API.get('/woco_excos', { params: { uid, id: item.id } })
        .then((res) => {
          final.wocos[i].woco_excos = res.data
        })
        .catch(err => console.log(err))
    })
    console.log('Composites', semiFinal)
    dispatch({
      type: 'COMPOSITE_ACTION',
      composites: { ...composites, ...final }
    })
  }

  return updatePopulation
}

export default usePopulator