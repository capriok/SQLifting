/*eslint no-unused-vars: "off"*/
import { useStateValue } from '../state'
import { SQLifting, installProps } from '../api/sqlifting'

const log = (message, log) => console.log(`%c${message}`, 'color: lightskyblue', log)

const useUpdate = () => {
  const [{ user: { details: { uid } }, composites, compositions
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
    SQLifting.get('/get/compositions', { params: params })
      .then(res => {
        let final = installProps(res)
        log('Compositions returned', final)
        dispatch({
          type: "COMPOSITION_ACTION",
          compositions: { ...compositions, ...final }
        })
      })
      .catch(err => console.log(err))
  }

  const updateComposites = (params) => {
    SQLifting.get('/get/composites', { params: params })
      .then(res => {
        let final = installProps(res)
        attachDependencies(final)
      })
      .catch(err => console.log(err))
  }

  const attachDependencies = (semiFinal) => {
    let final = { ...semiFinal }
    const hasCircs = (semiFinal.hasOwnProperty('circs') && semiFinal.circs.length > 0)
    const hasExcos = (semiFinal.hasOwnProperty('excos') && semiFinal.excos.length > 0)
    const hasWocos = (semiFinal.hasOwnProperty('wocos') && semiFinal.wocos.length > 0)
    if (hasCircs) {
      semiFinal.circs.forEach((circ) => {
        let circ_id = circ.id
        SQLifting.get('/get/circ_deps', { params: { circ_id } })
          .then(res => {
            circ.deps = res.data
          })
          .catch(err => console.log(err))
      })
    }
    if (hasExcos) {
      semiFinal.excos.forEach((exco) => {
        let exco_id = exco.id
        SQLifting.get('/get/exco_deps', { params: { exco_id } })
          .then(res => {
            exco.deps = res.data
          })
          .catch(err => console.log(err))
      })
    }
    if (hasWocos) {
      semiFinal.wocos.forEach((woco) => {
        let woco_id = woco.id
        SQLifting.get('/get/woco_deps', { params: { woco_id } })
          .then(res => {
            woco.exco = res.data[0]
            woco.circ = res.data[1]
            if (hasCircs) {
              res.data[1].forEach((circ) => {
                let circ_id = circ.id
                SQLifting.get('/get/circ_deps', { params: { circ_id } })
                  .then(res => {
                    circ.deps = res.data
                  })
                  .catch(err => console.log(err))
              })
            }
          })
          .catch(err => console.log(err))
      })
    }
    dispatch({
      type: "COMPOSITE_ACTION",
      composites: { ...composites, ...final }
    })
    if (hasExcos || hasWocos || hasCircs) return log('Composites returned with dependencies', final)
    if (!hasExcos && !hasWocos && !hasCircs) return log('Composites returned no dependencies', final)
  }


  return update
}

export default useUpdate