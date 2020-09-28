/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state/state'
import { SQLifting } from '../api/sqlifting'

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
        updateCompositions(['equipments', 'muscles', 'exercises', 'movements'])
        updateComposites(['excos', 'circs', 'wocos'])
        break;
      case 'compositions':
        updateCompositions(requests)
        break;
      case 'composites':
        updateComposites(requests)
        break;
      default:
        break;
    }
  }

  const updateCompositions = (requests) => {
    let final = {}
    let count = 0
    requests.forEach(req => {
      SQLifting.get(`/${req}/${uid}`)
        .then(res => {
          final = { ...final, [req]: res.data }
          console.log(`%c${req.capitalize()} returned`, 'color: lightskyblue', { [req]: res.data })
          count++
          if (count === requests.length) {
            dispatch({
              type: "COMPOSITION_ACTION",
              compositions: { ...compositions, ...final }
            })
          }
        })
        .catch(err => console.log(err))
    });
  }

  const updateComposites = (requests) => {
    let final = {}
    let count = 0
    requests.forEach(req => {
      SQLifting.get(`/${req}/${uid}`)
        .then(res => {
          final = { ...final, [req]: res.data }
          console.log(`%c${req.capitalize()} returned`, 'color: lightskyblue', { [req]: res.data })
          count++
          if (count === requests.length) {
            dispatch({
              type: "COMPOSITE_ACTION",
              composites: { ...composites, ...final }
            })
          }
        })
        .catch(err => console.log(err))
    });
  }

  return update
}

export default useUpdate