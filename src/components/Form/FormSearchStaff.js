import React, { useContext, useEffect, useState } from 'react'
import { ArchiveContextWrapper, ArchiveContext } from '../../contexts/ArchiveContext'
import BookLoader from '../Loader/BookLoader'
import api from '../../services/api'
import { useHistory } from "react-router-dom"

const FormSearchStaff = () => {

    const [state, setState] = useState({
        is_search_detailed: false,
        is_loading: false,
        staff_name: '',
        staff_surname: '',
        staff_father_name: '',
        staff_gender: '',
        staff_birthday: '',
        staff_nationality: '',
        staff_duty: '',
        staff_branch: '',
        staff_duty_beginning_date: '',
        staff_duty_ending_date: ''
    })


    const archiveContext = useContext(ArchiveContext)
    let history = useHistory();

    useEffect(()=>{
        archiveContext.updateState('object','staff', () => {})
    },[])

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_loading: true
        })


        const filters = {
            staff_name: state.staff_name,
            staff_surname: state.staff_surname,
            staff_father_name: state.staff_father_name,
            staff_gender: state.staff_gender,
            staff_birthday: state.staff_birthday,
            staff_nationality: state.staff_nationality,
            staff_duty: state.staff_duty,
            staff_branch: state.staff_branch,
            staff_duty_beginning_date: state.staff_duty_beginning_date,
            staff_duty_ending_date: state.staff_duty_ending_date
        }

        const staffs = await  api.get('/staff/list/1', { params: filters, headers: {'site-token': localStorage.getItem('site-token')} })


        console.log(staffs);
        await archiveContext.updateState("search_results", staffs.data.docs, (res) => {
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
        detailSearchButtonHtml = <a href="#" onClick={handleDetailSearchClick} className="mb-2">Dilerseniz aramanızı detaylandıralım <span className="fa fa-chevron-up"></span> </a>
        detailSearchVisibilityClass = 'opened';
    } else {
        detailSearchButtonHtml = <a href="#" onClick={handleDetailSearchClick} className="mb-2">Dilerseniz aramanızı detaylandıralım <span className="fa fa-chevron-down"></span> </a>

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
                <div className="col-lg-8">
                    <form className="form-search-staff" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6 pl-0">
                                <input className="form-control  " name="staff_name" onChange={handleOnChange} value={state.staff_name} id="staff_name" placeholder="Personel adı giriniz" />
                            </div>
                            <div className="form-group col-md-6 ">
                                <input className="form-control " name="staff_surname" onChange={handleOnChange} value={state.staff_surname} id="staff_surname" placeholder="Personel soyadı giriniz" />
                            </div>
                            {detailSearchButtonHtml}
                        </div>
                        <div className={"row search-detail-container " + detailSearchVisibilityClass}>
                            <div className="col-md-6">
                                <h4>
                                    Kişisel Bilgiler {archiveContext.state.staff_form_params}
                                    <h6 class="card-subtitle text-muted">üzerinden detaylandıralım veya</h6>
                                </h4>

                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <input className="form-control " name="staff_father_name" onChange={handleOnChange} value={state.staff_father_name} id="staff_father_name" placeholder="Baba adı giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group d-inline-flex">
                                        <label class="custom-control custom-radio">
                                            <input name="staff_gender" value="male" checked={state.staff_gender === "male"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Erkek</span>
                                        </label>
                                        <label class="custom-control custom-radio ml-2">
                                            <input name="staff_gender" value="female" checked={state.staff_gender === "female"} type="radio" onChange={handleOnChange} class="custom-control-input" />
                                            <span class="custom-control-label">Kadın</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <input className="form-control" type="text" name="staff_birthday" onChange={handleOnChange} value={state.staff_birthday} id="staff_birthday" placeholder="Doğum tarihi giriniz" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <select className="form-control" name="staff_country" value={state.staff_country} onChange={handleOnChange}>
                                            <option value="" disabled selected>Doğum Yeri Seçiniz</option>
                                            <option value="sivas">Sivas</option>
                                            <option value="ankara">Ankara</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <select className="form-control" name="staff_nationality" value={state.staff_nationality} onChange={handleOnChange}>
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
                                    <div className="form-group col-md-8 pl-0">
                                        <select className="form-control" name="staff_branch" value={state.staff_branch} onChange={handleOnChange}>
                                            <option value="" disabled selected>Branş Seçiniz</option>
                                            <option value="*">Farketmez</option>
                                            <option value="chemistry_teacher">Kimya Öğrt.</option>
                                            <option value="math_teacher">Matematik Öğrt.</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8 pl-0">
                                        <select className="form-control" name="staff_duty" value={state.staff_duty} onChange={handleOnChange}>
                                            <option value="" disabled selected>Görev Seçiniz</option>
                                            <option value="*">Farketmez</option>
                                            <option value="principal">Okul Müdürü</option>
                                            <option value="vice_principal">Müdür Yardımcısı</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label className="pr-2">Görev Süresi Tarih Aralığı </label>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " name="staff_duty_beginning_date" value={state.staff_duty_beginning_date} onChange={handleOnChange} id="staff_duty_beginning_date" placeholder="Başlangıç tarihi giriniz" />
                                    </div>
                                    <div className="form-group col-md-6 pl-0">
                                        <input className="form-control " name="staff_duty_ending_date" value={state.staff_duty_ending_date} onChange={handleOnChange} id="staff_duty_ending_date" placeholder="Bitiş tarihi giriniz" />
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
            </div>
        </>
    )
}

export default FormSearchStaff