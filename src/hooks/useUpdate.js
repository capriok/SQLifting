/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'
import { SQLifting, installProps } from '../api/sqlifting'

const useUpdate = () => {
  const [{ user: { details: { uid } }, composites, compositions }, dispatch] = useStateValue()

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
        console.log('Compositions returned', final)
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
        let final = installProps(res)
        console.log(final);
        if (final.hasOwnProperty('wocos') && final.wocos.length > 0) {
          getWoco_excos(final)
        } else {
          console.log('Composites returned', final)
          dispatch({
            type: "COMPOSITE_ACTION",
            composites: { ...composites, ...final }
          })
        }
      })
      .catch(err => console.log(err))
  }

  const getWoco_excos = (semiFinal) => {
    let final = { ...semiFinal }
    semiFinal.wocos.forEach((woco, i) => {
      let woco_id = woco.id
      SQLifting.get('/woco_excos', { params: { woco_id } })
        .then(res => {
          woco.woco_excos = res.data
        })
        .catch(err => console.log(err))
    })
    console.log('Composites returned with deps', final)
    dispatch({
      type: "COMPOSITE_ACTION",
      composites: { ...composites, ...final }
    })
  }


  return update
}

export default useUpdate