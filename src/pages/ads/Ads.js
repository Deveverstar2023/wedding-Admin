import React, { useState, useEffect, useCallback } from 'react'
import { CreateAds, GetAds, uploadImage } from 'src/utils/axios'
import 'react-pagination-js/dist/styles.css' // import css
import { CCol, CForm, CFormInput, CButton, CFormLabel, CSpinner, CFormSelect } from '@coreui/react'
import { toast } from 'react-toastify'
import { ImageUpload } from 'src/components/imageUpload'
const Information = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [url, setURL] = useState([])
  const [description, setDescription] = useState([])
  const [url2, setURL2] = useState([])
  const [description2, setDescription2] = useState([])
  const [url3, setURL3] = useState([])
  const [description3, setDescription3] = useState([])
  const [url4, setURL4] = useState([])
  const [description4, setDescription4] = useState([])
  const [image, setImage] = useState([])
  const [image2, setImage2] = useState([])
  const [image3, setImage3] = useState([])
  const [image4, setImage4] = useState([])
  const [sellectType, setSellectType] = useState('1')
  const [imageURL, setImageURL] = useState('')
  const [imageURL2, setImageURL2] = useState('')
  const [imageURL3, setImageURL3] = useState('')
  const [imageURL4, setImageURL4] = useState('')

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true)
        const resp = await GetAds()
        if (resp[0].data.length > 0) {
          setURL(resp[0].data[resp[0].data.length - 1].url1)
          setDescription(resp[0].data[resp[0].data.length - 1].description1)
          setImageURL(resp[0].data[resp[0].data.length - 1].image1)
          setURL2(resp[0].data[resp[0].data.length - 1].url2)
          setDescription2(resp[0].data[resp[0].data.length - 1].description2)
          setImageURL2(resp[0].data[resp[0].data.length - 1].image2)
          setURL3(resp[0].data[resp[0].data.length - 1].url3)
          setDescription3(resp[0].data[resp[0].data.length - 1].description3)
          setImageURL3(resp[0].data[resp[0].data.length - 1].image3)
          setURL4(resp[0].data[resp[0].data.length - 1].url4)
          setDescription4(resp[0].data[resp[0].data.length - 1].description4)
          setImageURL4(resp[0].data[resp[0].data.length - 1].image4)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getInfo()
  }, [])

  const onChangeURL = (e) => {
    setURL(e)
  }

  const onChangeDescription = (e) => {
    setDescription(e)
  }

  const onChangeURL2 = (e) => {
    setURL2(e)
  }

  const onChangeDescription2 = (e) => {
    setDescription2(e)
  }

  const onChangeURL3 = (e) => {
    setURL3(e)
  }

  const onChangeDescription3 = (e) => {
    setDescription3(e)
  }

  const onChangeURL4 = (e) => {
    setURL4(e)
  }

  const onChangeDescription4 = (e) => {
    setDescription4(e)
  }

  const onHandleUpdate = useCallback(async () => {
    const resp = await CreateAds({
      url1: url,
      description1: description,
      image1: imageURL,
      url2: url2,
      description2: description2,
      image2: imageURL2,
      url3: url3,
      description3: description3,
      image3: imageURL3,
      url4: url4,
      description4: description4,
      image4: imageURL4,
      type: sellectType,
    })

    toast.success(resp[0].messaging)
  }, [url, description, imageURL, url2, description2, imageURL2, sellectType])

  const onChangeImage = (imageList) => {
    setImage(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  const onChangeImage2 = (imageList) => {
    setImage2(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL2(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  const onChangeImage3 = (imageList) => {
    setImage3(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL3(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  const onChangeImage4 = (imageList) => {
    setImage4(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL4(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  return (
    <div>
      {/* <AppBreadcrumb /> */}
      {isLoading && <CSpinner />}
      <div className="row-align title_table">
        <h5 style={{ margin: '0' }}>Cấu hình quảng cáo</h5>
      </div>
      <div className="container">
        <div className="row flex-col">
          <div className="col-xs-12">
            <CForm className="row g-12">
              <CCol md={12} className="form-input">
                <CFormLabel htmlFor="inputType">Loại</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  name="inputType"
                  id="inputType"
                  value={sellectType}
                  onChange={(e) => setSellectType(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value={1}>Shopee</option>
                  <option value={2}>Google Ads</option>
                </CFormSelect>
              </CCol>
              {sellectType == 1 && (
                <>
                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL"
                      type="text"
                      id="inputURL"
                      placeholder="Nhập URL"
                      value={url}
                      onChange={(e) => onChangeURL(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputDescription">Mô tả</CFormLabel>
                    <CFormInput
                      name="inputDescription"
                      type="text"
                      id="inputDescription"
                      placeholder="Nhập mô tả"
                      value={description}
                      onChange={(e) => onChangeDescription(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage}
                      urlLocal={imageURL}
                    />
                  </CCol>
                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL2"
                      type="text"
                      id="inputURL2"
                      placeholder="Nhập URL"
                      value={url2}
                      onChange={(e) => onChangeURL2(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputDescription2">Mô tả</CFormLabel>
                    <CFormInput
                      name="inputDescription2"
                      type="text"
                      id="inputDescription2"
                      placeholder="Nhập mô tả"
                      value={description2}
                      onChange={(e) => onChangeDescription2(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image2}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage2}
                      urlLocal={imageURL2}
                    />
                  </CCol>

                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL3"
                      type="text"
                      id="inputURL3"
                      placeholder="Nhập URL"
                      value={url3}
                      onChange={(e) => onChangeURL3(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputDescription3">Mô tả</CFormLabel>
                    <CFormInput
                      name="inputDescription3"
                      type="text"
                      id="inputDescription3"
                      placeholder="Nhập mô tả"
                      value={description3}
                      onChange={(e) => onChangeDescription3(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image3}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage3}
                      urlLocal={imageURL3}
                    />
                  </CCol>

                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL4"
                      type="text"
                      id="inputURL4"
                      placeholder="Nhập URL"
                      value={url4}
                      onChange={(e) => onChangeURL4(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputDescription2">Mô tả</CFormLabel>
                    <CFormInput
                      name="inputDescription4"
                      type="text"
                      id="inputDescription4"
                      placeholder="Nhập mô tả"
                      value={description4}
                      onChange={(e) => onChangeDescription4(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image4}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage4}
                      urlLocal={imageURL4}
                    />
                  </CCol>
                </>
              )}
              <CCol md={12}>
                <div className="d-grid form-input">
                  <CButton
                    color="primary"
                    // size="sm"
                    className="normal"
                    onClick={onHandleUpdate}
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
