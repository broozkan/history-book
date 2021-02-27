import React, { useState } from 'react'
import { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'

class FormPhotoGallery extends Component {

    constructor() {
        super()

        this.state = {
            photo_gallery_name: '',
            photo_gallery_category: [],
            photo_gallery_photos: [],
            photo_gallery_photo_names: [],
            categories: [],
            is_categories_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCategories = this.getCategories.bind(this)
    }


    componentDidMount = () => {
        this.getCategories()
        if (this.props.photo_gallery_id) {
            this.getPhotoGallery()
        }
    }


    getPhotoGallery = async () => {

        const photoGallery = await api.get('/photo-gallery/get/' + this.props.photo_gallery_id)
        console.log(photoGallery);
        this.setState({
            photo_gallery_name: photoGallery.data.photo_gallery_name,
            photo_gallery_category: photoGallery.data.photo_gallery_name,
            photo_gallery_photos: photoGallery.data.photo_gallery_photos
        })
    }


    getCategories = async () => {

        const categories = await api.get('/category/list/1')

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }

    handleOnChange = (e) => {

        if (e.target.type === "file") {

            let photo_gallery_photos = new Array()
            let photo_gallery_photo_names = new Array()

            console.log(e.target.files.length);

            for (let index = 0; index < e.target.files.length; index++) {
                photo_gallery_photos.push(e.target.files[index])
                photo_gallery_photo_names.push({
                    photo_gallery_photo_name: e.target.files[index].name
                })
            }

            this.setState({

                photo_gallery_photos: photo_gallery_photos,
                photo_gallery_photo_names: photo_gallery_photo_names
            })

        } else if (e.target.type === "select-one") {
            let photoGalleryCategory = new Array()

            this.state.categories.map((item) => {
                if (e.target.value == item._id) {
                    photoGalleryCategory.push(item)
                }
            })

            this.setState({
                photo_gallery_category: photoGalleryCategory
            })


        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        console.log(this.state);
    }


    handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData()

        for (let index = 0; index < this.state.photo_gallery_photos.length; index++) {
            await formData.append('file', this.state.photo_gallery_photos[index])
        }
        await formData.append('data', JSON.stringify(this.state))


        let submitResponse
        if (this.props.photo_gallery_id) {
            submitResponse = await api.put('/photo-gallery/update/' + this.props.photo_gallery_id, formData, { headers: { 'content-type': 'multipart/form-data' } })

            this.setState({
                is_form_submitting: false
            })
        } else {
            submitResponse = await api.post('/photo-gallery/new', formData, { headers: { 'content-type': 'multipart/form-data' } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: "Başarılı",
                text: "Fotoğraf Galerisi kaydedildi",
                icon: "success"
            })

        } else {
            Swal.fire({
                title: "Başarılı",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }

    }


    render() {


        // render categories
        let value = ''
        let categoriesOptionListHtml = ''
        if (this.state.is_categories_loaded) {
            categoriesOptionListHtml = this.state.categories.map((item) => {
                return (
                    <option value={item._id}>{item.category_name}</option>
                )
            })
            if (this.state.photo_gallery_category[0]) {
                value = this.state.photo_gallery_category[0]._id
            }
        }




        return (
            <div className="card">
                <div className="card-header">
                    <span className="h4">Fotoğraf Galerisi Formu</span>
                    <p className="text-muted">Yeni kategori ekleyebilir veya mevcut kategorilerinizi düzenleyebilirsiniz.</p>
                </div>
                <div className="card-body">
                    <form id="form1" className="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div className="h5 mb-4">Fotoğraf Galerisi Bilgileri</div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="photo_gallery_name">Adı (*)</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} value={this.state.photo_gallery_name} name="photo_gallery_name" id="photo_gallery_name" placeholder="Fotoğraf Galerisi adını giriniz" required="" />
                            </div>

                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="photo_gallery_category">Fotoğraf Galerisi Kategorisi (*)</label>
                                <select className="form-control" onChange={this.handleOnChange} value={value} name="photo_gallery_category" id="photo_gallery_category" required >
                                    {categoriesOptionListHtml}
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="photo_gallery_photos">Fotoğraf Galerisi Fotoğrafları (*) </label>
                                <input type="file" multiple className="form-control" id="photo_gallery_photos" name="photo_gallery_photos" onChange={this.handleOnChange} required />
                            </div>
                        </div>

                        <button type="submit" className="btn m-t-30 mt-3">Kaydet</button>
                        <a href="/admin/photo-gallery/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                    </form>
                </div>
            </div>
        )
    }

}

export default FormPhotoGallery