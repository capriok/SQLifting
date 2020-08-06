import Axios from 'axios'

const BASE_GET = process.env.REACT_APP_GET
// const BASE_POST = process.env.REACT_APP_POST
const BASE_ACC = process.env.REACT_APP_ACCOUNT

export const installProps = (res) => {
  let final = {}
  const keys = Object.keys(res.data)
  for (let i = 0; i < keys.length; i++) {
    let key = res.data[keys[i]]
    key.forEach(item => {
      item.checked = false
    })
    final[keys[i]] = key.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }
  return final
}


export const SQLiftingAcc = Axios.create({
  baseURL: BASE_ACC
})

export const SQLifting = Axios.create({
  baseURL: BASE_GET
})