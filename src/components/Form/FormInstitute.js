import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import ModalCategory from '../Modal/ModalNewCategory'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component } from 'react'


class FormInstitute extends Component {

    constructor() {
        super()

        this.state = {
            institute_name: '',
            institute_photo: '',
            is_form_submitting: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getInstitute = this.getInstitute.bind(this)
    }


    resetState = () => {
        this.setState({
            institute_name: '',
            institute_photo: '',
            is_form_submitting: false,
        })
    }

    componentDidMount() {
        if (this.props.institute_id) {
            this.getInstitute()
        }
    }


    getInstitute = async (callback) => {

        const institute = await api.get('/institute/get/' + this.props.institute_id, {})
            .then(async (result) => {
                return result.data
            })
        this.setState(institute)
    }




    handleChange = (e) => {

        if (e.target.type === "file") {

            this.setState({
                [e.target.name]: e.target.files[0]

            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }



    handleSubmit = async (e) => {
        e.preventDefault()

        this.setState({
            is_form_submitting: true
        })

        let formData = new FormData()


        await formData.append('file', this.state.institute_photo)
        await formData.append('data', JSON.stringify(this.state))


        let submitResponse
        if (this.props.institute_id) {
            submitResponse = await api.put('/institute/update/' + this.props.institute_id, formData, { headers: { 'content-type': 'multipart/form-data' } })

            this.setState({
                is_form_submitting: false
            })
        } else {
            submitResponse = await api.post('/institute/new', formData, { headers: { 'content-type': 'multipart/form-data' } })

        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı',
                text: 'Dernek kaydedildi',
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
        let institutePhotoHtml = ''
        if (this.state.institute_photo) {
            institutePhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT + "/file/" + this.state.institute_photo} />
        }







        return (
            <div class="card">
                {cardLoaderHtml}
                <div class="card-header">
                    <span class="h4">Dernek Formu</span>
                    <p class="text-muted">Yeni dernek ekleyin</p>
                </div>
                <div class="card-body">
                    <form id="form1" class="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div class="h5 mb-4">Dernek Bilgileri</div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                {institutePhotoHtml}
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="institute_name">Adı (*)</label>
                                <input type="text" class="form-control" value={this.state.institute_name} onChange={this.handleChange} name="institute_name" id="institute_name" placeholder="Dernek adını giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="institute_photo">Kapak Fotoğrafı (*)</label>
                                <input type="file" class="form-control" onChange={this.handleChange} name="institute_photo" id="institute_photo" placeholder="Dernek fotoğrafı giriniz" required="" />

                            </div>
                        </div>
                        <button type="submit" class="btn m-t-30 mt-3">Kaydet</button>
                        <a href="/admin/institute/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                    </form>
                </div>
            </div>
        )
    }


}

export default FormInstitute