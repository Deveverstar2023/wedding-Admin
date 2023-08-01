// import axios from 'axios'
import axios from 'axios'
import { getLocalAccessToken } from './localStorage'

const TIMEOUT_API = 10000;
const BaseUrl = 'https://api.cuoithoi.com.vn/api'

export const customFetch = axios.create({
  baseURL: BaseUrl,
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

export const csv = axios.create({
  baseURL: BaseUrl,
  responseType: 'blob',
  timeout: TIMEOUT_API
});

csv.interceptors.request.use(
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
  baseURL: BaseUrl,
})
// ----------------------------------------------------------------
export const getUser = async ({ keyword, page, pageSize }) => {
  try {
    const resp = await customFetch.get(
      `search-users?${keyword ? `keyword=${keyword}&` : ''}page=${page}&pageSize=${pageSize}`,
    )
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
//
//
export const getPackages = async () => {
  try {
    const resp = await customFetch.get('/list-product')
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
export const getSubPackages = async () => {
  try {
    const resp = await customFetch.get('/list-sub-product')
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
//----------------------------------------------------------------
export const getInvitations = async ({ keyword, page, pageSize }) => {
  try {
    const resp = await customFetch.get(
      `admin/list-all-invitation?page=${page}&pageSize=${pageSize}`,
    )
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
export const createSubProduct = async ({ name, userId }) => {
  try {
    const resp = await customFetch.post('/create-sub-product', {
      name: name,
      userId: userId,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}
export const CreateProduct = async ({ name, amount, subProduct }) => {
  try {
    const resp = await customFetch.post('/create-product', {
      name: name,
      amount: amount,
      subProduct: subProduct,
      createByUser: '643d0497d04d231dc24a2765',
    })
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

export const DetailsSaleCode = async ({ code }) => {
  try {
    const resp = await customFetch.post('/check-sale-code', {
      code: code,
    })
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
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteCateFAQ = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/admin-delete-list-question', {
      data: {
        _id: id,
      },
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const UpdateSaleCode = async ({ id, status }) => {
  try {
    const resp = await customFetch.put('/update-sale-code', {
      _id: id,
      status: status,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const GetListCateGoryFAQ = async ({ id }) => {
  try {
    const resp = await customFetch.get('/admin-get-list-question', {
      created: id,
    })
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

export const GetListNotification = async () => {
  try {
    const resp = await customFetch.get('/get-list-notification', {
      params: {
        created: "643d0497d04d231dc24a2765"
      }
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const GetInfomationBase = async () => {
  try {
    const resp = await customFetch.get('/get-information-base')
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteProductMain = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/delete-product', {
      data: {
        _id: id
      }
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteCate = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/delete-question/id', {
      data: {
        _id: id
      }
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteCateNotification = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/delete-notification/id', {
      data: {
        _id: id
      }
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteProduct = async ({ id }) => {
  try {
    const resp = await customFetch.delete('/delete-sub-product', {
      data: {
        _id: id
      }
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const DeleteProductOther = async ({ id }) => {
  try {
    const resp = await customFetch.post('/delete-other-product', {
      _id: id
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}


export const CreateQuestionCategory = async ({ content, created }) => {
  try {
    const resp = await customFetch.post('/create-question-category', {
      content: content,
      created: '643d0497d04d231dc24a2765',
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const CreateQuestionFAQ = async ({ title, description, created, categoryId }) => {
  try {
    const resp = await customFetch.post('/create-question', {
      title: title,
      description: description,
      created: "643d0497d04d231dc24a2765",
      categoryId: categoryId
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const CreateNotification = async ({ title, description, created }) => {
  try {
    const resp = await customFetch.post('/create-notification', {
      title: title,
      description: description,
      created: created,
      isNotification: 1
    })
    console.log(resp)
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const UpdateInvitation = async ({ id, status }) => {
  try {
    const resp = await customFetch.post('/update-invitation', {
      _id: id,
      status: status,
      isPaid: false
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const CreateInformationBase = async ({
  zaloNumber,
  numberPhone,
  nameBank,
  numberBank,
  ceoPeople,
  companyNumber,
  emailCompany,
  adressCompany,
  timeWork,
}) => {
  try {
    const resp = await customFetch.post('/create-information-base', {
      zaloNumber: zaloNumber,
      numberPhone: numberPhone,
      created: '643d0497d04d231dc24a2765',
      nameBank: nameBank,
      numberBank: numberBank,
      ceoPeople: ceoPeople,
      companyNumber: companyNumber,
      emailCompany: emailCompany,
      adressCompany: adressCompany,
      timeWork: timeWork,
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const GetListAnotherProduct = async () => {
  try {
    const resp = await customFetch.get('/list-other-product')
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const CreateAnotherProduct = async ({ name, amount }) => {
  try {
    const resp = await customFetch.post('/create-other-product', {
      name: name,
      amount: amount,
      userId: '643d0497d04d231dc24a2765'
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const ExtendsDate = async ({ id, extendsDate }) => {
  try {
    const resp = await customFetch.post('/extends-date-invitation', {
      _id: id,
      extendsDate: extendsDate
    })
    return resp.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const ExportInvitation = async ({ page, pageSize, status }) => {
  try {
    const resp = await csv.get('/admin/export-list-invitation', {
      params: {
        page: page,
        pageSize: pageSize
      }
    })
    return resp
  } catch (error) {
    throw new Error(error)
  }
}

export const ExportUser = async () => {
  try {
    const resp = await csv.get('/export-excel/list-users')
    return resp
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
