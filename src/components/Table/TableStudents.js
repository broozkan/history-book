import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FormFilterStudent from '../Form/FormFilterStudent'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableStudents = () => {

    const [state, setState] = useState({
        students: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_students_loaded: false
    })


    useEffect(() => {
        getStudents()
    }, [])


    const getStudents = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_students_loaded: false
        })


        const students = await api.get('/student/list/' + page, { params: filters })

        setState({
            ...state,
            students: students.data.docs,
            pagination_info: students.data,
            is_students_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/student/delete/'+e.target.dataset.id)

        console.log(submitResponse);

    }



    let loaderHtml = ''
    if (!state.is_students_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_students_loaded) {
        tableContentHtml = state.students.map((item, index) => {

            return (
                <tr>
                    <td>{item.student_name} {item.student_surname}</td>
                    <td>{item.student_school_number}</td>
                    <td>{item.student_book_number}</td>
                    <td>
                        <a href={"/admin/student/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterStudent onSubmit={getStudents} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Öğrenci Listesi
                    <a href="/admin/student/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ ÖĞRENCİ EKLE
                    </a>
                </span>
                <p class="text-muted">Sistemdeki tüm öğrencilerin listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
            </div>
            <div className="card-body">
                <div className="row table-query-row">
                    <div className="col-lg-12">
                        <div className="query-buttons">
                            <a href="#" className="text-default" onClick={handleFilterClick}><span className="fa fa-filter"></span> Filtrele</a>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="query-form-field">
                            {filterFormHtml}
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Adı Soyadı</th>
                                <th scope="col">Okul Numarası</th>
                                <th scope="col">Sicil Numarası</th>
                                <th scope="col">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContentHtml}
                        </tbody>
                    </table>

                </div>

            </div>
            <div className="card-footer">
                <Pagination object={state.pagination_info} onClick={getStudents} />

            </div>

        </div>

    )
}

export default TableStudents