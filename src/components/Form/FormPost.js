import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import { fixdate } from '../../services/fixdate'
import SelectCategory from '../Select/SelectCategory'

const FormPost = (props) => {

    const [state, setState] = useState({
        post_title: '',
        post_alternative_title: '',
        post_photo: '',
        post_category: {},
        post_content: '',
        is_post_open_open_for_comment: false
    })

    const resetState = () => {
        setState({
            post_title: '',
            post_alternative_title: '',
            post_photo: '',
            post_category: {},
            post_content: '',
            is_post_open_open_for_comment: false,
            is_form_submitting: false
        })
    }

    useEffect(() => {
        if (props.post_id) {
            getPost()
        }
    }, [])


    const getPost = async () => {
        setState({
            ...state,
            is_form_submitting: true
        })

        const post = await api.get('/post/get/' + props.post_id, {})

        setState(post.data)

    }

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
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

        let formData = new FormData()

    
        await formData.append('file', state.post_photo)
        await formData.append('data', JSON.stringify(state))


        let submitResponse
        if(props.post_id){
            submitResponse = await api.put('/post/update/'+props.post_id, formData, { headers: {'content-type':'multipart/form-data'}})
            
            setState({
                ...state,
                is_form_submitting: false
            })
        }else{
            submitResponse = await api.post('/post/new', formData, { headers: {'content-type':'multipart/form-data'}})
            resetState()
        }

        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Yazı kaydedildi',
                icon: 'success'
            })
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



    // render profile photo
    let postPhotoHtml = ''
    if(state.post_photo){
        postPhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT+"/file/"+state.post_photo} />
    }


    return(
        <div class="card">
            {cardLoaderHtml}
            <div class="card-header">
                <span class="h4">Yazı Formu</span>
                <p class="text-muted">Bir blog yazısı paylaşın</p>
            </div>
            <div class="card-body">
                <form id="form1" class="form-validate" novalidate="novalidate" onSubmit={handleSubmit}>
                    <div class="h5 mb-4">Yazı Bilgileri</div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            {postPhotoHtml}
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="post_title">Başlığı (*)</label>
                            <input type="text" class="form-control" value={state.post_title} onChange={handleChange} name="post_title" id="post_title" placeholder="Yazı başlığını giriniz" required="" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="post_alternative_title">Alt Başlığı (*)</label>
                            <input type="text" class="form-control" value={state.post_alternative_title} onChange={handleChange} name="post_alternative_title" id="post_alternative_title" placeholder="Yazı alt başlığını giriniz" required="" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="post_photo">Kapak Fotoğrafı (*)</label>
                            <input type="file" class="form-control" onChange={handleChange} name="post_photo" id="post_photo" placeholder="Yazı fotoğrafı giriniz" required="" />

                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="post_category">Kategorisi (*)</label>
                            <SelectCategory />
                        </div>
                    </div>
                    <button type="submit" class="btn m-t-30 mt-3">Kaydet</button>
                    <a href="/admin/post/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                </form>
            </div>
        </div>
    )
}

export default FormPost