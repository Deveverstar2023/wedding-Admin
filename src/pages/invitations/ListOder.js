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
import { useNavigate } from 'react-router-dom'
import Validate from 'src/utils/Validate'

const initialSearchFields = {
    nameSearch: '',
    emailSearch: '',
    isPayedSearch: '',
    // titleSearch: '',
}
const initialStatePage = {
    currentPage: 1,
    totalSize: 30,
    sizePerPage: 1000,
    addMorePage: true,
}
const ListOder = () => {
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

    const navigate = useNavigate()

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
                console.log(resp)
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

    return (
        <div>
            {/* <AppBreadcrumb /> */}
            {isLoading && <CSpinner />}
            <div className="row-align title_table">
                <h5 style={{ margin: '0' }}>Danh sách địa chỉ đã Order</h5>

            </div>
            <CCard>
                <CCardBody style={{ overflowY: 'visible' }}>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead color="light">
                            <CTableRow>
                                <CTableHeaderCell>Mã thiệp</CTableHeaderCell>
                                <CTableHeaderCell>Tên</CTableHeaderCell>
                                <CTableHeaderCell>Email</CTableHeaderCell>
                                <CTableHeaderCell>Phone number</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Pakage</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Địa chỉ</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Ghi chú</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Sản phẩm khác</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Tổng tiền</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Mã OID</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {usersList?.map((item, index) => (
                                <CTableRow v-for="item in tableItems" key={index}>

                                    <CTableDataCell>{item._id}</CTableDataCell>
                                    <CTableDataCell>
                                        <div>{item.confirmName}</div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <div>{item.confirmEmail}</div>
                                    </CTableDataCell>
                                    <CTableDataCell>+{item.confirmPhone}</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{item.productName}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{item.confirmAddress ? item.confirmAddress + ', ' : ''}
                                            {item.confirmWard ? item.confirmWard + ',' : ''}
                                            {item.confirmDistrict ? item.confirmDistrict + ', ' : ''}
                                            {item.confirmProvince ? item.confirmProvince + ', ' : ''}
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{item.confirmNote}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{item.anotherProduct}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{Validate.formatMoney(item.totalAmount)}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        <div>{item.OID}</div>
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
            </CCard>

        </div>
    )
}
export default ListOder
