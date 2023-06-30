import React, { useCallback, useEffect, useState } from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { ListSaleCode, UpdateSaleCode, getInvitations } from 'src/utils/axios'
import { CCard, CCardBody, CFormSwitch, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { formatMoney } from 'src/utils/localStorage'
import moment from "moment";

const Dashboard = () => {

  const [data, setData] = useState([])

  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    const getDataCode = async () => {
      try {
        const resp = await ListSaleCode()
        setData(resp)
      } catch (error) {
        console.log(error)
      }
    }
    const getUserList = async () => {
      try {
        const resp = await getInvitations({
          pageSize: 10,
          page: 1,
        })
        setUsersList(resp.filter(item => item.status === 6))
      } catch (error) {
        console.log(error)
      }
    }

    getUserList()
    getDataCode()

  }, [])

  const convertNumber = (data) => {
    return parseInt(data)
  }

  const renderStatus = useCallback((value) => {
    if (value === 1) return 'Đã thanh toán'
    else if (value === 2) return 'Miễn phí'
    else if (value === 3) return 'Bản nháp'
    else if (value === 4) return 'Miễn phí'
    else if (value === 5) return 'Hết hạn'
    else if (value === 6) return 'Đang yêu cầu'
    else return 'Miễn phí'
  }, [])

  const onChangeStatusCode = useCallback(async (id, status) => {

    let value = '';
    if (status === "ON") value = "OFF"
    else value = "ON"
    await UpdateSaleCode({
      id: id,
      status: value
    })
    const resp = await ListSaleCode()
    setData(resp)
  }, [])

  return (
    <>
      <WidgetsDropdown />
      <div className='row'>
        <div className='col-xs-12 col-sm-8 col-md-8'>
          <div className="row-align title_table">
            <h5 style={{ margin: '0' }}>Yêu cầu active</h5>
          </div>
          <CCard>
            <CCardBody style={{ overflowY: 'visible' }}>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Stt</CTableHeaderCell>
                    <CTableHeaderCell>Invitation Id</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Package</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total Amount</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Ngày kích hoạt</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersList?.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{item._id}</CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
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

                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            {usersList.length === 0 && <p className="text-center" style={{ marginLeft: 10, marginBottom: 10 }}>Chưa có thiệp nào chờ kích hoạt</p>}
          </CCard>
        </div>
        <div className='col-xs-12 col-sm-4 col-md-4'>
          <div className="row-align title_table">
            <h5 style={{ margin: '0' }}>Tóm tắt mã giới thiệu</h5>
          </div>
          <CCard>
            <CCardBody style={{ overflowY: 'visible' }}>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Stt</CTableHeaderCell>
                    <CTableHeaderCell>Mã Code</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Phần trăm</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Tên code</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trạng thái</CTableHeaderCell>
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
                      <CTableDataCell className="text-center">
                        <CFormSwitch style={{ float: 'none' }} id="formSwitchCheckDefault" type="checkbox" valid={true} onChange={() => onChangeStatusCode(item._id, item.status)} checked={item.status === "ON" ? true : false} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  )
}

export default Dashboard
