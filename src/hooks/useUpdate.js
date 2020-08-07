/*eslint no-unused-vars: "off"*/
import { useEffect } from 'react'
import { useStateValue } from '../state'
import { SQLifting, installProps } from '../api/sqlifting'

const log = (message, log) => console.log(`%c${message}`, 'color: lightskyblue', log)

const useUpdate = () => {
  const [{ user: { details: { uid } }, composites, compositions,
    compositions: { equipments, muscles, exercises, movements },
    composites: { excos, wocos, circs }
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
    SQLifting.get('/compositions', { params: params })
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
    SQLifting.get('/composites', { params: params })
      .then(res => {
        let final = installProps(res)
        attachDependencies(final)
      })
      .catch(err => console.log(err))
  }

  const attachDependencies = (semiFinal) => {
    let final = { ...semiFinal }
    const hasExcos = (semiFinal.hasOwnProperty('excos') && semiFinal.excos.length > 0)
    const hasWocos = (semiFinal.hasOwnProperty('wocos') && semiFinal.wocos.length > 0)
    if (!hasExcos && !hasWocos) return log('Composites returned no dependencies', final)
    if (hasExcos) {
      semiFinal.excos.forEach((exco, i) => {
        let exco_id = exco.id
        SQLifting.get('/exco_deps', { params: { exco_id } })
          .then(res => {
            exco.deps = res.data
          })
          .catch(err => console.log(err))
      })
    }
    if (hasWocos) {
      semiFinal.wocos.forEach((woco, i) => {
        let woco_id = woco.id
        SQLifting.get('/woco_deps', { params: { woco_id } })
          .then(res => {
            woco.deps = res.data
          })
          .catch(err => console.log(err))
      })
    }
    log('Composites returned with dependencies', final)
    dispatch({
      type: "COMPOSITE_ACTION",
      composites: { ...composites, ...final }
    })
  }

  const lengthLog = (message, arg) => arg.length > 0 && setTimeout(() => console.log(`%c${message}`, 'color: lightskyblue', arg.length), 50);
  useEffect(() => { lengthLog('Equipment', equipments) }, [equipments])
  useEffect(() => { lengthLog('Muscles', muscles) }, [muscles])
  useEffect(() => { lengthLog('Exercises', exercises) }, [exercises])
  useEffect(() => { lengthLog('Movements', movements) }, [movements])
  useEffect(() => { lengthLog('Excos', excos) }, [excos])
  useEffect(() => { lengthLog('Wocos', wocos) }, [wocos])
  useEffect(() => { lengthLog('Circs', circs) }, [circs])

  return update
}

export default useUpdate