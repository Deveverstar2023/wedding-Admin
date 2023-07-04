import React, { useState, useEffect, useCallback } from 'react'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import {
  CCard,
  CCardBody,
  CCol,
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
  CDropdownItem,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CModal,
  CModalFooter
} from '@coreui/react'
import { ExportInvitation, ExtendsDate, UpdateInvitation, getInvitations } from 'src/utils/axios'
import { dataFetchingPaginate } from 'src/utils/dataFetchingPaginate'
import { formatMoney } from 'src/utils/localStorage'
import moment from "moment";
import { getSubPackages } from 'src/utils/axios'
import { cilOptions, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import fileDownload from 'js-file-download'

const initialSearchFields = {
  nameSearch: '',
  emailSearch: '',
  isPayedSearch: '',
  // titleSearch: '',
}
const initialStatePage = {
  currentPage: 1,
  totalSize: 30,
  sizePerPage: 15,
  addMorePage: true,
}
const CUsers = () => {
  // const dispatch = useDispatch()
  // const columnsControl = useSelector((store) => store.cusers.columnsControl)
  // const { userId, userName, status } = columnsControl
  const [paginate, setPaginate] = useState(initialStatePage)
  const [usersList, setUsersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterName, setFilterName] = useState('')
  const [searchFields, setSearchFields] = useState(initialSearchFields)
  const [isModalActive, setIsModalActive] = useState(false)
  const [isModalActiveStatus, setIsModalActiveStatus] = useState(false)
  const [addCount, setAddCount] = useState(0)
  const [sellectStatus, setSellectStatus] = useState('3')
  const [id, setId] = useState(0)
  const [date, setDate] = useState(30)

  // handle pagination for pagination updates
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
        const resp = await getInvitations({
          pageSize: sizePerPage,
          page: currentPage,
        })
        // update paginate after data fetching
        const newPaginate = dataFetchingPaginate(paginate, resp.length)
        setPaginate(newPaginate)
        // -------------------------------------
        setUsersList(resp.filter(item => item.status === 1))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getUserList()
  }, [paginate.currentPage, filterName])

  const renderStatus = useCallback((value) => {
    if (value === 1) return 'Đã thanh toán'
    else if (value === 2) return 'Miễn phí'
    else if (value === 3) return 'Bản nháp'
    else if (value === 4) return 'Miễn phí'
    else if (value === 5) return 'Hết hạn'
    else if (value === 6) return 'Đang yêu cầu'
    else return 'Miễn phí'
  }, [])

  const onHandleExport = useCallback(async () => {
    const { sizePerPage, currentPage } = paginate
    const response = await ExportInvitation({
      page: currentPage,
      pageSize: sizePerPage,
      status: 6
    })
    fileDownload(response.data, `Danh sách thiệp.xlsx`)
  }, [paginate])

  const setModalActive = (id) => {
    setIsModalActive(true)
    setId(id)
  }

  const setModalActiveStatus = (id) => {
    setIsModalActiveStatus(true)
    setId(id)
  }

  const handleSubmitProduct = async () => {
    const resp = await ExtendsDate({
      id: id,
      extendsDate: addCount
    })
    setIsModalActive(false)
  }
  const handleChangeStatus = useCallback(async () => {

    await UpdateInvitation({
      id: id,
      status: sellectStatus
    })
    try {
      setIsModalActiveStatus(false)
      const { sizePerPage, currentPage } = paginate
      const resp = await getInvitations({
        pageSize: sizePerPage,
        page: currentPage,
      })
      const newPaginate = dataFetchingPaginate(paginate, resp.length)
      setPaginate(newPaginate)
      setUsersList(resp.filter(item => item.status === 1))
    } catch (error) {
      console.log(error)
    }

  }, [id])

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Danh sách thiệp hoạt động</h5>
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
                <h5>Tìm kiếm</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CForm className="row g-3">
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuser">Name</CFormLabel>
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
                    <CFormLabel htmlFor="inputSearchCuserEmail">Search by email</CFormLabel>
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
                    <CFormLabel htmlFor="inputSearchCuserBanned">Payed</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="isPayedSearch"
                      id="inputSearchCuserBanned"
                      onChange={handleChangeSearchField}
                      value={searchFields.isPayededSearch}
                    >
                      <option value="">None</option>
                      <option value={true}>Yes</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Clear search fields</CFormLabel>
                    <div className="d-grid">
                      <CButton
                        color="danger"
                        onClick={clearSearchFields}
                        // size="sm"
                        className="normal"
                      >
                        Clear fields
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
                        Submit
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
                <CTableHeaderCell>Invitation Id</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Phone number</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Dịch vụ</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tổng tiền</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ngày thanh toán</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Mã giới thiệu</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Mã giao dịch</CTableHeaderCell>
                <CTableHeaderCell>Chức năng</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {usersList?.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item._id}</CTableDataCell>
                  <CTableDataCell>
                    <div>{item.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>+{item.phoneNumber}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{renderStatus(item.status)}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.productName}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{formatMoney(item.totalAmount)}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{moment(item.paymentTime).format("DD-MM-YYYY")}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.codeInvite}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.OID}</div>
                  </CTableDataCell>
                  <CTableDataCell style={{ cursor: 'pointer' }}>
                    <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          onClick={() => setModalActive(item?._id)}
                        >
                          Thêm ngày hoạt động
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={() => setModalActiveStatus(item?._id)}
                        >
                          Chỉnh sửa trạng thái
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
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
        <CModal visible={isModalActive} onClose={() => setIsModalActive(false)} alignment="center">
          <form className=" p-4" onSubmit={handleSubmitProduct}>
            <CFormLabel className=" font-bold">Số ngày cần thêm</CFormLabel>
            <div className='form' style={{ display: 'flex', gap: 10 }}>
              <CFormInput
                name="name"
                placeholder="Nhập số ngày"
                aria-label="packageName"
                value={addCount}
                onChange={(e) => setAddCount(e.target.value)}
                type='number'
                style={{ flex: 1 }}
              />
              <CButton color="secondary" onClick={() => setIsModalActive(false)}>
                Đóng
              </CButton>
              <CButton color="primary" onClick={handleSubmitProduct}>
                Thêm
              </CButton>
            </div>
          </form>
        </CModal>
        <CModal visible={isModalActiveStatus} onClose={() => setIsModalActiveStatus(false)} alignment="center">
          <form className=" p-4" onSubmit={handleChangeStatus}>
            <CFormLabel className=" font-bold">Cập nhật lại trạng thái thiệp</CFormLabel>
            <div className='form' style={{ display: 'flex', gap: 10 }}>
              <CFormSelect
                aria-label="Default select example"
                name="isPayedSearch"
                id="inputSearchCuserBanned"
                value={sellectStatus}
                onChange={(e) => setSellectStatus(e.target.value)}
                style={{ flex: 1 }}
              >
                <option value={3}>Miễn Phí</option>
                <option value={5}>Hết hạn</option>

              </CFormSelect>
              <CButton color="secondary" onClick={() => setIsModalActiveStatus(false)}>
                Đóng
              </CButton>
              <CButton color="primary" onClick={handleChangeStatus}>
                Thay đổi
              </CButton>
            </div>
          </form>
        </CModal>
      </CCard>

    </div>
  )
}
export default CUsers
