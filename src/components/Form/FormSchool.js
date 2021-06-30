import React, { useState } from 'react'
import { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class FormSchool extends Component {

    constructor() {
        super()

        this.state = {
            school_name: '',
            school_building_date: '',
            school_description: '',
            school_photo: '',
            is_form_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleCkEditorChange = this.handleCkEditorChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getSchool = this.getSchool.bind(this)
    }


    componentDidMount = () => {
        if (this.props.school_id) {
            this.getSchool()
        }
    }


    getSchool = async () => {

        const school = await api.get('/school/get/' + this.props.school_id)
        console.log(school);
        this.setState({
            school_name: school.data.school_name,
            school_building_date: school.data.school_building_date,
            school_description: school.data.school_description
        })
    }

    handleCkEditorChange = (event, editor) => {

        const data = editor.getData();

        this.setState({
            school_description: data
        })

    }

    handleOnChange = (e) => {

        if (e.target.type === "file") {
            this.setState({
                [e.target.name]: e.target.files[0]
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

        this.setState({
            is_form_submitting: true
        })

        let formData = new FormData()

        if (this.state.school_photo.name) {
            await formData.append('file', this.state.school_photo)
        }
        await formData.append('data', JSON.stringify(this.state))



        let submitResponse = ''
        if (this.props.school_id) {
            submitResponse = await api.put('/school/update/' + this.props.school_id, formData, { headers: { 'content-type': 'multipart/form-data' } })
        } else {
            submitResponse = await api.post('/school/new', formData, { headers: { 'content-type': 'multipart/form-data' } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: "Başarılı",
                text: "Okul kaydedildi",
                icon: "success"
            })
        } else {
            Swal.fire({
                title: "Başarılı",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }

        this.setState({
            is_form_submitting: false
        })

    }


    render() {


        // render card loader
        let cardLoaderHtml = ''
        if (this.state.is_form_submitting) {
            cardLoaderHtml = <CardLoader />
        } else {
            cardLoaderHtml = ''
        }


        return (
            <div className="card">
                {cardLoaderHtml}
                <div className="card-header">
                    <span className="h4">Okul Formu</span>
                    <p className="text-muted">Yeni kategori ekleyebilir veya mevcut kategorilerinizi düzenleyebilirsiniz.</p>
                </div>
                <div className="card-body">
                    <form id="form1" className="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div className="h5 mb-4">Okul Bilgileri</div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="school_name">Adı (*)</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} value={this.state.school_name} name="school_name" id="school_name" placeholder="Okul adını giriniz" required="" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="school_building_date">Kuruluş Tarihi</label>
                                <input type="date" className="form-control" onChange={this.handleOnChange} value={this.state.school_building_date} name="school_building_date" id="school_building_date" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="school_description">Bilgileri</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.school_description}
                                    onReady={editor => {

                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={this.handleCkEditorChange}
                                    config={{
                                        ckfinder: { uploadUrl: process.env.REACT_APP_API_ENDPOINT + "/file/upload" }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="school_photo">Okul Kapak Fotoğrafı</label>
                                <input type="file" className="form-control" onChange={this.handleOnChange} name="school_photo" id="school_photo" />
                            </div>
                        </div>


                        <button type="submit" className="btn m-t-30 mt-3">Kaydet</button>
                        <a href="/admin/school/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                    </form>
                </div>
            </div>
        )
    }

}

export default FormSchool