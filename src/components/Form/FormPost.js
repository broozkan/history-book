import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import ModalCategory from '../Modal/ModalNewCategory'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component } from 'react'


class FormPost extends Component {

    constructor() {
        super()

        this.state = {
            post_title: '',
            post_alternative_title: '',
            post_photo: '',
            post_category: [],
            post_content: '',
            categories: [],
            post_content: '',
            is_categories_loaded: false,
            is_form_submitting: false,
            is_post_open_open_for_comment: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
        this.handleCkEditorChange = this.handleCkEditorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCategories = this.getCategories.bind(this)
        this.getPost = this.getPost.bind(this)
    }


    resetState = () => {
        this.setState({
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

    componentDidMount() {
        if (this.props.post_id) {
            this.getPost()
        }
        this.getCategories()

    }


    getPost = async (callback) => {


        const post = await api.get('/post/get/' + this.props.post_id, {})
            .then(async (result) => {

                return result.data

            })


        this.setState(post)



    }


    getCategories = async () => {

        const categories = await api.get('/category/list/1', {})
            .then((result) => {

                this.setState({
                    categories: result.data.docs,
                    is_categories_loaded: true
                })
            })


    }


    handleChange = (e) => {

        if (e.target.type === "file") {

            this.setState({
                [e.target.name]: e.target.files[0]

            })
        } else if (e.target.type === "select-one") {

            let post_category = new Array()

            this.state.categories.map((item) => {
                if (item._id == e.target.value) {
                    post_category.push(item)
                }
            })

            this.setState({
                post_category: post_category
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleCkEditorChange = (event, editor) => {

        const data = editor.getData();

        this.setState({
            post_content: data
        })

    }

    handleNewCategoryClick = () => {
        this.setState({
            category_modal_visibility: true
        })
    }


    handleSubmit = async (e) => {
        e.preventDefault()

        this.setState({
            is_form_submitting: true
        })

        let formData = new FormData()


        await formData.append('file', this.state.post_photo)
        await formData.append('data', JSON.stringify(this.state))


        let submitResponse
        if (this.props.post_id) {
            submitResponse = await api.put('/post/update/' + this.props.post_id, formData, { headers: { 'content-type': 'multipart/form-data' } })

            this.setState({
                is_form_submitting: false
            })
        } else {
            submitResponse = await api.post('/post/new', formData, { headers: { 'content-type': 'multipart/form-data' } })

        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı',
                text: 'Yazı kaydedildi',
                icon: 'success'
            })
            this.resetState()
        } else {
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
            this.setState({
                is_form_submitting: false
            })
        }






    }


    render() {

        console.log(this.state);

        // render card loader
        let cardLoaderHtml = ''
        if (this.state.is_form_submitting) {
            cardLoaderHtml = <CardLoader />
        } else {
            cardLoaderHtml = ''
        }



        // render profile photo
        let postPhotoHtml = ''
        if (this.state.post_photo) {
            postPhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT + "/file/" + this.state.post_photo} />
        }

        // render category modal
        let categoryModalHtml = ''
        if (this.state.category_modal_visibility) {
            categoryModalHtml = <ModalCategory />
        }


        // render categories
        let categoriesHtml = ''
        let categoryValue = ''
        if (this.state.is_categories_loaded) {
            categoriesHtml = this.state.categories.map((item) => {
                return <option value={item._id}>{item.category_name}</option>
            })
            if (this.state.post_category.length > 0) {
                categoryValue = this.state.post_category[0]._id
            }
        } else {
            categoriesHtml = <option value="">Yükleniyor...</option>
        }

        // render category modal
        let ckeditorHtml = ''
        if (!this.state.is_form_submitting) {
            ckeditorHtml = (
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.post_content}
                    onReady={editor => {

                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={this.handleCkEditorChange}
                    config={{
                        ckfinder: { uploadUrl: process.env.REACT_APP_API_ENDPOINT + "/file/upload" }
                    }}
                />
            )
        }




        return (
            <div class="card">
                {categoryModalHtml}
                {cardLoaderHtml}
                <div class="card-header">
                    <span class="h4">Yazı Formu</span>
                    <p class="text-muted">Bir blog yazısı paylaşın</p>
                </div>
                <div class="card-body">
                    <form id="form1" class="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div class="h5 mb-4">Yazı Bilgileri</div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                {postPhotoHtml}
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="post_title">Başlığı (*)</label>
                                <input type="text" class="form-control" value={this.state.post_title} onChange={this.handleChange} name="post_title" id="post_title" placeholder="Yazı başlığını giriniz" required="" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="post_alternative_title">Alt Başlığı (*)</label>
                                <input type="text" class="form-control" value={this.state.post_alternative_title} onChange={this.handleChange} name="post_alternative_title" id="post_alternative_title" placeholder="Yazı alt başlığını giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="post_photo">Kapak Fotoğrafı (*)</label>
                                <input type="file" class="form-control" onChange={this.handleChange} name="post_photo" id="post_photo" placeholder="Yazı fotoğrafı giriniz" required="" />

                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="post_category">Kategorisi (*)
                                    <button className="btn btn-primary btn-sm float-right" type="button" onClick={this.handleNewCategoryClick}>Yeni Kategori Ekle</button>
                                </label>
                                <select name="post_category" className="form-control" value={categoryValue} onChange={this.handleChange}>
                                    <option selected disabled value="">Kategori Seçiniz</option>
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


}

export default FormPost