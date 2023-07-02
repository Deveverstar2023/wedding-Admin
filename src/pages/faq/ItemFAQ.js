import React, { useState, useEffect, useCallback } from 'react'
import { CreateQuestionFAQ, DeleteCate, GetListCateGory, GetListCateGoryFAQ } from 'src/utils/axios'
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
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import { cilSettings, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
// import KolIcon from '../icons/everstarIcon/Kol'

const ListCode = () => {
  const [listFAQ, setListFAQ] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [nameCate, setNameCate] = useState('')
  const [listCate, setListCate] = useState([])
  const [content, setContent] = useState('')
  const [sellect, setSellect] = useState('')

  const { user } = useSelector((store) => store.auth)

  var count = 0;

  useEffect(() => {
    const getListCate = async () => {
      try {
        const resp = await GetListCateGory({
          id: user?.username,
        })
        setListFAQ(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    const getListCateFAQ = async () => {
      try {
        const resp = await GetListCateGoryFAQ({
          id: user?.username,
        })
        console.log(resp)
        setListCate(resp)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getListCate()
    getListCateFAQ()
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
      setIsLoading(true)
      const resp = await GetListCateGory({
        id: user?.username,
      })
      setListFAQ(resp)
      setIsLoading(false)
    }
  }

  const onHandleAddCate = async () => {
    const resp = await CreateQuestionFAQ({
      title: nameCate,
      description: content,
      created: user?.username,
      categoryId: sellect

    })
    toast.success('Thêm danh mục thành công... Hệ thông cập nhật dữ liệu sau 30s', {
      autoClose: 1000
    })
    const respdata = await GetListCateGory({
      id: user?.username,
    })
    setListFAQ(respdata)
    setNameCate('')
    setContent('')
  }

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Danh sách Faq</h5>
        <CAccordion className="accordion-normal" style={{ width: 800 }}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <div className="icon_button_add icon_hanlde">Thêm danh sách FAQ </div>
            </CAccordionHeader>
            <CAccordionBody>
              <CForm className="row g-3">
                <CCol md={8}>
                  <CFormInput
                    name="nameSearch"
                    type="text"
                    id="inputSearchCuser"
                    placeholder="Tên FAQ"
                    value={nameCate}
                    onChange={(e) => setNameCate(e.target.value)}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormSelect
                    aria-label="Default select example"
                    name="isPayedSearch"
                    id="inputSearchCuserBanned"
                    value={sellect}
                    onChange={(e) => setSellect(e.target.value)}
                  >
                    {listCate?.map((item, i) => (
                      <option value={item._id} key={i}>{item.content}</option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormTextarea
                    name="nameSearch"
                    type="text"
                    id="inputSearchCuser"
                    placeholder="Nội dung"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
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
                <CTableHeaderCell>FAQ</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Danh mục</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Xóa</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {listFAQ?.map((item) =>
                item?.questions.map((items, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell>{count += 1}</CTableDataCell>
                    <CTableDataCell width={800}>
                      <strong>{items.title}</strong>
                      <br />
                      {items.description}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Hiển thị</CTableDataCell>
                    <CTableDataCell className="text-center">{item.content}</CTableDataCell>
                    <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                      <div className="icon_hanlde" onClick={() => onHandleDelte(items._id)}>
                        <CIcon icon={cilTrash} customClassName="nav-icon" />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )),
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default ListCode
