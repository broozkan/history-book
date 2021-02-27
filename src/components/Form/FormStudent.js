import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import { fixdate } from '../../services/fixdate'
import { Component } from 'react'

class FormStudent extends Component {

    constructor() {
        super()

        this.state = {
            student_school: '',
            student_name: '',
            student_surname: '',
            student_father_name: '',
            student_photo: '',
            student_gender: '',
            student_birthday: '',
            student_nationality: '',
            student_school_number: '',
            student_education_beginning_year: '',
            student_education_ending_year: '',
            student_middle_school_graduation_result: '',
            student_high_school_graduation_exam: '',
            student_high_school_graduation_result: '',
            is_form_submitting: false,
            schools: [],
            is_schools_loaded: false
        }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getStudent = this.getStudent.bind(this)
        this.resetState = this.resetState.bind(this)
        this.getSchools = this.getSchools.bind(this)
    }


    componentDidMount() {
        if (this.props.student_id) {
            this.getStudent()
        }
        this.getSchools()
    }


    getStudent = async () => {
      

        const student = await api.get('/student/get/' + this.props.student_id, {})

        student.data.student_birthday = fixdate(student.data.student_birthday)

        this.setState(student.data)

    }


    getSchools = async () => {
        const schools = await api.get('/school/list/1')

        this.setState({
            schools: schools.data.docs,
            is_schools_loaded: true
        })
    }

    resetState = () => {
        this.setState({
            student_name: '',
            student_surname: '',
            student_father_name: '',
            student_photo: '',
            student_gender: '',
            student_birthday: '',
            student_nationality: '',
            student_school_number: '',
            student_education_beginning_year: '',
            student_education_ending_year: '',
            student_middle_school_graduation_result: '',
            student_high_school_graduation_exam: '',
            student_high_school_graduation_result: '',
        })
    }


    handleChange = (e) => {
        if (e.target.type === "file") {
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        } else if (e.target.type === "select-one") {

            if (e.target.name == "student_school") {
                let studentSchoolArray = new Array()

                this.state.schools.map((item) => {
                    if (e.target.value == item._id) {
                        studentSchoolArray.push(item)
                    }
                })

                this.setState({
                    student_school: studentSchoolArray
                })

            }else{
                this.setState({
                    [e.target.name]: e.target.value
                })
            }

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


        await formData.append('file', this.state.student_photo)
        await formData.append('data', JSON.stringify(this.state))


        let submitResponse
        if (this.props.student_id) {
            submitResponse = await api.put('/student/update/' + this.props.student_id, formData, { headers: { 'content-type': 'multipart/form-data' } })

            this.setState({
                is_form_submitting: false
            })
        } else {
            submitResponse = await api.post('/student/new', formData, { headers: { 'content-type': 'multipart/form-data' } })
            this.resetState()
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı',
                text: 'Öğrenci kaydedildi',
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })

        }




    }

    render() {


        // render schools 
        let schoolOptionsHtml = ''
        let schoolOptionValue = ''
        if (this.state.is_schools_loaded) {
            schoolOptionsHtml = this.state.schools.map((item) => {
                return (
                    <option value={item._id}>{item.school_name}</option>
                )
            })
            if (this.state.student_school.length > 0) {
                schoolOptionValue = this.state.student_school[0]._id
            }
        }

        // render card loader
        let cardLoaderHtml = ''
        if (this.state.is_form_submitting) {
            cardLoaderHtml = <CardLoader />
        } else {
            cardLoaderHtml = ''
        }


        // render profile photo
        let studentPhotoHtml = ''
        if (this.state.student_photo) {
            studentPhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT + "/file/" + this.state.student_photo} />
        }


        return (
            <div class="card">
                {cardLoaderHtml}
                <div class="card-header">
                    <span class="h4">Öğrenci Formu</span>
                    <p class="text-muted">Yeni öğrenci ekleyebilir veya mevcut öğrencilerinizi düzenleyebilirsiniz.</p>
                </div>
                <div class="card-body">
                    <form id="form1" class="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div class="h5 mb-4">Kişisel Bilgileri</div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                {studentPhotoHtml}
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_school">Okulu (*)</label>
                                <select className="form-control" onChange={this.handleChange} required value={schoolOptionValue} name="student_school">
                                    <option selected disabled value="">Okul Seçiniz</option>
                                    {schoolOptionsHtml}
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_name">Adı (*)</label>
                                <input type="text" class="form-control" value={this.state.student_name} onChange={this.handleChange} name="student_name" id="student_name" placeholder="Öğrenci adını giriniz" required="" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="student_surname">Soyadı (*)</label>
                                <input type="text" class="form-control" value={this.state.student_surname} onChange={this.handleChange} name="student_surname" id="student_surname" placeholder="Öğrenci soyadını giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_father_name">Baba Adı (*)</label>
                                <input type="text" class="form-control" value={this.state.student_father_name} onChange={this.handleChange} name="student_father_name" id="student_father_name" placeholder="Öğrenci baba adını giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_photo">Fotoğrafı (*)</label>
                                <input type="file" class="form-control" onChange={this.handleChange} name="student_photo" id="student_photo" placeholder="Öğrenci fotoğrafını giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_gender">Cinsiyeti (*)</label>
                                <select className="form-control" value={this.state.student_gender} onChange={this.handleChange} name="student_gender" id="student_gender" required >
                                    <option value="" disabled selected>Cinsiyet Seçiniz</option>
                                    <option value="male">Erkek</option>
                                    <option value="female">Kadın</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_birthday">Doğum Tarihi (*)</label>
                                <input type="date" class="form-control" value={this.state.student_birthday} onChange={this.handleChange} name="student_birthday" id="student_birthday" placeholder="Öğrenci doğum tarihini giriniz" required="" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="student_nationality">Uyruğu (*)</label>
                                <select className="form-control" value={this.state.student_nationality} onChange={this.handleChange} name="student_nationality" id="student_nationality" required>
                                    <option value="" disabled selected>Uyruk Seçiniz</option>
                                    <option value="turkish">Türk</option>
                                </select>
                            </div>
                        </div>
                        <div class="h5 mb-4">Okul Bilgileri</div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_school_number">Okul Numarası (*)</label>
                                <input type="text" class="form-control" value={this.state.student_school_number} onChange={this.handleChange} name="student_school_number" id="student_school_number" placeholder="Öğrenci okul numarasını giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_middle_school_graduation_result">Ortaokul Mezuniyet Sonucu (*)</label>
                                <input type="text" class="form-control" value={this.state.student_middle_school_graduation_result} onChange={this.handleChange} name="student_middle_school_graduation_result" id="student_middle_school_graduation_result" placeholder="Öğrenci lise mezuniyet sonucunu giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_education_beginning_year">Öğretim Dönemi Başlangıç Yılı (*)</label>
                                <input type="text" class="form-control" value={this.state.student_education_beginning_year} onChange={this.handleChange} name="student_education_beginning_year" id="student_education_beginning_year" placeholder="Öğrenci lise mezuniyet tarihini giriniz" required="" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="student_education_ending_year">Öğretim Dönemi Bitiş Yılı (*)</label>
                                <input type="text" class="form-control" value={this.state.student_education_ending_year} onChange={this.handleChange} name="student_education_ending_year" id="student_education_ending_year" placeholder="Öğrenci lise mezuniyet tarihini giriniz" required="" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="student_high_school_graduation_exam">Lise Mezuniyet İmtihanı (*)</label>
                                <input type="text" class="form-control" value={this.state.student_high_school_graduation_exam} onChange={this.handleChange} name="student_high_school_graduation_exam" id="student_high_school_graduation_exam" placeholder="Öğrenci lise mezuniyet tarihini giriniz" required="" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="student_high_school_graduation_result">Lise Mezuniyet Sonucu (*)</label>
                                <input type="text" class="form-control" value={this.state.student_high_school_graduation_result} onChange={this.handleChange} name="student_high_school_graduation_result" id="student_high_school_graduation_result" placeholder="Öğrenci lise mezuniyet sonucunu giriniz" required="" />
                            </div>
                        </div>
                        <button type="submit" class="btn m-t-30 mt-3">Kaydet</button>
                        <a href="/admin/student/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                    </form>
                </div>
            </div>
        )
    }

}

export default FormStudent