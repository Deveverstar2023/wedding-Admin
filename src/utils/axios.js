// import axios from 'axios'
import axios from 'axios'
import { getLocalAccessToken } from './localStorage'
export const customFetch = axios.create({
  baseURL: 'http://14.225.254.190:3000/api',
})
customFetch.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      // config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
export const normalFetch = axios.create({
  baseURL: 'http://14.225.254.190:3000/api',
})
// ----------------------------------------------------------------
export const getUser = async ({ keyword, page, pageSize }) => {
  try {
    const resp = await customFetch.get(
      `search-users?${keyword ? `keyword=${keyword}&` : ''}page=${page}&pageSize=${pageSize}`,
    )
    console.log(resp)
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
// ----------------------------------------------------------------
export const getInvitations = async ({ keyword, page, pageSize }) => {
  try {
    const resp = await customFetch.get(
      `admin/list-all-invitation?page=${page}&pageSize=${pageSize}`,
    )
    console.log(resp)
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
