import React, { useState, useEffect, useCallback } from 'react'

import { DeleteProduct, customFetch, getPackages } from 'src/utils/axios'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import {
  CContainer,
  CCard,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableBody,
  CSpinner,
  CButton,
  CModal,
  CModalHeader,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CFormCheck,
} from '@coreui/react'
import { cilCheckCircle, cilPlus, cilTrash, cilXCircle } from '@coreui/icons'

import CIcon from '@coreui/icons-react'
// import KolIcon from '../icons/everstarIcon/Kol'
import { getSubPackages } from 'src/utils/axios'
import { formatMoney, getUserFromLocalStorage } from 'src/utils/localStorage'
import { createSubProduct } from 'src/utils/axios'
import { CreateProduct } from 'src/utils/axios'
import { toast } from 'react-toastify'
const initialProduct = {
  name: '',
  amount: '',
}
const PackageList = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [isModalSubActive, setIsModalSubActive] = useState(false)
  const [subPackages, setSubPackages] = useState([])
  const [packageList, setPackageList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [subName, setSubName] = useState('')
  const [product, setProduct] = useState(initialProduct)
  const [subChoose, setSubChoose] = useState([])
  // handle fetching data --------------------------------
  useEffect(() => {
    const getPackageList = async () => {
      try {
        setIsLoading(true)
        const resp = await getPackages()
        // update paginate after data fetching
        // -------------------------------------
        setPackageList(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getPackageList()
  }, [])
  const getSubPackageList = async () => {
    try {
      setIsLoading(true)
      const resp = await getSubPackages()
      // update paginate after data fetching
      // -------------------------------------
      setSubPackages(resp)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSubPackageList()
  }, [])
  const handleChangeSub = (e) => {
    const value = e.target.value
    setSubName(value)
  }
  const onCreateSubSubmit = (e) => {
    e.preventDefault()
    const createApi = async () => {
      try {
        const resp = await createSubProduct({ name: subName, userId: '6432604a29058115c6736c45' })
        toast.success('Tạo gói con thành công')
        const respSub = await getSubPackages()
        setSubPackages(respSub)
      } catch (error) {
        toast.error(error.message)
      }
    }
    createApi()
  }
  const handleChangePackage = (e) => {
    const name = e.target.name
    const value = e.target.value
    setProduct((prev) => ({ ...prev, [name]: value }))
  }
  const handleChangeSubChoose = (e) => {
    const value = e.target.id
    const exists = subChoose.includes(value)
    if (exists) return
    setSubChoose((prev) => [...prev, value])
  }
  const handleSubmitProduct = (e) => {
    e.preventDefault()
    const createProductApi = async () => {
      try {
        const resp = await CreateProduct({ ...product, subProduct: subChoose })
        setPackageList((prev) => [...prev, resp])
        console.log(resp)
        toast.success('Tạo gói sản phẩm thành công')
      } catch (error) {
        toast.error(error.message)
      }
    }
    createProductApi()
  }

  const onHandleDelete = useCallback(async (id, name) => {

    await DeleteProduct({
      id: id
    })
    const resp = await getSubPackages()
    setSubPackages(resp)
    toast.success('Đã xóa gói ' + name)

  }, [])

  return (
    <div>
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Các gói sản phẩm</h5>
        <CButton
          color="primary"
          shape="rounded-pill"
          variant="outline"
          onClick={() => setIsModalActive(true)}
        >
          <span className="margin-left">Tạo thêm gói</span>
          <CIcon icon={cilPlus} />
        </CButton>
      </div>
      <CCard>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Package Name</CTableHeaderCell>
              {subPackages.map((sub, i) => {
                return <CTableHeaderCell key={i} className="text-center">{sub.name}</CTableHeaderCell>
              })}
              <CTableHeaderCell>Giá</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Xóa</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {packageList?.map((item, index) => {
              return (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  {subPackages.map((sub, indexName) => {
                    if (item.subProduct[indexName]?.name === sub.name) {
                      return (
                        <CTableHeaderCell className="text-center" key={indexName}>
                          <CIcon icon={cilCheckCircle} />
                        </CTableHeaderCell>
                      )
                    } else {
                      return (
                        <CTableHeaderCell className="text-center" key={indexName}>
                          <CIcon icon={cilXCircle} />
                        </CTableHeaderCell>
                      )
                    }
                  })}
                  <CTableDataCell>{formatMoney(item.amount)}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="icon_hanlde" onClick={() => onHandleDelete(item._id)}>
                      <CIcon icon={cilTrash} customClassName="nav-icon" />
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
        <CModal visible={isModalActive} onClose={() => setIsModalActive(false)} alignment="center">
          <CModalHeader className="font-bold">
            <strong>Tạo gói mới</strong>
          </CModalHeader>
          <form className=" p-4" onSubmit={handleSubmitProduct}>
            <CFormLabel className=" font-bold">Tên gói</CFormLabel>
            <CFormInput
              name="name"
              placeholder="Tên gói"
              aria-label="packageName"
              value={product.name}
              onChange={handleChangePackage}
            />
            <CFormLabel className=" font-bold pt-2">Số tiền</CFormLabel>
            <CFormInput
              name="amount"
              placeholder="Số tiền"
              aria-label="packageName"
              value={product.amount}
              onChange={handleChangePackage}
            />
            <CFormLabel htmlFor="basic-url" className="font-bold pt-4">
              Gán gói tương ứng
            </CFormLabel>
            {subPackages.map((sub, i) => {
              return <CFormCheck key={i} id={sub._id} label={sub.name} onChange={handleChangeSubChoose} />
            })}
            <CModalFooter>
              <CButton color="secondary" onClick={() => setIsModalActive(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={handleSubmitProduct}>
                Tạo gói mới
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
      </CCard>
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Các gói sản phẩm nhỏ</h5>
        <CButton
          color="primary"
          shape="rounded-pill"
          variant="outline"
          onClick={() => setIsModalSubActive(true)}
        >
          <span className="margin-left">Tạo thêm gói</span>
          <CIcon icon={cilPlus} />
        </CButton>
      </div>
      <CCard>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Stt</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Sub package Id</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Xóa</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {subPackages?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item._id}</CTableDataCell>
                <CTableDataCell className="text-center" onClick={() => onHandleDelete(item._id, item.name)}>
                  <div className="icon_hanlde" >
                    <CIcon icon={cilTrash} customClassName="nav-icon" />
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CModal
          visible={isModalSubActive}
          onClose={() => setIsModalSubActive(false)}
          alignment="center"
        >
          <CModalHeader className="font-bold">
            <strong>Tạo gói sản phẩm con</strong>
          </CModalHeader>
          <form className=" p-4" onSubmit={onCreateSubSubmit}>
            <CFormLabel htmlFor="packageName" className=" font-bold">
              Tên gói sản phẩm con
            </CFormLabel>
            <CFormInput
              placeholder="Tên gói"
              aria-label="packageName"
              onChange={handleChangeSub}
              value={subName}
            />

            <CModalFooter>
              <CButton color="secondary" onClick={() => setIsModalSubActive(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={onCreateSubSubmit}>
                Tạo gói
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
      </CCard>
    </div>
  )
}
export default PackageList
