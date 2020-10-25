import Axios from 'axios'

const BASE_API = process.env.REACT_APP_API
const BASE_ACC = process.env.REACT_APP_ACCOUNT

export const SQLiftingAcc = Axios.create({
  baseURL: BASE_ACC
})

export const SQLifting = Axios.create({
  baseURL: BASE_API
})