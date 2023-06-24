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

export const getGenerateCode = async () => {
  try {
    const resp = await customFetch.get('/generate-sale-code')
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const CreateSaleCode = async ({ name, code, percentOff }) => {
  try {
    const resp = await customFetch.post('/create-sale-code', {
      name: name,
      code: code,
      percentOff: percentOff,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const ListSaleCode = async () => {
  try {
    const resp = await customFetch.get('/list-sale-code')
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteSaleCode = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/delete-sale-code', {
      data: {
        _id: id,
      },
    })
    console.log(id, resp)
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const GetListCateGory = async ({ id }) => {
  try {
    const resp = await customFetch.get('/get-list-question', {
      created: id,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteCate = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/delete-question/id', {
      _id: id,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const CreateQuestionCategory = async ({ content, created }) => {
  try {
    const resp = await customFetch.post('create-question-category', {
      content: content,
      created: created,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
// const del = async (url, data, config) => {
//   try {
//       const headers = {
//           Authorization: `Bearer ${accessToken}`,
//           ...config?.headers,
//       };
//       const response = await api.delete(url, { ...config, headers, data });
//       return response.data;
//   } catch (error) {
//       return handleError(error);
//   }
// };
