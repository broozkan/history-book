import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import ModalCategory from '../Modal/ModalNewCategory'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const FormPost = (props) => {

    const [state, setState] = useState({
        post_title: '',
        post_alternative_title: '',
        post_photo: '',
        post_category: [],
        post_content: '',
        categories: [],
        post_content: '',
        is_categories_loaded: false,
        is_post_open_open_for_comment: false
    })

    const resetState = () => {
        setState({
            post_title: '',
            post_alternative_title: '',
            post_photo: '',
            post_category: [],
            post_content: '',
            categories: [],
            post_content: '',
            is_categories_loaded: false,
            is_post_open_open_for_comment: false,
            is_form_submitting: false
        })
    }

    useEffect(() => {
        if (props.post_id) {
            getPost()
            getCategories()

        } else {
            getCategories()
        }

    }, [])


    const getPost = async (callback) => {
        setState({
            ...state,
            is_form_submitting: true
        })

        const post = await api.get('/post/get/' + props.post_id, {})
            .then(async (result) => {

                return result.data

            })


        setState(post)



    }


    const getCategories = async () => {

        console.log(state)
        const categories = await api.get('/category/list/1', {})
            .then((result) => {

                setState({
                    ...state,
                    categories: result.data.docs,
                    is_categories_loaded: true
                })
            })
        console.log(state)

    }


    const handleChange = (e) => {

        if (e.target.type === "file") {

            setState({
                ...state,
                [e.target.name]: e.target.files[0]

            })
        } else if (e.target.type === "select-one") {

            let post_category = []

            state.categories.map((item) => {
                if (item._id == e.target.value) {
                    post_category.push(item)
                }
            })

            setState({
                ...state,
                post_category: post_category
            })
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleCkEditorChange = (event, editor) => {

        const data = editor.getData();

        setState({
            ...state,
            post_content: data
        })

    }

    const handleNewCategoryClick = () => {
        setState({
            ...state,
            category_modal_visibility: true
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_form_submitting: true
        })

        let formData = new FormData()


        await formData.append('file', state.post_photo)
        await formData.append('data', JSON.stringify(state.post))


        let submitResponse
        if (props.post_id) {
            submitResponse = await api.put('/post/update/' + props.post_id, formData, { headers: { 'content-type': 'multipart/form-data' } })

            setState({
                ...state,
                is_form_submitting: false
            })
        } else {
            submitResponse = await api.post('/post/new', formData, { headers: { 'content-type': 'multipart/form-data' } })
            resetState()
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı',
                text: 'Yazı kaydedildi',
                icon: 'success'
            })
            resetState()
        } else {
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
            setState({
                ...state,
                is_form_submitting: false
            })
        }






    }

    // render card loader
    let cardLoaderHtml = ''
    if (state.is_form_submitting) {
        cardLoaderHtml = <CardLoader />
    } else {
        cardLoaderHtml = ''
    }



    // render profile photo
    let postPhotoHtml = ''
    if (state.post_photo) {
        postPhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT + "/file/" + state.post_photo} />
    }

    // render category modal
    let categoryModalHtml = ''
    if (state.category_modal_visibility) {
        categoryModalHtml = <ModalCategory />
    }


    // render categories
    let categoriesHtml = ''
    if (state.is_categories_loaded) {
        categoriesHtml = state.categories.map((item) => {
            return <option value={item._id}>{item.category_name}</option>
        })
    } else {
        categoriesHtml = <option value="">Yükleniyor...</option>
    }

    // render category modal
    let ckeditorHtml = ''
    if (!state.is_form_submitting) {
        ckeditorHtml = (
            <CKEditor
                editor={ClassicEditor}
                data={state.post_content}
                onReady={editor => {

                    console.log('Editor is ready to use!', editor);
                }}
                onChange={handleCkEditorChange}
                config={{
                    ckfinder: { uploadUrl: process.env.REACT_APP_API_ENDPOINT + "/file/upload" }
                }}
            />
        )
    }



    console.log(state);
    return (
        <div class="card">
            {categoryModalHtml}
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
                            <label for="post_category">Kategorisi (*)
                                <button className="btn btn-primary btn-sm float-right" type="button" onClick={handleNewCategoryClick}>Yeni Kategori Ekle</button>
                            </label>
                            <select name="post_category" className="form-control" onChange={handleChange}>
                                {categoriesHtml}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="post_content">Yazı (*)</label>
                            {ckeditorHtml}
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