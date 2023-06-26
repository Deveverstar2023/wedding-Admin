import React, { useState, useEffect, useCallback } from 'react'
import { DeleteSaleCode, ListSaleCode, UpdateSaleCode } from 'src/utils/axios'
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormSwitch,
} from '@coreui/react'
import { cilOptions, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
const ListCode = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getDataCode = async () => {
      try {
        const resp = await ListSaleCode()
        setData(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getDataCode()
  }, [data])

  const convertNumber = (data) => {
    return parseInt(data)
  }

  const onHandleDelte = async (id) => {
    if (window.confirm('Bạn có chắc chắc muốn xóa')) {
      await DeleteSaleCode({
        id: id,
      })
      setIsLoading(true)
      const resp = await ListSaleCode()
      setData(resp)
      setIsLoading(false)
    }
  }
  const onChangeStatusCode = useCallback(async (id, status) => {

    let value = '';
    if (status === "ON") value = "OFF"
    else value = "ON"
    await UpdateSaleCode({
      id: id,
      status: value
    })

  }, [])

  const navigate = useNavigate();

  const onNavigate = (id) => navigate('/chi-tiet-ma-giam-gia/' + id)

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Danh sách mã giới thiệu</h5>
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
                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Xóa</CTableHeaderCell>
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
                  <CTableDataCell className="text-center">{item?.invitations && item?.invitations?.length}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>Admin</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CFormSwitch style={{ float: 'none' }} id="formSwitchCheckDefault" type="checkbox" valid={true} onChange={() => onChangeStatusCode(item._id, item.status)} checked={item.status === "ON" ? true : false} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="icon_hanlde" onClick={() => onHandleDelte(item._id)}>
                      <CIcon icon={cilTrash} customClassName="nav-icon" />
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem onClick={() => onNavigate(item.code)}>
                          Chi tiết mã code
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
