import React, { useState, useEffect, useCallback } from 'react'
import { CreateNotification, DeleteCateNotification, GetListNotification } from 'src/utils/axios'
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
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
// import KolIcon from '../icons/everstarIcon/Kol'

const Notification = () => {
    const [listFAQ, setListFAQ] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [nameCate, setNameCate] = useState('')
    const [content, setContent] = useState('')
    const [sellect, setSellect] = useState('')

    const { user } = useSelector((store) => store.auth)

    useEffect(() => {
        const getListCate = async () => {
            try {
                const resp = await GetListNotification()
                setListFAQ(resp[0].data)
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
            await DeleteCateNotification({
                id: id,
            })
            const resp = await GetListNotification()
            setListFAQ(resp[0].data)
        }
    }

    const onHandleAddCate = async () => {
        const resp = await CreateNotification({
            title: nameCate,
            description: content,
            created: "643d0497d04d231dc24a2765"
        })
        console.log(resp)
        toast.success('Thêm danh mục thành công... Hệ thông cập nhật dữ liệu sau 30s', {
            autoClose: 1000
        })
        const respdata = await GetListNotification({
            id: user?.username,
        })
        setListFAQ(respdata[0].data)
        setNameCate('')
        setContent('')
    }

    return (
        <div>
            {/* <AppBreadcrumb /> */}
            {isLoading && <CSpinner />}
            <div className="row-align title_table">
                <h5 style={{ margin: '0' }}>Danh sách thông báo</h5>
                <CAccordion className="accordion-normal" style={{ width: 800 }}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <div className="icon_button_add icon_hanlde">Thêm danh sách thông báo </div>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CForm className="row g-3">
                                <CCol md={12}>
                                    <CFormInput
                                        name="nameSearch"
                                        type="text"
                                        id="inputSearchCuser"
                                        placeholder="Tên FAQ"
                                        value={nameCate}
                                        onChange={(e) => setNameCate(e.target.value)}
                                    />
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
                                <CTableHeaderCell>Tiêu đề</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Danh mục</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Xóa</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {listFAQ?.map((item, index) =>
                                <CTableRow v-for="item in tableItems" key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell width={800}>
                                        <strong>{item.title}</strong>
                                        <br />
                                        {item.description}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">Hiển thị</CTableDataCell>
                                    <CTableDataCell className="text-center">Thông báo</CTableDataCell>
                                    <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                                        <div className="icon_hanlde" onClick={() => onHandleDelte(item._id)}>
                                            <CIcon icon={cilTrash} customClassName="nav-icon" />
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            )}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </div>
    )
}
export default Notification
