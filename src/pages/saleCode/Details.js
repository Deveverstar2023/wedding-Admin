import React, { useState, useEffect, useCallback } from 'react'
import { AppBreadcrumb } from 'src/components'
import { ListSaleCode, customFetch } from 'src/utils/axios'
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
import { cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const ListCode = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getDataCode = async () => {
      try {
        setIsLoading(true)
        const resp = await ListSaleCode()
        setData(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getDataCode()
  }, [])

  const convertNumber = (data) => {
    return parseInt(data)
  }

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Details Referral Code</h5>
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
                    <CFormLabel htmlFor="inputSearchCuser">Name</CFormLabel>
                    <CFormInput
                      name="nameSearch"
                      type="text"
                      id="inputSearchCuser"
                      placeholder="Input name"
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserEmail">Search by email</CFormLabel>
                    <CFormInput
                      name="emailSearch"
                      type="text"
                      id="inputSearchCuserEmail"
                      placeholder="Input email"
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserBanned">Payed</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="isPayedSearch"
                      id="inputSearchCuserBanned"
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
          <br />
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Stt</CTableHeaderCell>
                <CTableHeaderCell>Mã Code</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Phần trăm</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tên code</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Số lượng sử dụng</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Người tạo</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Chi tiết</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data?.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.code}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {convertNumber(item.percentOff * 100)} %
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.name}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{item.count}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>Admin</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem to={`/#/chi-tiet-ma-giam-gia/${item._id}`}>
                          Active Invitation
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default ListCode
