import React, { useState, useEffect } from 'react'

import { customFetch, getPackages } from 'src/utils/axios'
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
import { cilCheckCircle, cilPlus, cilXCircle } from '@coreui/icons'

import CIcon from '@coreui/icons-react'
// import KolIcon from '../icons/everstarIcon/Kol'
import { getSubPackages } from 'src/utils/axios'

const PackageList = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const [subPackages, setSubPackages] = useState([])
  const [packageList, setPackageList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
  useEffect(() => {
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

    getSubPackageList()
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
              {subPackages.map((sub) => {
                return <CTableHeaderCell className="text-center">{sub.name}</CTableHeaderCell>
              })}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {packageList?.map((item, index) => {
              return (
                <CTableRow v-for="item in tableItems">
                  <CTableDataCell>{item.name}</CTableDataCell>
                  {subPackages.map((sub, indexName) => {
                    if (item.subProduct[indexName]?.name === sub.name) {
                      return (
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilCheckCircle} />
                        </CTableHeaderCell>
                      )
                    } else {
                      return (
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilXCircle} />
                        </CTableHeaderCell>
                      )
                    }
                  })}
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
        <CModal visible={isModalActive} onClose={() => setIsModalActive(false)} alignment="center">
          <CModalHeader className="font-bold">
            <strong>Tạo gói mới</strong>
          </CModalHeader>
          <form className=" p-4">
            <CFormLabel htmlFor="packageName" className=" font-bold">
              Tên gói
            </CFormLabel>
            <CFormInput placeholder="Tên gói" aria-label="packageName" />
            <CFormLabel htmlFor="basic-url" className="font-bold pt-4">
              Gán gói tương ứng
            </CFormLabel>
            <CFormCheck type="radio" name="" id="mobileInvitation" label="Mobile Invitation" />
            <CFormCheck type="radio" name="" id="videoClip" label="Video Clip" />
            <CFormCheck type="radio" name="" id="nftQrCode" label="NFT QR Code" />
            <CModalFooter>
              <CButton color="secondary" onClick={() => setIsModalActive(false)}>
                Close
              </CButton>
              <CButton color="primary">Đồng ý</CButton>
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
          onClick={() => setIsModalActive(true)}
        >
          <span className="margin-left">Tạo thêm gói</span>
          <CIcon icon={cilPlus} />
        </CButton>
      </div>
      <CCard>
        <CTable align="middle " className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Stt</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Sub package Id</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {subPackages?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item._id}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </div>
  )
}
export default PackageList
