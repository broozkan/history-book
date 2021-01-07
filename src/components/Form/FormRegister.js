import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import { fixdate } from '../../services/fixdate'


const FormRegister = (props) => {

    const [state, setState] = useState({
        user_name: '',
        user_surname: '',
        user_email: '',
        user_password: '',
        user_password_repeat: '',
        user_phone_number: '',
        is_user_graduated_from_sivaslisesi: '',
        user_email_verify: false
      
    })

    const resetState = () => {
        setState({
            user_name: '',
            user_surname: '',
            user_email: '',
            user_password: '',
            user_password_repeat: '',
            user_phone_number: '',
            is_user_graduated_from_sivaslisesi: '',
            user_email_verify: false
        })
    }
  


    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_form_submitting: true
        })



        const submitResponse = await api.post('/user/register/', state)
            
        setState({
            ...state,
            is_form_submitting: false
        })

        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Kayıdınız oluşturuldu',
                icon: 'success'
            })
            resetState()
        }else{
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })

        }

        


    }

    // render card loader
    let cardLoaderHtml = ''
    if (state.is_form_submitting) {
        cardLoaderHtml = <CardLoader />
    }else{
        cardLoaderHtml = ''
    }



    return (
        <div class="row">
          <div class="col-lg-12 center background-white b-r-6">
                <h3>
                    Hesap oluşturun
                    
                </h3>
                <form id="form1" className="form-validate" novalidate="novalidate" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="user_name">Adınız (*)</label>
                            <input type="text" className="form-control" onChange={handleOnChange} value={state.user_name} name="user_name" id="user_name" placeholder="Adınızı giriniz" required="" />
                        </div>
                        <div className="form-group col-md-12">
                            <label for="user_surname">Soyadınız (*)</label>
                            <input type="text" className="form-control" onChange={handleOnChange} value={state.user_surname} name="user_surname" id="user_surname" placeholder="Soyadınızı giriniz" required="" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="user_email">E-Posta Adresiniz (*)</label>
                            <input type="text" className="form-control" onChange={handleOnChange} value={state.user_email} name="user_email" id="user_email" placeholder="E-posta adresinizi giriniz" required="" />
                        </div>
                        <div className="form-group col-md-12">
                            <label for="user_phone_number">Telefon Numaranız</label>
                            <input type="text" className="form-control" onChange={handleOnChange} value={state.user_phone_number} name="user_phone_number" id="user_phone_number" placeholder="Telefon numaranızı giriniz" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="user_password">Parolanız (*)</label>
                            <input type="password" minLength="6" className="form-control" onChange={handleOnChange} value={state.user_password} name="user_password" id="user_password" placeholder="Parolanızı giriniz" required="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="user_password_repeat">Parolanız (Tekrar) (*)</label>
                            <input type="password" className="form-control" onChange={handleOnChange} value={state.user_password_repeat} name="user_password_repeat" id="user_password_repeat" placeholder="Parolanızı tekrar giriniz" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group d-inline-flex">
                            <label class="custom-control custom-radio ml-2">
                                <input name="is_user_graduated_from_sivaslisesi" value="1" checked={state.is_user_graduated_from_sivaslisesi === "1"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                <span class="custom-control-label">Sivas lisesi öğrencisiyim / öğrencisiydim</span>
                            </label>
                           
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group d-inline-flex">
                           
                            <label class="custom-control custom-radio ml-2">
                                <input name="is_user_graduated_from_sivaslisesi" value="0" checked={state.is_user_graduated_from_sivaslisesi === "0"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                <span class="custom-control-label">Sivas lisesi öğrencisi değilim / değildim</span>
                            </label>
                        </div>
                    </div>
                    
                    
                    <button type="submit" className="btn m-t-30 mt-3">Kaydet</button>
                </form>
            </div>
        </div>
          
    )

}

export default FormRegister