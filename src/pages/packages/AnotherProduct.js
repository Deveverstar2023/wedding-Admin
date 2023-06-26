import React, { useState, useEffect, useCallback } from 'react'

import { CreateAnotherProduct, GetListAnotherProduct, customFetch, getPackages } from 'src/utils/axios'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import {
    CContainer,
    CCard,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTable,
    CTableBody,
    CSpinner,
    CButton,
    CModal,
    CModalHeader,
    CModalFooter,
    CFormInput,
    CFormLabel,
    CFormCheck,
} from '@coreui/react'
import { cilCheckCircle, cilPlus, cilXCircle } from '@coreui/icons'

import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'
import { formatMoney } from 'src/utils/localStorage'
// import KolIcon from '../icons/everstarIcon/Kol'

const PackageList = () => {
    const [isModalActive, setIsModalActive] = useState(false)
    const [packageList, setPackageList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    // handle fetching data --------------------------------
    useEffect(() => {
        const getPackageList = async () => {
            try {
                setIsLoading(true)
                const resp = await GetListAnotherProduct()
                // update paginate after data fetching
                // -------------------------------------
                setPackageList(resp)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        getPackageList()
    }, [])

    const onHandleAddAnotherProduct = useCallback(async () => {

        if (!name) {
            toast.error('Nhập tên sản phẩm')
        } else if (!price) {
            toast.error('Nhập giá sản phẩm')
        } else {
            const resp = await CreateAnotherProduct({
                name: name,
                amount: price
            })
            console.log(resp)
        }
    }, [name, price])

    return (
        <div>
            {isLoading && <CSpinner />}
            <div className="row-align title_table">
                <h5 style={{ margin: '0' }}>Các gói sản phẩm khác</h5>
                <CButton
                    color="primary"
                    shape="rounded-pill"
                    variant="outline"
                    onClick={() => setIsModalActive(true)}
                >
                    <span className="margin-left">Tạo thêm gói</span>
                    <CIcon icon={cilPlus} />
                </CButton>
            </div>
            <CCard>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                        <CTableRow>
                            <CTableHeaderCell>Tên gói</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Giá</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {packageList.map((item, index) => {
                            return (
                                <CTableRow v-for="item in tableItems" key={index}>
                                    <CTableDataCell>{item.name}</CTableDataCell>
                                    <CTableDataCell className="text-center">{formatMoney(item.amount)}</CTableDataCell>
                                </CTableRow>
                            )
                        })}
                    </CTableBody>
                </CTable>
                <CModal visible={isModalActive} onClose={() => setIsModalActive(false)} alignment="center">
                    <CModalHeader className="font-bold">
                        <strong>Tạo gói mới</strong>
                    </CModalHeader>
                    <form className=" p-4">
                        <CFormLabel htmlFor="packageName" className=" font-bold">
                            Tên sản phẩm
                        </CFormLabel>
                        <CFormInput
                            placeholder="Nhập tên sản phẩm"
                            aria-label="packageName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <CFormLabel htmlFor="packageName" className=" font-bold">
                            Giá
                        </CFormLabel>
                        <CFormInput
                            placeholder="Nhập giá"
                            aria-label="packageName"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setIsModalActive(false)}>
                                Close
                            </CButton>
                            <CButton color="primary" onClick={onHandleAddAnotherProduct}>Đồng ý</CButton>
                        </CModalFooter>
                    </form>
                </CModal>
            </CCard>
        </div>
    )
}
export default PackageList
