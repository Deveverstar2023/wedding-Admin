import React, { useState, useEffect, useCallback } from 'react'
import { AppBreadcrumb } from 'src/components'
import { ExportUser, customFetch } from 'src/utils/axios'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css'
import {
  CContainer,
  CCard,
  CCardBody,
  CCol,
  CAvatar,
  CForm,
  CFormInput,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableBody,
  CFormLabel,
  CFormSelect,
  CSpinner,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { getUser } from 'src/utils/axios'
import { Api } from 'src/common/constant'
import { dataFetchingPaginate } from 'src/utils/dataFetchingPaginate'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import fileDownload from 'js-file-download'

const initialSearchFields = {
  nameSearch: '',
  emailSearch: '',
  isPayedSearch: '',
}
const initialStatePage = {
  currentPage: 1,
  totalSize: 30,
  sizePerPage: 20,
  addMorePage: true,
}
const CUsers = () => {
  const [paginate, setPaginate] = useState(initialStatePage)
  const [usersList, setUsersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterName, setFilterName] = useState('')
  const [searchFields, setSearchFields] = useState(initialSearchFields)

  // handle pagination
  const changeCurrentPage = (numPage) => {
    setPaginate((prev) => ({ ...prev, currentPage: numPage }))
  }
  // ----------------------------------------------------------------
  const handleChangeSearchField = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSearchFields({ ...searchFields, [name]: value })
  }

  const handleSubmitSearchFields = (e) => {
    e.preventDefault()
    // handleListUser()
    // handleResetPagination()
  }
  const clearSearchFields = () => {
    // handleResetPagination()
    setSearchFields({ ...initialSearchFields })
  }
  // handle fetching data --------------------------------
  useEffect(() => {
    const getUserList = async () => {
      try {
        setIsLoading(true)
        const { sizePerPage, currentPage } = paginate
        const resp = await getUser({
          pageSize: sizePerPage,
          page: currentPage,
          keyword: filterName,
        })
        // update paginate after data fetching
        const newPaginate = dataFetchingPaginate(paginate, resp.length)
        setPaginate(newPaginate)
        // -------------------------------------
        setUsersList(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getUserList()
  }, [paginate.currentPage, filterName])

  const onHandleExport = useCallback(async () => {
    const response = await ExportUser()
    fileDownload(response.data, `Danh sách User.xlsx`)
  }, [paginate])

  return (
    <div>
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Tài khoản</h5>
        <div className="row-align title_table">
          <CButton
            color="primary"
            shape="rounded-pill"
            variant="outline"
            onClick={onHandleExport}
          >
            <span className="margin-left">Xuất Excel</span>
            <CIcon icon={cilPlus} />
          </CButton>
        </div>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <CAccordion className="accordion-normal" style={{ display: 'none' }}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <h5>Search form</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CForm className="row g-3">
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuser">tên</CFormLabel>
                    <CFormInput
                      name="nameSearch"
                      type="text"
                      id="inputSearchCuser"
                      placeholder="Input name"
                      onChange={handleChangeSearchField}
                      value={searchFields.nameSearch}
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserEmail">email</CFormLabel>
                    <CFormInput
                      name="emailSearch"
                      type="text"
                      id="inputSearchCuserEmail"
                      placeholder="Input email"
                      onChange={handleChangeSearchField}
                      value={searchFields.emailSearch}
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserBanned">Đã thanh toán</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="isPayedSearch"
                      id="inputSearchCuserBanned"
                      onChange={handleChangeSearchField}
                      value={searchFields.isPayededSearch}
                    >
                      <option value="">Không</option>
                      <option value={true}>Có</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Xóa tất cả</CFormLabel>
                    <div className="d-grid">
                      <CButton
                        color="danger"
                        onClick={clearSearchFields}
                        // size="sm"
                        className="normal"
                      >
                        Xóa
                      </CButton>
                    </div>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Submit search</CFormLabel>
                    <div className="d-grid">
                      <CButton
                        color="primary"
                        onClick={handleSubmitSearchFields}
                        // size="sm"
                        className="normal"
                      >
                        Gửi
                      </CButton>
                    </div>
                  </CCol>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Stt</CTableHeaderCell>
                <CTableHeaderCell>email</CTableHeaderCell>
                <CTableHeaderCell>Mã</CTableHeaderCell>
                <CTableHeaderCell>Số điện thoại</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Trang thái</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {usersList?.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>


                  <CTableDataCell>
                    <div>{item.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>{item._id}</CTableDataCell>
                  <CTableDataCell>+{item.phoneNumber}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.status}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <br />
          <div className="float-end margin-container">
            <Pagination
              currentPage={paginate.currentPage}
              totalSize={paginate.totalSize}
              theme="bootstrap"
              sizePerPage={paginate.sizePerPage}
              changeCurrentPage={changeCurrentPage}
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default CUsers
