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
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CModal
} from '@coreui/react'
import { deleteInvitation, ExportInvitation, getInvitations } from 'src/utils/axios'
import { dataFetchingPaginate } from 'src/utils/dataFetchingPaginate'
import { formatMoney } from 'src/utils/localStorage'
import fileDownload from 'js-file-download'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilPlus } from '@coreui/icons'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
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
    sizePerPage: 30,
    addMorePage: true,
}
const invitationsFree = () => {
    // const dispatch = useDispatch()
    // const columnsControl = useSelector((store) => store.cusers.columnsControl)
    // const { userId, userName, status } = columnsControl
    const [paginate, setPaginate] = useState(initialStatePage)
    const [usersList, setUsersList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterName, setFilterName] = useState('')
    const [searchFields, setSearchFields] = useState(initialSearchFields)
    const [isModalActiveDelete, setIsModalActiveDelete] = useState(false)
    const [id, setId] = useState(0)
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

    const navigate = useNavigate()

    // handle fetching data --------------------------------
    useEffect(() => {
        const getUserList = async () => {
            try {
                setIsLoading(true)
                const { sizePerPage, currentPage } = paginate
                const resp = await getInvitations({
                    pageSize: sizePerPage,
                    page: currentPage,
                    notStatus: 1
                })
                console.log(resp)
                // update paginate after data fetching
                const newPaginate = dataFetchingPaginate(paginate, resp.length)
                setPaginate(newPaginate)
                // -------------------------------------
                setUsersList(resp.filter(item => item.status != 1 && item.status != 6))
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

    const onNavigateDetails = (id) => navigate('/details-invitations/' + id)

    const setModalActiveDelete = (id) => {
        setIsModalActiveDelete(true)
        setId(id)
    }

    const handleSubmitDelete = async () => {
        await deleteInvitation({
            id: id,
        })
        try {
            setIsModalActiveDelete(false)
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
    }

    return (
        <div>
            {/* <AppBreadcrumb /> */}
            {isLoading && <CSpinner />}
            <div className="row-align title_table">
                <h5 style={{ margin: '0' }}>Danh sách thiệp chưa thanh toán</h5>
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
                                <CTableHeaderCell>Chức năng</CTableHeaderCell>
                                <CTableHeaderCell>Mã thiệp</CTableHeaderCell>
                                <CTableHeaderCell>Email</CTableHeaderCell>
                                <CTableHeaderCell>Số điện thoại</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Dịch vụ</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Tổng tiền</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Ngày tạo</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Ngày hết hạn</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Dung lượng</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {usersList?.map((item, index) => (
                                <CTableRow v-for="item in tableItems" key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ cursor: 'pointer' }}>
                                        <CDropdown>
                                            <CDropdownToggle>
                                                <CIcon icon={cilOptions} />
                                            </CDropdownToggle>
                                            <CDropdownMenu>
                                                <CDropdownItem
                                                    onClick={() => onNavigateDetails(item?._id)}
                                                >
                                                    Chỉnh sửa thiệp
                                                </CDropdownItem>
                                                <CDropdownItem
                                                    onClick={() => setModalActiveDelete(item?._id)}
                                                >
                                                    Xoá thiệp
                                                </CDropdownItem>
                                            </CDropdownMenu>
                                        </CDropdown>
                                    </CTableDataCell>
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
                                        <div>{moment(item.createTime).format("DD-MM-YYYY")}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{moment(item.createTime).add(21, 'days').format("DD-MM-YYYY")}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{(item.fileStat / (1024 * 1024)).toFixed(2)} MB</div>
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
                <CModal visible={isModalActiveDelete} onClose={() => setIsModalActiveDelete(false)} alignment="center">
                    <form className=" p-4" onSubmit={handleSubmitDelete}>
                        <CFormLabel className=" font-bold">Bạn có chắc chắn muốn xoá thiệp cùng toàn bộ ảnh/pdf?</CFormLabel>
                        <div className='form' style={{ display: 'flex', gap: 10 }}>
                        <CButton color="secondary" onClick={() => setIsModalActiveDelete(false)}>
                            Đóng
                        </CButton>
                        <CButton color="primary" onClick={handleSubmitDelete}>
                            Xoá
                        </CButton>
                        </div>
                    </form>
                </CModal>
            </CCard>
        </div>
    )
}
export default invitationsFree
