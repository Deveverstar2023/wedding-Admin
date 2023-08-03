import React, { useState, useEffect, useCallback } from 'react'
import 'react-pagination-js/dist/styles.css' // import css
import {
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
    CButton,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CSpinner
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { UpdateInvitationPage, getDetailsInvitations } from 'src/utils/axios'
import { data } from 'src/common/value'

const DetailsInvitation = () => {

    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams()

    const [value, setValue] = useState(data)

    const [isDisplayCountDown, setIsDisplayCountDown] = useState(false)

    useEffect(() => {

        const getDetails = async () => {
            try {
                setIsLoading(true)
                const resp = await getDetailsInvitations({
                    id: id
                })
                console.log(resp)
                setIsDisplayCountDown(resp.timeAndLocationOfWedding.isDisplayCountDown)
                setValue(resp)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        getDetails()

    }, [])

    //handle information Groom
    const handleChangeName = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                name: e
            }
        }));
        value.informationOfGroom.name = e
    }

    const handleChangeNameFatherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                fatherNameOfGroom: e
            }
        }));
        value.informationOfGroom.fatherNameOfGroom = e
    }

    const handleChangeMotherNameOfGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                motherNameOfGroom: e
            }
        }));
        value.informationOfGroom.motherNameOfGroom = e
    }

    const handleChangeNameBankGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                nameBankOfGroom: e
            }
        }));
        value.informationOfGroom.nameBankOfGroom = e
    }

    const handleChangeNameBankFatherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                nameBankOfFatherGroom: e
            }
        }));
        value.informationOfGroom.nameBankOfFatherGroom = e
    }

    const handleChangeNameBankMotherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                nameBankOfMotherGroom: e
            }
        }));
        value.informationOfGroom.nameBankOfMotherGroom = e
    }

    const handleChangeOwnerBankOfGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                ownerBankOfGroom: e
            }
        }));
        value.informationOfGroom.ownerBankOfGroom = e
    }

    const handleChangeOwnerBankOfFatherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                ownerBankOfFatherGroom: e
            }
        }));
        value.informationOfGroom.ownerBankOfFatherGroom = e
    }

    const handleChangeOwnerBankOfMotherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                ownerBankOfMotherGroom: e
            }
        }));
        value.informationOfGroom.ownerBankOfMotherGroom = e
    }

    const handleChangeBankOfNumberGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                bankOfNumberGroom: e
            }
        }));
        value.informationOfGroom.bankOfNumberGroom = e
    }

    const handleChangeBankOfNumberFatherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                bankOfNumberFatherGroom: e
            }
        }));
        value.informationOfGroom.bankOfNumberFatherGroom = e
    }

    const handleChangeBankOfNumberMotherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                bankOfNumberMotherGroom: e
            }
        }));
        value.informationOfGroom.bankOfNumberMotherGroom = e
    }

    const handleChangePhoneNumberOfGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                phoneNumberOfGroom: e
            }
        }));
        value.informationOfGroom.phoneNumberOfGroom = e
    }

    const handleChangePhoneNumberOfFatherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                phoneNumberOfFatherGroom: e
            }
        }));
        value.informationOfGroom.phoneNumberOfFatherGroom = e
    }

    const handleChangePhoneNumberOfMotherGroom = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfGroom: {
                ...prevValues.informationOfGroom,
                phoneNumberOfMotherGroom: e
            }
        }));
        value.informationOfGroom.phoneNumberOfMotherGroom = e
    }

    const setSellectGroom = (e) => {
        value.informationOfGroom.isOldBrotherGroom = e
    }

    const onSellectIsGoneFather = (e) => {
        value.informationOfGroom.isGoneFather = e.target.value
    }

    const onSellectIsGoneMother = (e) => {
        value.informationOfGroom.isGoneMother = e.target.value
    }

    //handle information Bride
    const handleChangeNameBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                name: e
            }
        }));
        value.informationOfBride.name = e
    }

    const handleChangeNameFatherOfBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                fatherNameOfBride: e
            }
        }));
        value.informationOfBride.fatherNameOfBride = e
    }

    const handleChangeMotherNameOfBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                motherNameOfBride: e
            }
        }));
        value.informationOfBride.motherNameOfBride = e
    }

    const handleChangeNameBankOfBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                nameBankOfBride: e
            }
        }));
        value.informationOfBride.nameBankOfBride = e
    }

    const handleChangeNameBankOfFatherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                nameBankOfFatherBride: e
            }
        }));
        value.informationOfBride.nameBankOfFatherBride = e
    }

    const handleChangeNameBankOfMotherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                nameBankOfMotherBride: e
            }
        }));
        value.informationOfBride.nameBankOfMotherGroom = e
    }

    const handleChangeOwnerBankOfBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                ownerBankOfBride: e
            }
        }));
        value.informationOfBride.ownerBankOfBride = e
    }

    const handleChangeOwnerBankOfFatherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                ownerBankOfFatherBride: e
            }
        }));
        value.informationOfBride.ownerBankOfFatherBride = e
    }

    const handleChangeOwnerBankOfMotherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                ownerBankOfMotherBride: e
            }
        }));
        value.informationOfBride.ownerBankOfMotherBride = e
    }

    const handleChangeBankOfNumberBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                bankOfNumberBride: e
            }
        }));
        value.informationOfBride.bankOfNumberBride = e
    }

    const handleChangeBankOfNumberFatherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                bankOfNumberFatherBride: e
            }
        }));
        value.informationOfBride.bankOfNumberFatherBride = e
    }

    const handleChangeBankOfNumberMotherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                bankOfNumberMotherBride: e
            }
        }));
        value.informationOfBride.bankOfNumberMotherBride = e
    }

    const handleChangePhoneNumberOfBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                phoneNumberOfBride: e
            }
        }));
        value.informationOfBride.phoneNumberOfBride = e
    }

    const handleChangePhoneNumberOfFatherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                phoneNumberOfFatherBride: e
            }
        }));
        value.informationOfBride.phoneNumberOfFatherBride = e
    }

    const handleChangePhoneNumberOfMotherBride = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            informationOfBride: {
                ...prevValues.informationOfBride,
                phoneNumberOfMotherBride: e
            }
        }));
        value.informationOfBride.phoneNumberOfMotherBride = e
    }

    const setSellectBride = (e) => {
        value.informationOfBride.isOldBrotherBride = e
    }

    const onSellectIsGoneFatherBride = (e) => {
        value.informationOfBride.isGoneFatherBride = e.target.value
    }

    const onSellectIsGoneMotherOfBride = (e) => {
        value.informationOfBride.isGoneMotherOfBride = e.target.value
    }

    //time and location

    const hanldeChangeIsDisplayCountDown = useCallback((e) => {
        value.timeAndLocationOfWedding.isDisplayCountDown = e
        setIsDisplayCountDown(e)
    }, [isDisplayCountDown, value.timeAndLocationOfWedding.isDisplayCountDown])

    const hanldeChangeIsUseDamNgo = (e) => {
        setValue((prevValues) => ({
            ...prevValues,
            isUseDamNgo: e,
        }))
        value.isUseDamNgo = e
    }

    const hanldeChangeDateOfEventWedding = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfWedding: {
                ...prevValues.timeAndLocationOfWedding,
                dateOfEventWedding: e
            }
        }));
        value.timeAndLocationOfWedding.dateOfEventWedding = e
    }

    const handleChangeNamelocationOfWedding = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfWedding: {
                ...prevValues.timeAndLocationOfWedding,
                namelocationOfWedding: e
            }
        }));
        value.timeAndLocationOfWedding.namelocationOfWedding = e
    }

    const handleChangeLocationOfWedding = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfWedding: {
                ...prevValues.timeAndLocationOfWedding,
                locationOfWedding: e
            }
        }));
        value.timeAndLocationOfWedding.locationOfWedding = e
    }

    const handleChangeMapDirectLink = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfWedding: {
                ...prevValues.timeAndLocationOfWedding,
                mapDirectLink: e
            }
        }));
        value.timeAndLocationOfWedding.mapDirectLink = e
    }

    const handleChangeContentOfCountDown = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfWedding: {
                ...prevValues.timeAndLocationOfWedding,
                contentOfCountDown: e
            }
        }));
        value.timeAndLocationOfWedding.contentOfCountDown = e
    }

    //time and location dạm ngõ và ăn hỏi

    const handleChangeDateOfEventEgagement = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfEgagement: {
                ...prevValues.timeAndLocationOfEgagement,
                dateOfEventEgagement: e
            }
        }));
        value.timeAndLocationOfEgagement.dateOfEventEgagement = e
    }

    const handleChangeTimeOfEventEgagement = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfEgagement: {
                ...prevValues.timeAndLocationOfEgagement,
                timeOfEventEgagement: e
            }
        }));
        value.timeAndLocationOfEgagement.timeOfEventEgagement = e
    }

    const handleChangeLocationOfEgagement = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndtimeAndLocationOfEgagementLocationOfWedding: {
                ...prevValues.timeAndLocationOfEgagement,
                locationOfEgagement: e
            }
        }));
        value.timeAndLocationOfEgagement.locationOfEgagement = e
    }

    const handleChangeDateOfEventInterrogation = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfInterrogation: {
                ...prevValues.timeAndLocationOfInterrogation,
                dateOfEventInterrogation: e
            }
        }));
        value.timeAndLocationOfInterrogation.dateOfEventInterrogation = e
    }

    const handleChangeTimeOfEventInterrogation = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfInterrogation: {
                ...prevValues.timeAndLocationOfInterrogation,
                timeOfEventInterrogation: e
            }
        }));
        value.timeAndLocationOfInterrogation.timeOfEventInterrogation = e
    }

    const handleChangeLocationOfInterrogation = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            timeAndLocationOfInterrogation: {
                ...prevValues.timeAndLocationOfInterrogation,
                locationOfInterrogation: e
            }
        }));
        value.timeAndLocationOfInterrogation.locationOfInterrogation = e
    }

    //event

    const hanldeChangeIsUseEvent = (e) => {
        setValue((prevValues) => ({
            ...prevValues,
            isUseEvent: e,
        }))
        value.isUseEvent = e
    }

    const hanldeChangeEventOfProgramEditOne = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                eventOfProgramEditOne: e
            }
        }));
        value.eventOfProgram.eventOfProgramEditOne = e
    }

    const hanldeChangeEventOfProgramEditTwo = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                eventOfProgramEditTwo: e
            }
        }));
        value.eventOfProgram.eventOfProgramEditTwo = e
    }

    const hanldeChangeEventOfProgramEditThree = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                hanldeChangeEventOfProgramEditThree: e
            }
        }));
        value.eventOfProgram.eventOfProgramEditThree = e
    }

    const hanldeChangeEventOfProgramEditFour = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                hanldeChangeEventOfProgramEditFour: e
            }
        }));
        value.eventOfProgram.eventOfProgramEditFour = e
    }

    const hanldeChangeTimeToWellcome = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                timeToWellcome: e
            }
        }));
        value.eventOfProgram.timeToWellcome = e
    }

    const hanldeChangeTimeToCelebrate = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                timeToCelebrate: e
            }
        }));
        value.eventOfProgram.timeToCelebrate = e
    }

    const hanldeChangeTimeToDinner = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                timeToDinner: e
            }
        }));
        value.eventOfProgram.timeToDinner = e
    }

    const hanldeChangeTimeToMusic = (e) => {
        setValue(prevValues => ({
            ...prevValues,
            eventOfProgram: {
                ...prevValues.eventOfProgram,
                timeToMusic: e
            }
        }));
        value.eventOfProgram.timeToMusic = e
    }

    const handleChange = useCallback(async () => {

        const jsonData = {
            "_id": id,
            "informationOfGroom": {
                "name": value.informationOfGroom.name,
                "isOldBrotherGroom": value.informationOfGroom.isOldBrotherGroom || true,
                "fatherNameOfGroom": value.informationOfGroom.fatherNameOfGroom,
                "isGoneFather": value.informationOfGroom.isGoneFather || false,
                "motherNameOfGroom": value.informationOfGroom.motherNameOfGroom,
                "isGoneMother": value.informationOfGroom.isGoneMother || false,
                "nameBankOfGroom": value.informationOfGroom.nameBankOfGroom,
                "ownerBankOfGroom": value.informationOfGroom.ownerBankOfGroom,
                "bankOfNumberGroom": value.informationOfGroom.bankOfNumberGroom,
                "qrCodeGroomLink": value.informationOfGroom.qrCodeGroomLink,
                "nameBankOfFatherGroom": value.informationOfGroom.nameBankOfFatherGroom,
                "ownerBankOfFatherGroom": value.informationOfGroom.ownerBankOfFatherGroom,
                "bankOfNumberFatherGroom": value.informationOfGroom.bankOfNumberFatherGroom,
                "qrCodeFatherGroomLink": value.informationOfGroom.qrCodeFatherGroomLink,
                "nameBankOfMotherGroom": value.informationOfGroom.nameBankOfMotherGroom,
                "ownerBankOfMotherGroom": value.informationOfGroom.ownerBankOfMotherGroom,
                "bankOfNumberMotherGroom": value.informationOfGroom.bankOfNumberMotherGroom,
                "qrCodeMotherGroomLink": value.informationOfBride.qrCodeMotherBrideLink,
                "phoneNumberOfFatherGroom": value.informationOfGroom.phoneNumberOfFatherGroom,
                "phoneNumberOfGroom": value.informationOfGroom.phoneNumberOfGroom,
                "phoneNumberOfMotherGroom": value.informationOfBride.phoneNumberOfMotherBride,
            },
            "informationOfBride": {
                "name": value.informationOfBride.name,
                "isOldBrotherBride": value.informationOfBride.isOldBrotherBride || true,
                "fatherNameOfBride": value.informationOfBride.fatherNameOfBride,
                "isGoneFatherBride": value.informationOfBride.isGoneFatherBride || false,
                "motherNameOfBride": value.informationOfBride.motherNameOfBride,
                "isGoneMotherOfBride": value.informationOfBride.isGoneMotherOfBride || false,
                "nameBankOfBride": value.informationOfBride.nameBankOfBride,
                "ownerBankOfBride": value.informationOfBride.ownerBankOfBride,
                "bankOfNumberBride": value.informationOfBride.bankOfNumberBride,
                "qrCodeBrideLink": value.informationOfBride.qrCodeBrideLink,
                "nameBankOfFatherBride": value.informationOfBride.nameBankOfFatherBride,
                "ownerBankOfFatherBride": value.informationOfBride.ownerBankOfFatherBride,
                "bankOfNumberFatherBride": value.informationOfBride.bankOfNumberFatherBride,
                "qrCodeFatherBrideLink": value.informationOfBride.qrCodeFatherBrideLink,
                "nameBankOfMotherBride": value.informationOfBride.nameBankOfMotherBride,
                "ownerBankOfMotherBride": value.informationOfBride.ownerBankOfMotherBride,
                "bankOfNumberMotherBride": value.informationOfBride.bankOfNumberMotherBride,
                "qrCodeMotherBrideLink": value.informationOfBride.qrCodeMotherBrideLink,
                "phoneNumberOfFatherBride": value.informationOfBride.phoneNumberOfFatherBride,
                "phoneNumberOfBride": value.informationOfBride.phoneNumberOfBride,
                "phoneNumberOfMotherBride": value.informationOfBride.phoneNumberOfMotherBride,
            },
            "timeAndLocationOfWedding": {
                "contentOfCountDown": value.timeAndLocationOfWedding.contentOfCountDown,
                "dateOfEventWedding": value.timeAndLocationOfWedding.dateOfEventWedding,
                "isDisplayCountDown": isDisplayCountDown,
                "locationOfWedding": value.timeAndLocationOfWedding.locationOfWedding,
                "mapDirectLink": value.timeAndLocationOfWedding.mapDirectLink,
                "namelocationOfWedding": value.timeAndLocationOfWedding.namelocationOfWedding,
                "timeOfEventWedding": value.timeAndLocationOfWedding.timeOfEventWedding,
            },
            "timeAndLocationOfEgagement": {
                "dateOfEventEgagement": value.timeAndLocationOfEgagement.dateOfEventEgagement,
                "timeOfEventEgagement": value.timeAndLocationOfEgagement.timeOfEventEgagement,
                "locationOfEgagement": value.timeAndLocationOfEgagement.locationOfEgagement
            },
            "timeAndLocationOfInterrogation": {
                "dateOfEventInterrogation": value.timeAndLocationOfEgagement.dateOfEventEgagement,
                "timeOfEventInterrogation": value.timeAndLocationOfEgagement.timeOfEventEgagement,
                "locationOfInterrogation": value.timeAndLocationOfEgagement.locationOfEgagement
            },
            "eventOfProgram": {
                "timeToWellcome": value.eventOfProgram.timeToWellcome,
                "timeToCelebrate": value.eventOfProgram.timeToCelebrate,
                "timeToDinner": value.eventOfProgram.timeToDinner,
                "timeToMusic": value.eventOfProgram.timeToMusic,
                "eventOfProgramEditOne": value.eventOfProgram.eventOfProgramEditOne,
                "eventOfProgramEditTwo": value.eventOfProgram.eventOfProgramEditTwo,
                "eventOfProgramEditThree": value.eventOfProgram.eventOfProgramEditThree,
                "eventOfProgramEditFour": value.eventOfProgram.eventOfProgramEditFour
            },
            "fontStyleOfTitle": {
                "id": 1,
                "name": "",
                "value": value.fontStyleOfTitle.value
            },
            "fontStyleOfContent": {
                "id": 1,
                "name": "",
                "value": value.fontStyleOfContent.value
            },
            "styleBackground": {
                "id": 1,
                "name": "none",
                "value": value.styleBackground.value
            },
            "backgroundColor": {
                "name": "",
                "value": value.backgroundColor.value
            },
            "effectBackgroud": {
                "id": 1,
                "name": "",
                "value": value.effectBackgroud.value
            },
            "coverImage": value.coverImage,
            "thumbnailImage": value.thumbnailImage,
            "effectImage": value.effectImage,
            "contentOfInvitation": value.contentOfInvitation,
            "album": value.album,
            "videoLink": value.videoLink,
            "song": value.song,
            "isUseConfirm": value.isUseConfirm,
            "isUseGuestBook": value.isUseGuestBook,
            "password": value.password,
            "contentGuestBook": value.contentGuestBook,
            "anotherProduct": value.anotherProduct,
            "note": value.note,
            "isUseVideo": value.isUseVideo,
            "isUseEvent": value.isUseEvent,
            "isUseDamNgo": value.isUseDamNgo,
            "isUseBanking": value.isUseBanking,
            "totalAmount": value.totalAmount,
        }

        const resp = await UpdateInvitationPage({ data: jsonData })
        console.log(resp)
    }, [isDisplayCountDown, value])

    return (
        <div>
            {isLoading && <CSpinner />}
            <div className="row-align title_table">
                <h5 style={{ margin: '0' }}>Chi tiết thiệp</h5>
            </div>
            <div className="row flex-col">
                <div className="col-xs-12 col-sm-12">
                    <CAccordion className="accordion-normal">
                        <CAccordionItem itemKey={1}>
                            <CAccordionHeader>
                                <h5>Thông tin nhà trai</h5>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <CForm className=" g-8">
                                    <div className='row'>
                                        <CCol md={4} className="form-input">
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên chú rể</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên chú rể"
                                                    onChange={(e) => handleChangeName(e.target.value)}
                                                    value={value.informationOfGroom?.name || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => handleChangePhoneNumberOfGroom(e.target.value)}
                                                    value={value.informationOfGroom?.phoneNumberOfGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Thứ bậc gia đình</CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    name="isPayedSearch"
                                                    onChange={(e) => setSellectGroom(e.target.value)}
                                                >
                                                    <option value={true}>Trưởng nam</option>
                                                    <option value={false} >Thứ</option>
                                                </CFormSelect>
                                            </div>
                                        </CCol>

                                        <CCol md={4} className="form-input">

                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên ngân hàng</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên ngân hàng"
                                                    onChange={(e) => handleChangeNameBankGroom(e.target.value)}
                                                    value={value.informationOfGroom.nameBankOfGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Chủ tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập chủ tài khoản"
                                                    onChange={(e) => handleChangeOwnerBankOfGroom(e.target.value)}
                                                    value={value.informationOfGroom.ownerBankOfGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số tài khoản"
                                                    onChange={(e) => handleChangeBankOfNumberGroom(e.target.value)}
                                                    value={value.informationOfGroom.bankOfNumberGroom || ''}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">

                                            <img src={value.informationOfGroom.qrCodeGroomLink} />


                                        </CCol>
                                        <hr />
                                    </div>
                                    <div className='row'>
                                        <CCol md={4} className="form-input">
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên Bố</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên bố"
                                                    onChange={(e) => handleChangeNameFatherGroom(e.target.value)}
                                                    value={value.informationOfGroom.fatherNameOfGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => handleChangePhoneNumberOfFatherGroom(e.target.value)}
                                                    value={value.informationOfGroom.phoneNumberOfFatherGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormCheck
                                                    aria-label="Default select example"
                                                    name="isPayedSearch"
                                                    defaultChecked={value.informationOfGroom?.isGoneFather}
                                                    onChange={onSellectIsGoneFather}
                                                    style={{ marginRight: 10 }}
                                                />

                                                <CFormLabel htmlFor="inputSearchCuser">Đã mất </CFormLabel>

                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">

                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên ngân hàng</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên ngân hàng"
                                                    onChange={(e) => handleChangeNameBankFatherGroom(e.target.value)}
                                                    value={value.informationOfGroom.nameBankOfFatherGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Chủ tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập chủ tài khoản"
                                                    onChange={(e) => handleChangeOwnerBankOfFatherGroom(e.target.value)}
                                                    value={value.informationOfGroom.ownerBankOfFatherGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số tài khoản"
                                                    onChange={(e) => handleChangeBankOfNumberFatherGroom(e.target.value)}
                                                    value={value.informationOfGroom.bankOfNumberFatherGroom || ''}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">
                                            <img src={value.informationOfGroom.qrCodeFatherGroomLink} />
                                        </CCol>
                                        <hr />
                                    </div>

                                    <div className='row'>
                                        <CCol md={4} className="form-input">
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên Mẹ</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên mẹ"
                                                    onChange={(e) => handleChangeMotherNameOfGroom(e.target.value)}
                                                    value={value.informationOfGroom.motherNameOfGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => handleChangePhoneNumberOfMotherGroom(e.target.value)}
                                                    value={value.informationOfGroom.phoneNumberOfMotherGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormCheck
                                                    aria-label="Default select example"
                                                    name="isPayedSearch"
                                                    defaultChecked={value.informationOfGroom?.isGoneMother}
                                                    onChange={onSellectIsGoneMother}
                                                    style={{ marginRight: 10 }}
                                                />

                                                <CFormLabel htmlFor="inputSearchCuser">Đã mất </CFormLabel>

                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">

                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên ngân hàng</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    id="inputSearchCuser"
                                                    placeholder="Nhập tên ngân hàng"
                                                    onChange={(e) => handleChangeNameBankMotherGroom(e.target.value)}
                                                    value={value.informationOfGroom.nameBankOfMotherGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Chủ tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập chủ tài khoản"
                                                    onChange={(e) => handleChangeOwnerBankOfMotherGroom(e.target.value)}
                                                    value={value.informationOfGroom.ownerBankOfMotherGroom || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số tài khoản"
                                                    onChange={(e) => handleChangeBankOfNumberMotherGroom(e.target.value)}
                                                    value={value.informationOfGroom.bankOfNumberMotherGroom || ''}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">
                                            <img src={value.informationOfGroom.qrCodeMotherGroomLink} />
                                        </CCol>
                                        <hr />
                                    </div>

                                </CForm>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                    <CAccordion className="accordion-normal">
                        <CAccordionItem itemKey={1}>
                            <CAccordionHeader>
                                <h5>Thông tin nhà gái</h5>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <CForm className=" g-8">
                                    <div className='row'>
                                        <CCol md={4} className="form-input">
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên cô dâu</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên cô dâu"
                                                    onChange={(e) => handleChangeNameBride(e.target.value)}
                                                    value={value.informationOfBride?.name || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => handleChangePhoneNumberOfBride(e.target.value)}
                                                    value={value.informationOfBride?.phoneNumberOfBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Thứ bậc gia đình</CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    name="isPayedSearch"
                                                    onChange={(e) => setSellectBride(e.target.value)}
                                                >
                                                    <option value={true}>Trưởng nữ</option>
                                                    <option value={false} >Thứ</option>
                                                </CFormSelect>
                                            </div>
                                        </CCol>

                                        <CCol md={4} className="form-input">

                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên ngân hàng</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên ngân hàng"
                                                    onChange={(e) => handleChangeNameBankOfBride(e.target.value)}
                                                    value={value.informationOfBride.nameBankOfBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Chủ tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập chủ tài khoản"
                                                    onChange={(e) => handleChangeOwnerBankOfBride(e.target.value)}
                                                    value={value.informationOfBride.ownerBankOfBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số tài khoản"
                                                    onChange={(e) => handleChangeBankOfNumberBride(e.target.value)}
                                                    value={value.informationOfBride.bankOfNumberBride || ''}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">

                                            <img src={value.informationOfBride.qrCodeBrideLink} />


                                        </CCol>
                                        <hr />
                                    </div>
                                    <div className='row'>
                                        <CCol md={4} className="form-input">
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên Bố</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên bố"
                                                    onChange={(e) => handleChangeNameFatherOfBride(e.target.value)}
                                                    value={value.informationOfBride.fatherNameOfBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => handleChangePhoneNumberOfFatherBride(e.target.value)}
                                                    value={value.informationOfBride.phoneNumberOfFatherBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormCheck
                                                    aria-label="Default select example"
                                                    name="isPayedSearch"
                                                    defaultChecked={value.informationOfBride?.isGoneFatherBride}
                                                    onChange={onSellectIsGoneFatherBride}
                                                    style={{ marginRight: 10 }}
                                                />

                                                <CFormLabel htmlFor="inputSearchCuser">Đã mất </CFormLabel>

                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">

                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên ngân hàng</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên ngân hàng"
                                                    onChange={(e) => handleChangeNameBankOfFatherBride(e.target.value)}
                                                    value={value.informationOfBride.nameBankOfFatherBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Chủ tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập chủ tài khoản"
                                                    onChange={(e) => handleChangeOwnerBankOfFatherBride(e.target.value)}
                                                    value={value.informationOfBride.ownerBankOfFatherBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số tài khoản"
                                                    onChange={(e) => handleChangeBankOfNumberFatherBride(e.target.value)}
                                                    value={value.informationOfBride.bankOfNumberFatherBride || ''}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">
                                            <img src={value.informationOfBride.qrCodeFatherBrideLink} />
                                        </CCol>
                                        <hr />
                                    </div>

                                    <div className='row'>
                                        <CCol md={4} className="form-input">
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên Mẹ</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập tên mẹ"
                                                    onChange={(e) => handleChangeMotherNameOfBride(e.target.value)}
                                                    value={value.informationOfBride.motherNameOfBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => handleChangePhoneNumberOfMotherBride(e.target.value)}
                                                    value={value.informationOfBride.phoneNumberOfMotherBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormCheck
                                                    aria-label="Default select example"
                                                    name="isPayedSearch"
                                                    defaultChecked={value.informationOfBride?.isGoneMotherOfBride}
                                                    onChange={onSellectIsGoneMotherOfBride}
                                                    style={{ marginRight: 10 }}
                                                />

                                                <CFormLabel htmlFor="inputSearchCuser">Đã mất </CFormLabel>

                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">

                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Tên ngân hàng</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    id="inputSearchCuser"
                                                    placeholder="Nhập tên ngân hàng"
                                                    onChange={(e) => handleChangeNameBankOfMotherBride(e.target.value)}
                                                    value={value.informationOfBride.nameBankOfMotherBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Chủ tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập chủ tài khoản"
                                                    onChange={(e) => handleChangeOwnerBankOfMotherBride(e.target.value)}
                                                    value={value.informationOfBride.ownerBankOfMotherBride || ''}
                                                />
                                            </div>
                                            <div className='block_input'>
                                                <CFormLabel htmlFor="inputSearchCuser">Số tài khoản</CFormLabel>
                                                <CFormInput
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nhập số tài khoản"
                                                    onChange={(e) => handleChangeBankOfNumberMotherBride(e.target.value)}
                                                    value={value.informationOfBride.bankOfNumberMotherBride || ''}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol md={4} className="form-input">
                                            <img src={value.informationOfBride.qrCodeMotherBrideLink} />
                                        </CCol>
                                        <hr />
                                    </div>

                                </CForm>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <CAccordion className="accordion-normal">
                                <CAccordionItem itemKey={1}>
                                    <CAccordionHeader>
                                        <h5>Thời gian và địa điểm</h5>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <CForm className=" g-8">
                                            <div className='row'>
                                                <CCol md={12} className="form-input">
                                                    <div className='row'>
                                                        <CCol md={8}>
                                                            <div className='block_input'>
                                                                <CFormLabel htmlFor="inputSearchCuser">Hiển thị Thời gian đếm ngược đến ngày cưới</CFormLabel>
                                                                <div className='text_box'>

                                                                    <input
                                                                        type='checkbox'
                                                                        checked={isDisplayCountDown}
                                                                        onChange={(e) => hanldeChangeIsDisplayCountDown(e.target.checked)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </CCol>
                                                        <CCol md={4}>
                                                            <div className='block_input'>
                                                                <CFormLabel htmlFor="inputSearchCuser">Thời gian</CFormLabel>
                                                                <input
                                                                    type='date'
                                                                    className='form-control'
                                                                    value={value.timeAndLocationOfWedding.dateOfEventWedding}
                                                                    onChange={(e) => hanldeChangeDateOfEventWedding(e.target.value)}
                                                                />
                                                            </div>
                                                        </CCol>
                                                    </div>
                                                    <div className='row'>
                                                        <CCol md={4} className="form-input">
                                                            <div className='block_input'>
                                                                <CFormLabel htmlFor="inputSearchCuser">Tên địa điểm</CFormLabel>
                                                                <CFormInput
                                                                    name="name"
                                                                    type="text"
                                                                    placeholder="Nhập tên địa điểm"
                                                                    onChange={(e) => handleChangeNamelocationOfWedding(e.target.value)}
                                                                    value={value.timeAndLocationOfWedding?.namelocationOfWedding || ''}
                                                                />
                                                            </div>
                                                        </CCol>
                                                        <CCol md={8} className="form-input">
                                                            <div className='block_input'>
                                                                <CFormLabel htmlFor="inputSearchCuser">Địa chỉ</CFormLabel>
                                                                <CFormInput
                                                                    name="name"
                                                                    type="text"
                                                                    placeholder="Nhập tên địa điểm"
                                                                    onChange={(e) => handleChangeLocationOfWedding(e.target.value)}
                                                                    value={value.timeAndLocationOfWedding?.locationOfWedding || ''}
                                                                />
                                                            </div>
                                                        </CCol>
                                                    </div>
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Maps</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="text"
                                                            placeholder="Nhập maps"
                                                            onChange={(e) => handleChangeMapDirectLink(e.target.value)}
                                                            value={value.timeAndLocationOfWedding?.mapDirectLink || ''}
                                                        />
                                                    </div>
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Nội dung lời mời</CFormLabel>
                                                        <CFormTextarea
                                                            name="name"
                                                            type="text"
                                                            placeholder="Nhập nội dung lời mời"
                                                            onChange={(e) => handleChangeContentOfCountDown(e.target.value)}
                                                            value={value.timeAndLocationOfWedding?.contentOfCountDown || ''}
                                                            cols={12}
                                                            rows={6}
                                                        />
                                                    </div>
                                                </CCol>
                                            </div>
                                        </CForm>
                                    </CAccordionBody>
                                </CAccordionItem>
                            </CAccordion>
                            <CAccordion className="accordion-normal">
                                <CAccordionItem itemKey={1}>
                                    <CAccordionHeader>
                                        <h5>Chương trình</h5>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <CForm className=" g-8">
                                            <div className='row'>
                                                <CCol md={12} className="form-input">
                                                    <div className='row'>
                                                        <CCol md={12}>
                                                            <div className='block_input'>
                                                                <CFormLabel htmlFor="inputSearchCuser">Hiển thị tính năng chương trình</CFormLabel>
                                                                <div className='text_box'>

                                                                    <input
                                                                        type='checkbox'
                                                                        checked={value.isUseEvent}
                                                                        onChange={(e) => hanldeChangeIsUseEvent(e.target.checked)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </CCol>
                                                        <CCol md={12}>
                                                            <div className='block_input flex_row_2'>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.eventOfProgramEditOne}
                                                                    onChange={(e) => hanldeChangeEventOfProgramEditOne(e.target.value)}
                                                                />
                                                                <input
                                                                    type='time'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.timeToWellcome}
                                                                    onChange={(e) => hanldeChangeTimeToWellcome(e.target.value)}
                                                                />
                                                            </div>
                                                        </CCol>
                                                        <CCol md={12}>
                                                            <div className='block_input flex_row_2'>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.eventOfProgramEditTwo}
                                                                    onChange={(e) => hanldeChangeEventOfProgramEditTwo(e.target.value)}
                                                                />
                                                                <input
                                                                    type='time'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.timeToCelebrate}
                                                                    onChange={(e) => hanldeChangeTimeToCelebrate(e.target.value)}
                                                                />
                                                            </div>
                                                        </CCol>
                                                        <CCol md={12}>
                                                            <div className='block_input flex_row_2'>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.eventOfProgramEditThree}
                                                                    onChange={(e) => hanldeChangeEventOfProgramEditThree(e.target.value)}
                                                                />
                                                                <input
                                                                    type='time'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.timeToMusic}
                                                                    onChange={(e) => hanldeChangeTimeToMusic(e.target.value)}
                                                                />
                                                            </div>
                                                        </CCol>
                                                        <CCol md={12}>
                                                            <div className='block_input flex_row_2'>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.eventOfProgramEditFour}
                                                                    onChange={(e) => hanldeChangeEventOfProgramEditFour(e.target.value)}
                                                                />
                                                                <input
                                                                    type='time'
                                                                    className='form-control'
                                                                    value={value.eventOfProgram.timeToDinner}
                                                                    onChange={(e) => hanldeChangeTimeToDinner(e.target.value)}
                                                                />
                                                            </div>
                                                        </CCol>
                                                    </div>
                                                </CCol>
                                            </div>
                                        </CForm>
                                    </CAccordionBody>
                                </CAccordionItem>
                            </CAccordion>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <CAccordion className="accordion-normal">
                                <CAccordionItem itemKey={1}>
                                    <CAccordionHeader>
                                        <h5>Dạm ngõ và ăn hỏi</h5>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <CForm className=" g-8">
                                            <div className='row'>
                                                <CCol md={12}>
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Hiển thị tính năng Dặm ngõ và Ăn hỏi</CFormLabel>
                                                        <div className='text_box'>

                                                            <input
                                                                type='checkbox'
                                                                checked={value.isUseDamNgo}
                                                                onChange={(e) => hanldeChangeIsUseDamNgo(e.target.checked)}
                                                            />

                                                        </div>
                                                    </div>
                                                </CCol>
                                                <CCol md={4} className="form-input">
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Ngày dạm ngõ</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="date"
                                                            placeholder="Nhập ngày dạm ngõ"
                                                            onChange={(e) => handleChangeDateOfEventEgagement(e.target.value)}
                                                            value={value.timeAndLocationOfEgagement?.dateOfEventEgagement || ''}
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol md={4} className="form-input">
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Thời gian dạm ngõ</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="time"
                                                            placeholder="Nhập thời gian"
                                                            onChange={(e) => handleChangeTimeOfEventEgagement(e.target.value)}
                                                            value={value.timeAndLocationOfEgagement?.timeOfEventEgagement || ''}
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol md={12} className="form-input">
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Địa điểm dạm ngõ</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="text"
                                                            placeholder="Nhập địa điểm"
                                                            value={value.timeAndLocationOfEgagement?.locationOfEgagement || ''}
                                                            onChange={(e) => handleChangeLocationOfEgagement(e.target.value)}
                                                        />
                                                    </div>
                                                </CCol>
                                            </div>
                                            <div className='row'>
                                                <CCol md={4} className="form-input">
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Ngày ăn hỏi</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="date"
                                                            placeholder="Nhập ngày dạm ngõ"
                                                            onChange={(e) => handleChangeDateOfEventInterrogation(e.target.value)}
                                                            value={value.timeAndLocationOfInterrogation?.dateOfEventInterrogation || ''}
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol md={4} className="form-input">
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Thời gian ăn hỏi</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="time"
                                                            placeholder="Nhập thời gian"
                                                            onChange={(e) => handleChangeTimeOfEventInterrogation(e.target.value)}
                                                            value={value.timeAndLocationOfInterrogation?.timeOfEventInterrogation || ''}
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol md={12} className="form-input">
                                                    <div className='block_input'>
                                                        <CFormLabel htmlFor="inputSearchCuser">Địa điểm ăn hỏi</CFormLabel>
                                                        <CFormInput
                                                            name="name"
                                                            type="text"
                                                            placeholder="Nhập địa điểm"
                                                            onChange={(e) => handleChangeLocationOfInterrogation(e.target.value)}
                                                            value={value.timeAndLocationOfInterrogation?.locationOfInterrogation || ''}
                                                        />
                                                    </div>
                                                </CCol>
                                            </div>
                                        </CForm>
                                    </CAccordionBody>
                                </CAccordionItem>
                            </CAccordion>
                        </div>

                    </div>
                    <br />
                    <CCol md={12}>
                        <div className="d-grid form-input">
                            <CButton
                                color="primary"
                                onClick={handleChange}
                                // size="sm"
                                className="normal"
                            >
                                Update
                            </CButton>
                        </div>
                    </CCol>

                </div>
            </div>
        </div >
    )
}
export default DetailsInvitation
