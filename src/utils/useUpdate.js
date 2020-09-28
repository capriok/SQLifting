/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state/state'
import { SQLifting, sortEntities } from '../api/sqlifting'

const useUpdate = () => {
  const [{
    user: {
      details: {
        uid }
    },
    composites,
    compositions
  }, dispatch] = useStateValue()

  const update = (type, requests) => {
    const missingRequests = typeof requests !== 'object' && (type === 'compositions' || type === 'compositions')
    if (type === undefined) return console.log('Expecting a type')
    if (missingRequests) return console.log('Expecting requests array')
    switch (type) {
      case 'all':
        updateCompositions({ uid, requests: ['equipments', 'muscles', 'exercises', 'movements'] })
        updateComposites({ uid, requests: ['circs', 'excos', 'wocos'] })
        break;
      case 'compositions':
        updateCompositions({ uid, requests })
        break;
      case 'composites':
        updateComposites({ uid, requests })
        break;
      default:
        break;
    }
  }

  const updateCompositions = (params) => {
    SQLifting.get(`/compositions/:${uid}`)
      .then(res => {
        let final = sortEntities(res)
        console.log('%cCompositions returned', 'color: lightskyblue', { compositions: final })
        dispatch({
          type: "COMPOSITION_ACTION",
          compositions: { ...compositions, ...final }
        })
      })
      .catch(err => console.log(err))
  }

  const updateComposites = (params) => {
    SQLifting.get('/composites', { params: params })
      .then(res => {
        let final = sortEntities(res)
        dispatch({
          type: "COMPOSITE_ACTION",
          composites: { ...composites, ...final }
        })
      })
      .catch(err => console.log(err))
  }

  return update
}

export default useUpdate