import React, { useState } from 'react'
import { CreateSaleCode, getGenerateCode } from 'src/utils/axios'
import 'react-pagination-js/dist/styles.css' // import css
import {
  CCol,
  CForm,
  CFormInput,
  CButton,
  CFormLabel,
  CSpinner,
  CModalHeader,
  CModalFooter,
} from '@coreui/react'
import { toast } from 'react-toastify'

const SaleCode = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [generateCode, setGenerateCode] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [percentOff, setPercentOff] = useState('')

  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeCode = (e) => {
    setCode(e.target.value)
  }

  const handleChangePercentOff = (e) => {
    setPercentOff(e.target.value)
  }

  const handleGenerateCode = async () => {
    try {
      setIsLoading(true)
      const resp = await getGenerateCode()
      setGenerateCode(resp)
      setCode(resp)
      setIsLoading(false)
    } catch (error) {
      toast.error('Không thành công! Vui lòng thử lại')
    }
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault()
    try {
      if (!name) {
        toast.error('Tên không được để trống')
      } else if (!code) {
        toast.error('Mã code giảm giá không được để trống')
      } else if (!percentOff) {
        toast.error('Phần trăm giảm giá không được để trống')
        throw new Error('')
      } else {
        setIsLoading(true)
        const resp = await CreateSaleCode({
          name: name,
          code: code,
          percentOff: percentOff / 100,
        })
        if (resp) toast.success('Tạo thành công')
        setIsLoading(false)
      }
    } catch (error) {}
  }
  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Tạo mã giới thiệu</h5>
      </div>
      <div className="container">
        <div className="row flex-col">
          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
            <CForm className="row g-8">
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuser">Lấy mã</CFormLabel>
                <CFormInput
                  name="name"
                  type="text"
                  id="inputSearchCuser"
                  placeholder="Lấy mã giới thiệu tại đây"
                  value={generateCode}
                  readOnly
                />
              </CCol>
              <CCol md={12}>
                <div className="d-grid form-input">
                  <CButton
                    color="primary"
                    onClick={handleGenerateCode}
                    // size="sm"
                    className="normal"
                  >
                    Lấy mã
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
            <CForm className="row g-8">
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuser">Name</CFormLabel>
                <CFormInput
                  name="name"
                  type="text"
                  id="inputSearchCuser"
                  placeholder="Nhập tên của người giới thiệu"
                  onChange={handleChangeName}
                  value={name}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">code</CFormLabel>
                <CFormInput
                  name="code"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập mã code của người giới thiệu"
                  onChange={handleChangeCode}
                  value={code}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Phần trăm (%)</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập phần trăm muốn giảm giá"
                  onChange={handleChangePercentOff}
                  value={percentOff}
                />
              </CCol>
              <CCol md={12}>
                <div className="d-grid form-input">
                  <CButton
                    color="primary"
                    onClick={handleSubmitCreate}
                    // size="sm"
                    className="normal"
                  >
                    Đồng ý
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SaleCode
