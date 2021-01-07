import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'
import Cookies from 'universal-cookie';
import ModalLoginSite from '../Modal/ModalLoginSite';
import { SiteUserContext } from '../../contexts/SiteUserContext';

const FormSaveCard = (props) => {

    const [state, setState] = useState({
        stock_search_card_name: '',
        show_login_modal: false
    })

    const siteUserContext = useContext(SiteUserContext)

    

    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!siteUserContext.state.is_logged_in){
            setState({
                ...state,
                show_login_modal: true
            })
            return false
        }


        const data = {
            stock_search_card_name: state.stock_search_card_name,
            student_name: props.state.student_name,
            student_surname: props.state.student_surname,
            student_birthday: props.state.student_birthday,
            student_father_name: props.state.student_father_name,
            student_gender: props.state.student_gender,
            student_nationality: props.state.student_nationality,
            student_school_number: props.state.student_school_number,
            student_education_beginning_year: props.state.student_education_beginning_year,
            student_education_ending_year: props.state.student_education_ending_year
        }

        const submitResponse = await api.post('/stock-search/new', data, { headers: {'site-token': localStorage.getItem('site-token')} })

        
        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Arama kartınız kaydedildi',
                icon: 'success'
            })

            setState({
                ...state,
                stock_search_card_name : ''
            })

        }else{
            if (submitResponse.data.status == 401) {
                setState({
                    ...state,
                    show_login_modal: true
                })
            }else{
                Swal.fire({
                    title: 'Hata!',
                    text: submitResponse.data.responseData,
                    icon: 'error'
                })
            }
            
        }


    }


    // render login modal
    let loginModalHtml = ''
    if (state.show_login_modal) {
        loginModalHtml = <ModalLoginSite />
    }

    return (
        <>
        <div className="row mt-3">
            <div className="col-lg-12">
                <form method="POST" onSubmit={handleSubmit}>
                    <input className="form-control" name="stock_search_card_name" onChange={handleOnChange} id="stock_search_card_name" value={state.stock_search_card_name} placeholder="Arama kartınıza isim giriniz" required />
                    <button className="btn btn-sm btn-outline w-100" type="submit"><span className="fa fa-save"></span> Kartı Kaydet</button>
                </form>
            </div>
        </div>
        {loginModalHtml}
        </>
    )
}

export default FormSaveCard