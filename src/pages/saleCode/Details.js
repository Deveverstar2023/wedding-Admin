import React, { useState, useEffect } from 'react'
import { DetailsSaleCode } from 'src/utils/axios'
import 'react-pagination-js/dist/styles.css' // import css
import {
  CCard,
  CCardBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableBody,
  CSpinner
} from '@coreui/react'
import { useParams } from 'react-router-dom'
const ListCode = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const getDataCode = async () => {
      try {
        setIsLoading(true)
        const resp = await DetailsSaleCode({
          code: id
        })
        console.log(resp)
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
        <h5 style={{ margin: '0' }}>Chi tiết mã giảm giá</h5>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Mã Code</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Phần trăm</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tên code</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Sử dụng tháng trước</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tổng số lượng sử dụng</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Thiệp sử dụng</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ngày sử dụng</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Người tạo</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="item in tableItems">
                <CTableDataCell>{data.code}</CTableDataCell>
                <CTableDataCell className="text-center">{convertNumber(data.percentOff * 100)}%
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{data.name}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">{data?.totalPreviousMonth && data?.totalPreviousMonth[data?.totalPreviousMonth?.length - 1]?.count}</CTableDataCell>
                <CTableDataCell className="text-center">{data?.invitations && data?.invitations?.length}</CTableDataCell>
                <CTableDataCell className="text-center">{data.status}</CTableDataCell>
                <CTableDataCell className="text-center">{data?.invitations && data?.invitations[data?.invitations?.length - 1]?._id}</CTableDataCell>
                <CTableDataCell className="text-center">{data?.invitations && data?.invitations && data?.invitations[data?.invitations?.length - 1]?.date}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>Admin</div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default ListCode
