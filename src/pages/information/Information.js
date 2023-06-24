import React, { useState, useEffect } from 'react'
import { DeleteSaleCode, ListSaleCode } from 'src/utils/axios'
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
import { cilOptions, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const Information = () => {
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
  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Cấu hình thông tin</h5>
      </div>
    </div>
  )
}
export default Information
