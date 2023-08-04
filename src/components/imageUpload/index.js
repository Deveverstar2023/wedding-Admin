import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import ImageUploading from "react-images-uploading";
import SortableList, { SortableItem } from "react-easy-sort";
import { isArray } from "lodash";
import { toast } from "react-toastify";
import { data, dataLocal } from "src/common/value";
import Validate from "src/utils/Validate";
import CIcon from "@coreui/icons-react";
import { cilX } from "@coreui/icons";
import { customFetch } from "src/utils/axios";
import { getLocalAccessToken } from "src/utils/localStorage";

export const ImageUpload = forwardRef(
  ({ images, title, icon, maxW, height, desc, maxnumber, allowDrag, onChange, onSortEnd, urlLocal, idCreateRespon, maxFileSize, loading = false }, ref) => {
    useImperativeHandle(ref, () => ({
      setErrorMsg
    }));

    const [errMsg, setErrMsg] = useState("");

    const [itemLocal] = useState(dataLocal)

    const [checkUrlLocal, setCheckurlLocal] = useState(false);

    const [albumList, setAlbumList] = useState([])

    const [loadings, setLoadings] = useState(false)

    const [counts, setCounts] = useState(maxnumber || 10)

    var maxNumber = maxnumber || 10;

    // const { post } = useBaseService()

    //function sort and updatelist => call out component
    // const onChange = (imageList) => {
    //   setImages(imageList);
    // };

    // const onSortEnd = useCallback((oldIndex, newIndex) => {
    //   setImages((array) => arrayMove(array, oldIndex, newIndex));
    // }, []);

    useEffect(() => {
      setAlbumList(urlLocal)
    }, [urlLocal])

    useEffect(() => {
      setLoadings(loading)
    }, [loading])

    useEffect(() => {
      setCounts(maxNumber)
    }, [maxNumber])

    useEffect(() => {

      if (urlLocal?.length === 0 || urlLocal === '' || urlLocal === undefined) {
        setCheckurlLocal(!checkUrlLocal)
      } else setCheckurlLocal(checkUrlLocal)

    }, [albumList])

    const onError = (imageList) => {

      if (imageList.maxFileSize) {
        toast.warning('Ảnh quá nặng vượt quá 30 MB', {
          autoClose: 1000
        })
      } else {
        toast.warning('Vượt quá số lượng ảnh cho phép', {
          autoClose: 1000
        })
      }

    };

    const setErrorMsg = useCallback((msg) => {
      if (Validate.isEmptyValue(msg)) {
        return;
      }
      setErrMsg(msg);
    }, []);

    const errorMessage = useMemo(() => {
      if (!Validate.isEmptyValue(errMsg)) {
        return (
          <div className='messageError'>
            <p>{errMsg}</p>
          </div>
        );
      }
      return null;
    }, [errMsg]);

    const onRemove = useCallback(() => {
      setCheckurlLocal(true)
    }, [checkUrlLocal])

    const onRemoveAlnum = async (itemUrl) => {

      const newAlbum = [...albumList];
      newAlbum.splice(itemUrl, 1);
      setAlbumList(newAlbum);

      const dataUpdate = Object.assign({
        "_id": idCreateRespon,
        "album": newAlbum
      })

      setLoadings(true)

      const responseupdate = await customFetch.post('/update-invitation', dataUpdate, { headers: { Authorization: 'Bearer ' + getLocalAccessToken() } });
      if (responseupdate.data.errorCode == 0) {
        itemLocal.album = responseupdate.data?.data?.album
        itemLocal.albumlocal = responseupdate.data?.data?.album
        setCounts(15 - responseupdate.data?.data?.album?.length)
        setLoadings(false)
      }
    }

    return (
      <div className="wrap_box_upload_image_section">
        {
          checkUrlLocal &&
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={counts}
            dataURLKey="data_url"
            acceptType={["jpg", "png", "jpeg", "bmp", ".gif", "HEIC"]}
            onError={onError}
            maxFileSize={maxFileSize}
          >
            {({

              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              dragProps,

            }) => (
              // write your building UI
              <div className="wrap_box_upload_image_child">
                <SortableList
                  onSortEnd={onSortEnd}
                  className={'root-remove'}
                  draggedItemClassName={'dragged'}
                  defaultChecked
                  draggable
                  allowDrag={allowDrag || false}
                  style={{ width: maxW }}
                >
                  {
                    imageList.map((image, index) =>
                      <SortableItem key={index} imgProps={{ draggable: false }}>
                        <div className="image-item flex justify-center" >
                          <div
                            className="relative"
                            style={{ height: height }}
                            {...dragProps}
                          >
                            <div
                              className="absolute pointer"
                              onClick={() => onImageRemove(index)}
                            >
                              <CIcon icon={cilX} customClassName="nav-icon" />
                            </div>
                            <img
                              src={image.data_url}
                              alt={'thumbs' + image.file?.size}
                              onClick={() => onImageUpdate(index)}
                              style={{ height: height }}
                            />

                            {
                              loadings && <div className="loading_image"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                            }

                          </div>
                        </div>
                      </SortableItem>
                    )
                  }
                  {
                    images.length < counts && <div
                      className="wrap_imageUploading border-img-dash flex items-center"
                      style={{ maxWidth: maxW, height: height }}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <div className="justify-center">
                        <div className='ImgUploadIcon'>
                          <svg width="94" height="80" viewBox="0 0 94 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80.2241 0H13.3707C9.82574 0.00386012 6.42711 1.40986 3.92046 3.90951C1.41381 6.40916 0.00387093 9.7983 0 13.3333V66.6667C0.00387093 70.2017 1.41381 73.5908 3.92046 76.0905C6.42711 78.5901 9.82574 79.9961 13.3707 80H80.2241C83.769 79.9961 87.1677 78.5901 89.6743 76.0905C92.181 73.5908 93.5909 70.2017 93.5948 66.6667V13.3333C93.5909 9.7983 92.181 6.40916 89.6743 3.90951C87.1677 1.40986 83.769 0.00386012 80.2241 0ZM63.5107 13.3333C65.4941 13.3333 67.4329 13.9198 69.082 15.0186C70.7311 16.1175 72.0164 17.6792 72.7754 19.5065C73.5344 21.3338 73.733 23.3444 73.3461 25.2842C72.9591 27.224 72.0041 29.0059 70.6016 30.4044C69.1992 31.8029 67.4124 32.7553 65.4671 33.1412C63.5219 33.527 61.5056 33.329 59.6732 32.5721C57.8408 31.8153 56.2746 30.5335 55.1727 28.889C54.0709 27.2445 53.4827 25.3111 53.4827 23.3333C53.4855 20.682 54.5429 18.1401 56.4229 16.2653C58.3029 14.3905 60.852 13.3361 63.5107 13.3333ZM13.3707 73.3333C11.5976 73.3333 9.89718 72.631 8.64343 71.3807C7.38969 70.1305 6.68534 68.4348 6.68534 66.6667V52.5771L26.499 35.0146C28.4107 33.3239 30.8969 32.4236 33.451 32.4971C36.0052 32.5707 38.4351 33.6125 40.2458 35.4104L53.8149 48.9125L29.3257 73.3333H13.3707ZM86.9094 66.6667C86.9094 68.4348 86.2051 70.1305 84.9513 71.3807C83.6976 72.631 81.9972 73.3333 80.2241 73.3333H38.7812L64.1479 48.0375C65.9439 46.5144 68.223 45.6754 70.5806 45.6693C72.9382 45.6632 75.2217 46.4904 77.0256 48.0042L86.9094 56.2167V66.6667Z" fill="#CACACA"></path></svg>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="add_image_uploading">
                          {title}
                        </p>
                        {desc && <p className="desc_image_uploading">{desc}</p>}
                      </div>
                      {errorMessage}
                    </div>
                  }
                </SortableList>
              </div>
            )}
          </ImageUploading>
        }
        {
          !checkUrlLocal && <div className="image-item root-remove flex " style={{ gap: 20, flexWrap: 'wrap' }}>
            {
              !isArray(urlLocal) &&
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div
                  className="relative"
                  style={{ height: height }}

                >
                  <div
                    className="absolute pointer"
                    onClick={onRemove}
                  >
                    <CIcon icon={cilX} customClassName="nav-icon" />
                  </div>
                  <img
                    src={urlLocal}
                    alt={'thumbs'}

                    style={{ height: height }}
                  />
                  {
                    loadings && <div className="loading_image"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                  }
                </div></div>
              || isArray(urlLocal) && <> {
                albumList.map((image, index) =>
                  <div
                    className="relative max-w-fit"
                    style={{ height: height }}
                    key={index}
                  >
                    <div
                      className="absolute pointer"
                      onClick={() => onRemoveAlnum(index)}
                    >
                      <CIcon icon={cilX} customClassName="nav-icon" />
                    </div>
                    <img
                      src={image}
                      alt={'thumbs' + image?.file?.size}
                      style={{ height: height }}
                    />
                    {
                      loadings && <div className="loading_image"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                    }
                  </div>
                )}
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg", "png", "jpeg", "bmp", ".gif", "HEIC"]}
                  onError={onError}
                  maxFileSize={maxFileSize}
                >
                  {({

                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    dragProps,

                  }) => (
                    // write your building UI
                    <div className="wrap_box_upload_image_child">
                      <SortableList
                        onSortEnd={onSortEnd}
                        className={'root-remove'}
                        draggedItemClassName={'dragged'}
                        defaultChecked
                        draggable
                        allowDrag={allowDrag || false}
                        style={{ width: maxW }}
                      >
                        {
                          imageList.map((image, index) =>
                            <SortableItem key={index} imgProps={{ draggable: false }}>
                              <div className="image-item flex justify-center" >
                                <div
                                  className="relative max-w-fit"
                                  style={{ height: height }}
                                  {...dragProps}
                                >
                                  <div
                                    className="absolute pointer"
                                    onClick={() => onImageRemove(index)}
                                  >
                                    <CIcon icon={cilX} customClassName="nav-icon" />
                                  </div>
                                  <img
                                    src={image.data_url}
                                    alt={'thumbs' + image.file?.size}
                                    onClick={() => onImageUpdate(index)}
                                    style={{ height: height }}
                                  />
                                  {
                                    loadings && <div className="loading_image"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                                  }
                                </div>
                              </div>
                            </SortableItem>
                          )
                        }
                        {
                          images.length < counts && <div
                            className="wrap_imageUploading border-img-dash flex items-center"
                            style={{ maxWidth: maxW, height: height }}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <div className="justify-center">
                              <div className='ImgUploadIcon'>
                                <svg width="94" height="80" viewBox="0 0 94 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80.2241 0H13.3707C9.82574 0.00386012 6.42711 1.40986 3.92046 3.90951C1.41381 6.40916 0.00387093 9.7983 0 13.3333V66.6667C0.00387093 70.2017 1.41381 73.5908 3.92046 76.0905C6.42711 78.5901 9.82574 79.9961 13.3707 80H80.2241C83.769 79.9961 87.1677 78.5901 89.6743 76.0905C92.181 73.5908 93.5909 70.2017 93.5948 66.6667V13.3333C93.5909 9.7983 92.181 6.40916 89.6743 3.90951C87.1677 1.40986 83.769 0.00386012 80.2241 0ZM63.5107 13.3333C65.4941 13.3333 67.4329 13.9198 69.082 15.0186C70.7311 16.1175 72.0164 17.6792 72.7754 19.5065C73.5344 21.3338 73.733 23.3444 73.3461 25.2842C72.9591 27.224 72.0041 29.0059 70.6016 30.4044C69.1992 31.8029 67.4124 32.7553 65.4671 33.1412C63.5219 33.527 61.5056 33.329 59.6732 32.5721C57.8408 31.8153 56.2746 30.5335 55.1727 28.889C54.0709 27.2445 53.4827 25.3111 53.4827 23.3333C53.4855 20.682 54.5429 18.1401 56.4229 16.2653C58.3029 14.3905 60.852 13.3361 63.5107 13.3333ZM13.3707 73.3333C11.5976 73.3333 9.89718 72.631 8.64343 71.3807C7.38969 70.1305 6.68534 68.4348 6.68534 66.6667V52.5771L26.499 35.0146C28.4107 33.3239 30.8969 32.4236 33.451 32.4971C36.0052 32.5707 38.4351 33.6125 40.2458 35.4104L53.8149 48.9125L29.3257 73.3333H13.3707ZM86.9094 66.6667C86.9094 68.4348 86.2051 70.1305 84.9513 71.3807C83.6976 72.631 81.9972 73.3333 80.2241 73.3333H38.7812L64.1479 48.0375C65.9439 46.5144 68.223 45.6754 70.5806 45.6693C72.9382 45.6632 75.2217 46.4904 77.0256 48.0042L86.9094 56.2167V66.6667Z" fill="#CACACA"></path></svg>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="add_image_uploading">
                                {title}
                              </p>
                              {desc && <p className="desc_image_uploading">{desc}</p>}
                            </div>
                            {errorMessage}
                          </div>
                        }
                      </SortableList>
                    </div>
                  )}
                </ImageUploading>
              </>
            }
          </div>
        }

      </div>
    );
  });
