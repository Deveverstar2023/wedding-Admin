import React, { useState, useEffect, useCallback } from 'react'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import {
    CSpinner
} from '@coreui/react'

const DetailsInvitation = () => {

    const { id } = useParams()

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="row-align title_table">
                <h5 style={{ margin: '0' }}>Chi tiết thiệp</h5>
            </div>


        </div>
    )
}
export default DetailsInvitation
