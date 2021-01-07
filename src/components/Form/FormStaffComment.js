import React, { useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'

const FormStaffComment = (props) => {

    const [state, setState] = useState({
        staff_id: '',
        comment: ''

    })

    const resetState = () => {
        setState({
            ...state,
            comment: ''
        })
    }

    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()




    }


    return (
        <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group w-50">
                <input className="form-control w-100" onChange={handleChange} value={state.comment} name="comment" id="comment" placeholder="Yorumunuz" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-outline mb-0"><span className="fa fa-paper-plane"></span> Kaydet</button>
            </div>
        </form>
    )
}

export default FormStaffComment