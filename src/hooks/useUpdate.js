/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'
import { SQLifting, installProps } from '../api/sqlifting'

const useUpdate = () => {
  const [{
    user: { details: { uid } },
    compositions,
    composites,
    composites: { circs, excos, wocos }
  }, dispatch] = useStateValue()

  const update = (type, requests) => {
    if (type === undefined) return console.log('Expecting a type')
    if (typeof requests !== 'object' && (type === 'compositions' || type === 'compositions')) return console.log('Expecting requests array')
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
    SQLifting.get('/compositions', { params: params })
      .then(res => {
        let final = installProps(res)
        console.log('Update returned from ', final)
        dispatch({
          type: "COMPOSITION_ACTION",
          compositions: final
        })
      })
      .catch(err => console.log(err))
  }

  const updateComposites = (params) => {
    SQLifting.get('/composites', { params: params })
      .then(res => {
        let final = res.data
        console.log('Update returned from ', final)
        dispatch({
          type: "COMPOSITE_ACTION",
          composites: final
        })
        return final
      })
      .catch(err => console.log(err))
  }

  return update
}

export default useUpdate