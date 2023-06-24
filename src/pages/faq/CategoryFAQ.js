import React, { useState, useEffect, useCallback } from 'react'
import { AppBreadcrumb } from 'src/components'
import { CreateQuestionCategory, DeleteCate, GetListCateGory, customFetch } from 'src/utils/axios'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import {
  CCard,
  CCardBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableBody,
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalFooter,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { cilOptions, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'
import { formatMoney } from 'src/utils/localStorage'
import { useSelector } from 'react-redux'
// import KolIcon from '../icons/everstarIcon/Kol'

const ListCode = () => {
  const [listCate, setListCate] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [nameCate, setNameCate] = useState('')

  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    const getListCate = async () => {
      try {
        const resp = await GetListCateGory({
          id: user?.username,
        })
        setListCate(resp[0].data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getListCate()

    // const interval = setInterval(() => {
    //   getListCate()
    // }, 60000)

    // return () => {
    //   clearInterval(interval)
    // }
  }, [])

  const onHandleDelte = async (id) => {
    if (window.confirm('Bạn có chắc chắc muốn xóa')) {
      await DeleteCate({
        id: id,
      })
      // setIsLoading(true)
      // const resp = await ListSaleCode()
      // setData(resp)
      // setIsLoading(false)
    }
  }

  const onHandleAddCate = async () => {
    const resp = await CreateQuestionCategory({
      content: nameCate,
      created: user?.username,
    })
    toast.success('Thêm danh mục thành công... Hệ thông cập nhật dữ liệu sau 30s')
    const respdata = await GetListCateGory({
      id: user?.username,
    })
    setListCate(respdata[0].data)
  }

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Danh mục Faq</h5>
        <CAccordion className="accordion-normal" style={{ width: 800 }}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <div className="icon_button_add icon_hanlde">Thêm danh mục FAQ</div>
            </CAccordionHeader>
            <CAccordionBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormInput
                    name="nameSearch"
                    type="text"
                    id="inputSearchCuser"
                    placeholder="Tên danh mục"
                    value={nameCate}
                    onChange={(e) => setNameCate(e.target.value)}
                  />
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    aria-label="Default select example"
                    name="isPayedSearch"
                    id="inputSearchCuserBanned"
                  >
                    <option value="">Admin</option>
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <div className="d-grid">
                    <CButton
                      color="primary"
                      // size="sm"
                      className="normal"
                      onClick={onHandleAddCate}
                    >
                      Gửi
                    </CButton>
                  </div>
                </CCol>
              </CForm>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Stt</CTableHeaderCell>
                <CTableHeaderCell>Tên danh mục</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Số lượng bài viết</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Xóa</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {listCate?.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.content}</CTableDataCell>
                  <CTableDataCell className="text-center">Hiển thị</CTableDataCell>

                  <CTableDataCell className="text-center">{item.questions.length}</CTableDataCell>

                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <div className="icon_hanlde" onClick={() => onHandleDelte(item._id)}>
                      <CIcon icon={cilTrash} customClassName="nav-icon" />
                    </div>
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
