import React, { useState, useEffect, useCallback } from 'react'
import { CreateAds, GetAds, uploadImage } from 'src/utils/axios'
import 'react-pagination-js/dist/styles.css' // import css
import { CCol, CForm, CFormInput, CButton, CFormLabel, CSpinner, CFormSelect } from '@coreui/react'
import { toast } from 'react-toastify'
import { ImageUpload } from 'src/components/imageUpload'
const Information = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [url, setURL] = useState([])
  const [url2, setURL2] = useState([])
  const [url3, setURL3] = useState([])
  const [url4, setURL4] = useState([])
  const [url5, setURL5] = useState([])
  const [url6, setURL6] = useState([])
  const [url7, setURL7] = useState([])
  const [url8, setURL8] = useState([])
  const [image, setImage] = useState([])
  const [image2, setImage2] = useState([])
  const [image3, setImage3] = useState([])
  const [image4, setImage4] = useState([])
  const [image5, setImage5] = useState([])
  const [image6, setImage6] = useState([])
  const [image7, setImage7] = useState([])
  const [image8, setImage8] = useState([])
  const [sellectType, setSellectType] = useState('1')
  const [imageURL, setImageURL] = useState('')
  const [imageURL2, setImageURL2] = useState('')
  const [imageURL3, setImageURL3] = useState('')
  const [imageURL4, setImageURL4] = useState('')
  const [imageURL5, setImageURL5] = useState('')
  const [imageURL6, setImageURL6] = useState('')
  const [imageURL7, setImageURL7] = useState('')
  const [imageURL8, setImageURL8] = useState('')

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true)
        const resp = await GetAds()
        if (resp[0].data.length > 0) {
          setURL(resp[0].data[resp[0].data.length - 1].url1)
          setImageURL(resp[0].data[resp[0].data.length - 1].image1)
          setURL2(resp[0].data[resp[0].data.length - 1].url2)
          setImageURL2(resp[0].data[resp[0].data.length - 1].image2)
          setURL3(resp[0].data[resp[0].data.length - 1].url3)
          setImageURL3(resp[0].data[resp[0].data.length - 1].image3)
          setURL4(resp[0].data[resp[0].data.length - 1].url4)
          setImageURL4(resp[0].data[resp[0].data.length - 1].image4)
          setURL5(resp[0].data[resp[0].data.length - 1].url5)
          setImageURL5(resp[0].data[resp[0].data.length - 1].image5)
          setURL6(resp[0].data[resp[0].data.length - 1].url6)
          setImageURL6(resp[0].data[resp[0].data.length - 1].image6)
          setURL7(resp[0].data[resp[0].data.length - 1].url7)
          setImageURL7(resp[0].data[resp[0].data.length - 1].image7)
          setURL8(resp[0].data[resp[0].data.length - 1].url8)
          setImageURL8(resp[0].data[resp[0].data.length - 1].image8)
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

  const onChangeURL2 = (e) => {
    setURL2(e)
  }

  const onChangeURL3 = (e) => {
    setURL3(e)
  }

  const onChangeURL4 = (e) => {
    setURL4(e)
  }

  const onChangeURL5 = (e) => {
    setURL5(e)
  }

  const onChangeURL6 = (e) => {
    setURL6(e)
  }

  const onChangeURL7 = (e) => {
    setURL7(e)
  }

  const onChangeURL8 = (e) => {
    setURL8(e)
  }

  const onHandleUpdate = useCallback(async () => {
    const resp = await CreateAds({
      url1: url,
      image1: imageURL,
      url2: url2,
      image2: imageURL2,
      url3: url3,
      image3: imageURL3,
      url4: url4,
      image4: imageURL4,
      url5: url5,
      image5: imageURL5,
      url6: url6,
      image6: imageURL6,
      url7: url7,
      image7: imageURL7,
      url8: url8,
      image8: imageURL8,
      type: sellectType,
    })

    toast.success(resp[0].messaging)
  }, [
    url,
    imageURL,
    url2,
    imageURL2,
    url3,
    imageURL3,
    url4,
    imageURL4,
    url5,
    imageURL5,
    url6,
    imageURL6,
    url7,
    imageURL7,
    url8,
    imageURL8,
    sellectType,
  ])

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

  const onChangeImage5 = (imageList) => {
    setImage5(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL5(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  const onChangeImage6 = (imageList) => {
    setImage6(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL6(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  const onChangeImage7 = (imageList) => {
    setImage7(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL7(response.data.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      })
    }
  }

  const onChangeImage8 = (imageList) => {
    setImage8(imageList)
    if (imageList.length > 0) {
      imageList.slice(-1).map(function (item) {
        return uploadImage(item.file)
          .then((response) => {
            setImageURL8(response.data.data)
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

                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL5"
                      type="text"
                      id="inputURL5"
                      placeholder="Nhập URL"
                      value={url5}
                      onChange={(e) => onChangeURL5(e.target.value)}
                    />
                  </CCol>

                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image5}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage5}
                      urlLocal={imageURL5}
                    />
                  </CCol>

                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL6"
                      type="text"
                      id="inputURL6"
                      placeholder="Nhập URL"
                      value={url6}
                      onChange={(e) => onChangeURL6(e.target.value)}
                    />
                  </CCol>

                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image6}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage6}
                      urlLocal={imageURL6}
                    />
                  </CCol>

                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL7"
                      type="text"
                      id="inputURL7"
                      placeholder="Nhập URL"
                      value={url7}
                      onChange={(e) => onChangeURL7(e.target.value)}
                    />
                  </CCol>

                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image7}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage7}
                      urlLocal={imageURL7}
                    />
                  </CCol>

                  <CCol md={12} className="form-input">
                    <CFormLabel htmlFor="inputURL">URL</CFormLabel>
                    <CFormInput
                      name="inputURL8"
                      type="text"
                      id="inputURL8"
                      placeholder="Nhập URL"
                      value={url8}
                      onChange={(e) => onChangeURL8(e.target.value)}
                    />
                  </CCol>

                  <CCol md={12} className="form-input img_upload_box">
                    <CFormLabel htmlFor="inputSearchCuser">Ảnh thumbnail</CFormLabel>
                    <ImageUpload
                      maxnumber={1}
                      images={image8}
                      maxW={'100%'}
                      height={500}
                      title={'Thêm một hình ảnh'}
                      desc={'(Kích thước khuyến nghị 1024x1024px)'}
                      onChange={onChangeImage8}
                      urlLocal={imageURL8}
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
