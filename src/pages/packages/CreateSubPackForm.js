import React from 'react'
import { addToast } from 'src/features/uiSlice'
import BasicToast from '../notifications/toasts/BasicToast'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from 'src/features/user/userSlice'

import { handleChangeInput, clearFields } from 'src/features/user/userSlice'
import { CCard, CCardBody, CCol, CRow, CForm, CFormLabel, CFormInput, CButton } from '@coreui/react'
import { createSubProduct } from 'src/utils/axios'
const AddUserForm = () => {
  // Handle pagination

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
  }
  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <CCard>
      <CCardBody>
        <CForm className="row g-3" onSubmit={onSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="inputNameUser">Name</CFormLabel>
            <CFormInput
              name="name"
              type="text"
              id="inputNameSub"
              required
              value={name}
              onChange={handleChange}
            />
          </CCol>

          <CRow className="margin-item">
            <CCol sm="auto">
              <CButton type="submit">Tạo gói nhỏ</CButton>
            </CCol>
            <CCol>
              <CButton color="secondary">Clear all</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AddUserForm
