import Axios from 'axios'

const BASE_GET = process.env.REACT_APP_GET
// const BASE_POST = process.env.REACT_APP_POST
const BASE_ACC = process.env.REACT_APP_ACCOUNT

export const installProps = (res) => {
  let final = {}
  for (let i = 0; i < Object.keys(res.data).length; i++) {
    const keys = Object.keys(res.data)
    let key = res.data[keys[i]]
    key.forEach(item => {
      item.checked = false
    })
    final[keys[i]] = key
  }
  return final
}


export const ACCOUNT_API = Axios.create({
  baseURL: BASE_ACC
})

export const DATA_API = Axios.create({
  baseURL: BASE_GET
})