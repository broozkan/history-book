import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SiteUserContext } from '../../contexts/SiteUserContext'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'

const FormLoginSite = (props) => {

    const [state, setState] = useState({
        user_username: '',
        user_password: '',
        remember_me: true,
        is_form_submitting: false
    })

    const history = useHistory()
    const siteUserContext = useContext(SiteUserContext)

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
        console.log(state);


        const loginResponse = await api.post('/user/login/', {}, {auth:{ username: state.user_username,password: state.user_password }})

        console.log(loginResponse);
        if (loginResponse.data.response) {
            localStorage.setItem('site-user', JSON.stringify(loginResponse.data.responseData[0]))
            localStorage.setItem('site-token', loginResponse.data.token)
            siteUserContext.setUserCredentials()
            if(props.closeModal){
                props.closeModal()
            }
            
        }else{
            Swal.fire({
                title: 'Hata!',
                text: loginResponse.data.responseData,
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
                    Giriş yapın
                    
                </h3>
                <form onSubmit={handleSubmit}>
                    {cardLoaderHtml}

                    <div class="form-group">
                        <label class="sr-only">Kullanıcı Adı</label>
                        <input type="text" class="form-control" name="user_username" onChange={handleChange} value={state.user_username} placeholder="Kullanıcı adı giriniz" />
                    </div>
                    <div class="form-group m-b-5">
                        <label class="sr-only">Parola</label>
                        <input type="password" class="form-control" name="user_password" onChange={handleChange} value={state.user_password} placeholder="Parola giriniz" />
                    </div>
                    <div class="form-group form-inline text-left">
                        <div class="form-check">
                            <label>
                                <input type="checkbox" name="remember_me" onChange={handleChange} checked={state.remember_me} /><small class="m-l-10"> Beni hatırla</small>
                            </label>
                        </div>
                    </div>
                    <div class="text-left form-group">
                        <button type="submit" class="btn">GİRİŞ YAP</button>
                    </div>
                </form>
                <p class="small">
                    Parolanızı mı unuttunuz
                    <br></br>
                    <a href="#">Sıfırlama bağlantısı alın</a>
                </p>
            </div>
        </div>
        </>
    )
}

export default FormLoginSite