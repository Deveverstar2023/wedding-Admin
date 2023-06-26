import React, { useState, useEffect } from 'react'

import { customFetch, getPackages } from 'src/utils/axios'
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
} from '@coreui/react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'

import CIcon from '@coreui/icons-react'
// import KolIcon from '../icons/everstarIcon/Kol'

const PackageList = () => {
  const [packageList, setPackageList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // handle fetching data --------------------------------
  useEffect(() => {
    const getPackageList = async () => {
      try {
        setIsLoading(true)
        const resp = await getPackages()
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
  console.log(packageList)
  return (
    <div>
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Các gói sản phẩm</h5>
      </div>
      <CCard>
        <CTable align="middle " className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Package Name</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Mobile invitation</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Video Clip</CTableHeaderCell>
              <CTableHeaderCell className="text-center">NFT QR Code</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {packageList.map((item, index) => {
              return (
                <CTableRow v-for="item in tableItems">
                  <CTableDataCell>{item.name}</CTableDataCell>
                  {['Mobile Invitation', 'Video Clip', 'NFT QR Code'].map((subName, indexName) => {
                    if (item.subProduct[indexName]?.name === subName) {
                      return (
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilCheckCircle} />
                        </CTableHeaderCell>
                      )
                    } else {
                      return (
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilXCircle} />
                        </CTableHeaderCell>
                      )
                    }
                  })}
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CCard>
    </div>
  )
}
export default PackageList
