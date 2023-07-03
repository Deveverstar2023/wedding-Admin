import React, { useState, useEffect, useCallback } from 'react'
import { CreateInformationBase, DeleteSaleCode, GetInfomationBase, ListSaleCode } from 'src/utils/axios'
import 'react-pagination-js/dist/styles.css' // import css
import {
  CCol,
  CForm,
  CFormInput,
  CButton,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { toast } from 'react-toastify'
const Information = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [zaloNumber, setZaloNumber] = useState([])
  const [numberPhone, setNumberPhone] = useState([])
  const [nameBank, setNameBank] = useState([])
  const [numberBank, setNumberBank] = useState([])
  const [ceoPeople, setCeoPeople] = useState([])
  const [companyNumber, setCompanyNumber] = useState([])
  const [emailCompany, setEmailCompany] = useState([])
  const [adressCompany, setAdressCompany] = useState([])
  const [timeWork, setTimeWork] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true)
        const resp = await GetInfomationBase()
        if (resp[0].data.length > 0) {
          setZaloNumber(resp[0].data[resp[0].data.length - 1].zaloNumber)
          setNumberPhone(resp[0].data[resp[0].data.length - 1].numberPhone)
          setNameBank(resp[0].data[resp[0].data.length - 1].nameBank)
          setNumberBank(resp[0].data[resp[0].data.length - 1].numberBank)
          setCeoPeople(resp[0].data[resp[0].data.length - 1].ceoPeople)
          setCompanyNumber(resp[0].data[resp[0].data.length - 1].companyNumber)
          setEmailCompany(resp[0].data[resp[0].data.length - 1].emailCompany)
          setAdressCompany(resp[0].data[resp[0].data.length - 1].adressCompany)
          setTimeWork(resp[0].data[resp[0].data.length - 1].timeWork)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getInfo()
  }, [])


  const onChangeZalo = (e) => {
    setZaloNumber(e)
  }

  const onChangeTimeWork = (e) => {
    setTimeWork(e)
  }

  const onChangeNumberPhone = (e) => {
    setNumberPhone(e)
  }

  const onChangeNumberBank = (e) => {
    setNumberBank(e)
  }

  const onChangeEmailCompany = (e) => {
    setEmailCompany(e)
  }

  const onChangeCompanyNumber = (e) => {
    setCompanyNumber(e)
  }

  const onChangeCeoPeople = (e) => {
    setCeoPeople(e)
  }

  const onChangeAdressCompany = (e) => {
    setAdressCompany(e)
  }

  const onChangeNameBank = (e) => {
    setNameBank(e)
  }

  const onHandleUpdatebase = useCallback(async () => {

    const resp = await CreateInformationBase({
      zaloNumber: zaloNumber,
      numberPhone: numberPhone,
      nameBank: nameBank,
      numberBank: numberBank,
      ceoPeople: ceoPeople,
      companyNumber: companyNumber,
      emailCompany: emailCompany,
      adressCompany: adressCompany,
      timeWork: timeWork
    })

    toast.success(resp[0].messaging)

  }, [zaloNumber, numberPhone, nameBank, numberBank, ceoPeople, companyNumber, emailCompany, adressCompany, timeWork])

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Cấu hình thông tin</h5>
      </div>
      <div className="container">
        <div className="row flex-col">
          <div className="col-xs-12">
            <CForm className="row g-12">
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuser">zalo</CFormLabel>
                <CFormInput
                  name="name"
                  type="number"
                  id="inputSearchCuser"
                  placeholder="Nhập số zalo"
                  value={zaloNumber}
                  onChange={(e) => onChangeZalo(e.target.value)}
                  maxLength={12}
                  max={12}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Số điện thoại</CFormLabel>
                <CFormInput
                  name="code"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập số điện thoại"
                  value={numberPhone}
                  onChange={(e) => onChangeNumberPhone(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Ngân hàng</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập ngân hàng"
                  value={nameBank}
                  onChange={(e) => onChangeNameBank(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Số tài khoản</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập Số tài khoản"
                  value={numberBank}
                  onChange={(e) => onChangeNumberBank(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Giám đốc</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập người điều hành"
                  value={ceoPeople}
                  onChange={(e) => onChangeCeoPeople(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Mã số thuế</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập mã số thuế"
                  value={companyNumber}
                  onChange={(e) => onChangeCompanyNumber(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">email</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập email"
                  value={emailCompany}
                  onChange={(e) => onChangeEmailCompany(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Địa chỉ</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập địa chỉ"
                  value={adressCompany}
                  onChange={(e) => onChangeAdressCompany(e.target.value)}
                />
              </CCol>
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputSearchCuserEmail">Thời gian làm việc</CFormLabel>
                <CFormInput
                  name="percentOff"
                  type="text"
                  id="inputSearchCuserEmail"
                  placeholder="Nhập thời gian làm việc"
                  value={timeWork}
                  onChange={(e) => onChangeTimeWork(e.target.value)}
                />
              </CCol>
              <CCol md={12}>
                <div className="d-grid form-input">
                  <CButton
                    color="primary"
                    // size="sm"
                    className="normal"
                    onClick={onHandleUpdatebase}
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
export default Information
