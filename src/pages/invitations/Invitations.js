import React, { useState, useEffect } from 'react'
import { AppBreadcrumb } from 'src/components'
import { customFetch } from 'src/utils/axios'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalFooter,
} from '@coreui/react'
import { getUser } from 'src/utils/axios'
import { getInvitations } from 'src/utils/axios'
import { Api } from 'src/common/constant'
import { dataFetchingPaginate } from 'src/utils/dataFetchingPaginate'
import { cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'
// import KolIcon from '../icons/everstarIcon/Kol'

const initialSearchFields = {
  nameSearch: '',
  emailSearch: '',
  isPayedSearch: '',
  // titleSearch: '',
}
const initialStatePage = {
  currentPage: 1,
  totalSize: 30,
  sizePerPage: 4,
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
  const [invitationActiveId, setInvitationActiveId] = useState('')
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
        setUsersList(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getUserList()
  }, [paginate.currentPage, filterName])
  const handleActiveInvitations = async () => {
    const data = { _id: invitationActiveId }
    try {
      const resp = await customFetch.post('/active-invitation', data)
      toast.success('Active Invitation successfully')
      setIsModalActive(false)
    } catch (error) {
      console.log(error)
      toast.error('Active Invitation failed')
    }
  }
  console.log(usersList)
  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align ">
        <h5 style={{ margin: '0' }}>Invitations</h5>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <CAccordion className="accordion-normal">
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <h5>Search form</h5>
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

          <CTable align="middle " className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Stt</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Invitation Id</CTableHeaderCell>
                <CTableHeaderCell>Phone number</CTableHeaderCell>
                <CTableHeaderCell>More</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {usersList?.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>

                  <CTableDataCell className="text-center">{item.userName}</CTableDataCell>
                  <CTableDataCell>
                    <div>{item.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>{item._id}</CTableDataCell>
                  <CTableDataCell>+{item.phoneNumber}</CTableDataCell>
                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          onClick={() => {
                            setIsModalActive(true)
                            setInvitationActiveId(item._id)
                          }}
                        >
                          Active Invitation
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
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
      <CModal visible={isModalActive} onClose={() => setIsModalActive(false)} alignment="center">
        <CModalHeader>Are you sure to active this invitation?</CModalHeader>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsModalActive(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleActiveInvitations}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}
export default CUsers
