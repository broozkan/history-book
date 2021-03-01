import React, { useContext, useEffect, useState } from 'react'
import { ArchiveContextWrapper, ArchiveContext } from '../../contexts/ArchiveContext'
import studentCardPhoto from '../../images/student_card.png'
import api from '../../services/api'
import BookLoader from '../Loader/BookLoader'
import { useHistory } from "react-router-dom"
import FormSaveCard from '../../components/Form/FormSaveCard'
import TableStockSearchs from '../Table/TableStockSearchs'
import TabsSearchCards from '../Tabs/TabsSearchCards'

const FormSearchStudent = () => {

    const [state, setState] = useState({
        is_search_detailed: false,
        is_loading: false,
        student_name: '',
        student_surname: '',
        student_father_name: '',
        student_gender: '',
        student_birthday: '',
        student_nationality: '',
        student_school_number: '',
        student_education_beginning_year: '',
        student_education_ending_year: '',
        student_middle_school_graduation_result: ''
    })


    const archiveContext = useContext(ArchiveContext)
    let history = useHistory();

    useEffect(() => {
        archiveContext.updateState('object', 'student', () => { })
    }, [])

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

    const handleSwapStockSearchClick = (data) => {
        setState({
            ...state,
            student_name: data.stock_search_student_name,
            student_surname: data.stock_search_student_surname,
            student_father_name: data.stock_search_student_father_name,
            student_gender: data.stock_search_student_gender,
            student_birthday: data.stock_search_student_birthday,
            student_nationality: data.stock_search_student_nationality,
            student_school_number: data.stock_search_student_school_number,
            student_education_beginning_year: data.stock_search_student_education_beginning_year,
            student_education_ending_year: data.stock_search_student_education_ending_year,
            is_search_detailed: true
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_loading: true
        })


        const filters = {
            student_name: state.student_name,
            student_surname: state.student_surname,
            student_father_name: state.student_father_name,
            student_gender: state.student_gender,
            student_birthday: state.student_birthday,
            student_nationality: state.student_nationality,
            student_school_number: state.student_school_number,
            student_education_beginning_year: state.student_education_beginning_year,
            student_education_ending_year: state.student_education_ending_year,
            student_middle_school_graduation_result: state.student_middle_school_graduation_result
        }

        const students = await api.get('/student/list/1', { params: filters, headers: {'site-token': localStorage.getItem('site-token')} })



        await archiveContext.updateState("search_results", students.data.docs, (res) => {
            setTimeout(function () {
                setState({
                    ...state,
                    is_loading: false
                })
                history.push('/arsiv/arama-sonuclari')
            }, 3000)

        })


        // setTimeout(function () {
        //     console.log(archiveContext.state)
        //     if (archiveContext.state.is_commenting) {

        //     }else{
        //         setState({
        //             ...state,
        //             is_loading: false
        //         })
        //     }


        // }, 3000)

    }


    // render detailed search
    let detailSearchButtonHtml = '';
    let detailSearchVisibilityClass = 'closed';
    if (state.is_search_detailed) {
        detailSearchButtonHtml = <a href="#" onClick={handleDetailSearchClick} className="mb-2">Vazgeçtim, detay girmeyeceğim <span className="fa fa-chevron-up"></span> </a>
        detailSearchVisibilityClass = 'opened';
    } else {
        detailSearchButtonHtml = <a href="#" onClick={handleDetailSearchClick} className="mb-2">Daha fazla detay görmek istiyorum <span className="fa fa-chevron-down"></span> </a>

    }


    // render loader
    let loaderHtml = ''
    if (state.is_loading) {
        loaderHtml = <BookLoader state="opened" handleCancelClick={cancelSearch} />
    } else {
        loaderHtml = <BookLoader state="closed" />

    }




    return (
        <>
            {loaderHtml}
            <div className="row">
                <div className="col-lg-7">
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
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <input className="form-control " name="student_father_name" onChange={handleOnChange} value={state.student_father_name} id="student_father_name" placeholder="Baba adı giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group d-inline-flex">
                                        <label class="custom-control custom-radio">
                                            <input name="student_gender" value="" checked={state.student_gender === ""} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Farketmez</span>
                                        </label>
                                        <label class="custom-control custom-radio ml-2">
                                            <input name="student_gender" value="E" checked={state.student_gender === "E"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Erkek</span>
                                        </label>
                                        <label class="custom-control custom-radio ml-2">
                                            <input name="student_gender" value="K" checked={state.student_gender === "K"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Kadın</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <input className="form-control" type="number" name="student_birthday" onChange={handleOnChange} value={state.student_birthday} id="student_birthday" placeholder="Doğum yılı giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <select className="form-control" name="student_nationality" value={state.student_nationality} onChange={handleOnChange}>
                                            <option value="" disabled selected>Uyruk Seçiniz</option>
                                            <option value="TÜRK">Türk</option>
                                            <option value="RUM">Rum</option>
                                            <option value="ERMENİ">Ermeni</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-row">

                                    <div className="form-group col-md-12 pl-0">
                                        <input className="form-control " name="student_school_number" value={state.student_school_number} onChange={handleOnChange} id="student_school_number" placeholder="Okul numarası giriniz" />
                                    </div>

                                </div>


                                <div className="form-row">
                                    <label>Lise Mezuniyet Tarih Aralığı</label>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " type="number" name="student_education_beginning_year" value={state.student_education_beginning_year} onChange={handleOnChange} id="student_education_beginning_year" placeholder="Başlangıç yılı giriniz" />
                                    </div>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " type="number" name="student_education_ending_year" value={state.student_education_ending_year} onChange={handleOnChange} id="student_education_ending_year" placeholder="Bitiş yılı giriniz" />
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
                <div className="col-lg-5">
                    <div class="tabs">
                        <TabsSearchCards />
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
                                <FormSaveCard state={state} />
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <TableStockSearchs setStockSearchState={handleSwapStockSearchClick} />
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default FormSearchStudent