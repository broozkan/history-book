import React, { useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'

const FormCategory = (props) => {

    const [state, setState] = useState({
        category_name: ''

    })

    const resetState = () => {
        setState({
            category_name: ''
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


        const submitResponse = await api.post('/category/new', state)

        if (submitResponse.data.response) {
            Swal.fire({
                title: "Başarılı",
                text: "Kategori kaydedildi",
                icon: "success"
            })
            resetState()
        } else {
            Swal.fire({
                title: "Başarılı",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="category_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.category_name} name="category_name" id="category_name" placeholder="Kategori adı giriniz" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn">Kaydet</button>
            </div>
        </form>
    )
}

export default FormCategory