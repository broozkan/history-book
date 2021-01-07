import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SiteUserContext } from '../../contexts/SiteUserContext'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'

const FormStudentRemoveRequest = (props) => {

    const [state, setState] = useState({
        student_remove_request_user_name_surname: '',
        student_remove_request_contact_info: '',
        is_form_submitting: false
    })

    const history = useHistory()
    const siteUserContext = useContext(SiteUserContext)

    useEffect(()=>{
        if(siteUserContext.state.is_logged_in){
            setState({
                student_remove_request_user_name_surname: siteUserContext.state.user.user_name,
                student_remove_request_contact_info: siteUserContext.state.user.user_email
            })
            
        }
    },[])

    const handleChange = (e) => {

        if (e.target.type === "checkbox") {
            setState({
                [e.target.name]: e.target.checked
            })
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_form_submitting: true
        })

        const data = {
            student_remove_request_student: [
                props.student
            ],
            student_remove_request_user_name_surname: state.student_remove_request_user_name_surname,
            student_remove_request_contact_info: state.student_remove_request_contact_info
        }


        const submitResponse = await api.post('/student-remove-request/new/', data, {headers: {'site-token': localStorage.getItem('site-token')}})

        console.log(submitResponse);
        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: 'Kaldırma talebiniz kaydedildi',
                icon: 'success'
            })
            
        }else{
            Swal.fire({
                title: 'Hata!',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
        }

        setState({
            ...state,
            is_form_submitting: false
        })

    }


    // render card loader
    let cardLoaderHtml = ''
    if(state.is_form_submitting){
        cardLoaderHtml = <CardLoader />
    }


    return (
        <>
        <div class="row">
            <div class="col-lg-12 center background-white b-r-6">
                <h3>
                    Kaldırma talebi oluşturun
                    
                </h3>
                <form onSubmit={handleSubmit}>
                    {cardLoaderHtml}

                    <div class="form-group">
                        <label class="sr-only">Adınız Soyadınız</label>
                        <input type="text" class="form-control" name="student_remove_request_user_name_surname" onChange={handleChange} value={state.student_remove_request_user_name_surname} placeholder="Adınızı ve soyadınızı giriniz" />
                    </div>
                    <div class="form-group m-b-5">
                        <label class="sr-only">İletişim Bilginiz</label>
                        <input type="student_remove_request_contact_info" class="form-control" name="student_remove_request_contact_info" onChange={handleChange} value={state.student_remove_request_contact_info} placeholder="E-posta veya telefon numarası giriniz" />
                    </div>
                    <div class="text-left form-group mt-3">
                        <button type="submit" class="btn">GÖNDER</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default FormStudentRemoveRequest