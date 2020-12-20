import React, { useContext, useEffect, useState } from 'react'
import { ArchiveContextWrapper, ArchiveContext } from '../../contexts/ArchiveContext'
import studentCardPhoto from '../../images/student_card.jpg'
import BookLoader from '../Loader/ZoomLoader'

const FormSearchStudent = () => {

    const [state, setState] = useState({
        is_search_detailed: false,
        is_loading: false,
        student_name: '',
        student_surname: '',
        student_father_name: '',
        student_gender: 'male',
        student_birthday: '',
        student_nationality: '',
        student_school_number: '',
        student_middle_school_graduation_beginning_date: '',
        student_middle_school_graduation_ending_date: '',
        student_high_school_graduation_beginning_date: '',
        student_high_school_graduation_ending_date: ''
    })

    
    const archiveContext = useContext(ArchiveContext)
    console.log(archiveContext);


    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    const handleDetailSearchClick = (e) => {
        e.preventDefault()
        setState({
            ...state,
            is_search_detailed: !state.is_search_detailed
        })
    }

    const cancelSearch = () => {
        setState({
            ...state,
            is_loading: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_loading: true
        })


        


    }


    // render detailed search
    let detailSearchButtonHtml = '';
    let detailSearchVisibilityClass = 'closed';
    if (state.is_search_detailed) {
        detailSearchButtonHtml = <a href="#" onClick={handleDetailSearchClick} className="mb-2">Dilerseniz aramanızı detaylandıralım <span className="fa fa-chevron-up"></span> </a>
        detailSearchVisibilityClass = 'opened';
    } else {
        detailSearchButtonHtml = <a href="#" onClick={handleDetailSearchClick} className="mb-2">Dilerseniz aramanızı detaylandıralım <span className="fa fa-chevron-down"></span> </a>

    }


    // render loader
    let loaderHtml = ''
    if (state.is_loading) {
        loaderHtml = <BookLoader state="opened" handleCancelClick={cancelSearch}/>
    } else {
        loaderHtml = <BookLoader state="closed"/>

    }

    



    return (
        <>
            {loaderHtml}
            <div className="row">
                <div className="col-lg-8">
                    <form className="form-search-student" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6 pl-0">
                                <input className="form-control  " name="student_name" onChange={handleOnChange} value={state.student_name} id="student_name" placeholder="Öğrenci adı giriniz" />
                            </div>
                            <div className="form-group col-md-6 ">
                                <input className="form-control " name="student_surname" onChange={handleOnChange} value={state.student_surname} id="student_surname" placeholder="Öğrenci soyadı giriniz" />
                            </div>
                            {detailSearchButtonHtml}
                        </div>
                        <div className={"row search-detail-container " + detailSearchVisibilityClass}>
                            <div className="col-md-6">
                                <h4>
                                    Kişisel Bilgiler {archiveContext.state.student_form_params}
                                    <h6 class="card-subtitle text-muted">üzerinden detaylandıralım veya</h6>
                                </h4>

                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <input className="form-control " name="student_father_name" onChange={handleOnChange} value={state.student_father_name} id="student_father_name" placeholder="Baba adı giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group d-inline-flex">
                                        <label class="custom-control custom-radio">
                                            <input name="student_gender" value="male" checked={state.student_gender === "male"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Erkek</span>
                                        </label>
                                        <label class="custom-control custom-radio ml-2">
                                            <input name="student_gender" value="female" checked={state.student_gender === "female"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Kadın</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <input className="form-control" type="text" name="student_birthday" onChange={handleOnChange} value={state.student_birthday} id="student_birthday" placeholder="Doğum tarihi giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <select className="form-control" name="student_nationality" value={state.student_nationality} onChange={handleOnChange}>
                                            <option value="" disabled selected>Uyruk Seçiniz</option>
                                            <option value="turkish">Türk</option>
                                            <option value="armenia">Ermeni</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    Okul Bilgilerini
                        <h6 class="card-subtitle text-muted">hatırlamaya çalışalım</h6>

                                </h4>
                                <div className="form-row">

                                    <div className="form-group col-md-12 pl-0">
                                        <input className="form-control " name="student_school_number" value={state.student_school_number} onChange={handleOnChange} id="student_school_number" placeholder="Okul numarası giriniz" />
                                    </div>

                                </div>


                                <div className="form-row">
                                    <label>Ortaokul Mezuniyet Tarih Aralığı</label>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " name="student_middle_school_graduation_beginning_date" value={state.student_middle_school_graduation_beginning_date} onChange={handleOnChange} id="student_middle_school_graduation_beginning_date" placeholder="Başlangıç tarihi giriniz" />
                                    </div>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " name="student_middle_school_graduation_ending_date" value={state.student_middle_school_graduation_ending_date} onChange={handleOnChange} id="student_middle_school_graduation_ending_date" placeholder="Bitiş tarihi giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label>Lise Mezuniyet Tarih Aralığı</label>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " name="student_high_school_graduation_beginning_date" value={state.student_high_school_graduation_beginning_date} onChange={handleOnChange} id="student_high_school_graduation_beginning_date" placeholder="Başlangıç tarihi giriniz" />
                                    </div>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " name="student_high_school_graduation_ending_date" value={state.student_high_school_graduation_ending_date} onChange={handleOnChange} id="student_high_school_graduation_ending_date" placeholder="Bitiş tarihi giriniz" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row mt-4">
                            <div className="form-group w-100">
                                <button className="btn btn-primary w-100" type="submit"><span className="fa fa-search"></span></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={studentCardPhoto} className="img-fluid position-relative rounded" />
                            <p className="card-clone" id="student-school-name-card-clone">SİVAS LİSESİ</p>
                            <p className="card-clone" id="student-name-card-clone">{state.student_name}</p>
                            <p className="card-clone" id="student-surname-card-clone">{state.student_surname}</p>
                            <p className="card-clone" id="student-father-name-card-clone">{state.student_father_name}</p>
                            <p className="card-clone" id="student-nationality-card-clone">{state.student_nationality}</p>
                            <p className="card-clone" id="student-birthday-card-clone">{state.student_birthday}</p>
                            <p className="card-clone" id="student-school-number-card-clone">{state.student_school_number}</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <button className="btn btn-sm btn-outline w-100"><span className="fa fa-save"></span> Kartı Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormSearchStudent