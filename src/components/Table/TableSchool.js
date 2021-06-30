import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'
import FormFilterSchool from '../Form/FormFilterSchool'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableSchool = () => {

    const [state, setState] = useState({
        schools: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_schools_loaded: false
    })


    useEffect(() => {
        getSchools()
    }, [])


    const getSchools = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_schools_loaded: false
        })


        const schools = await api.get('/school/list/' + page, { params: filters })

        setState({
            ...state,
            schools: schools.data.docs,
            pagination_info: schools.data,
            is_schools_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = async (e) => {

        const submitResponse = await api.delete('/school/delete/' + e.target.dataset.id)

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı',
                text: 'Okul silindi',
                icon: 'success'
            })
            getSchools()
        } else {
            Swal.fire({
                title: 'Bir sorun oluştu',
                text: '',
                icon: 'error'
            })
        }
    }



    let loaderHtml = ''
    if (!state.is_schools_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_schools_loaded) {
        tableContentHtml = state.schools.map((item, index) => {
            console.log(item);
            return (
                <tr>
                    <td>{item.school_name}</td>
                    <td>
                        <a href={"/admin/school/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterSchool onSubmit={getSchools} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Okul Listesi
                    <a href="/admin/school/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ OKUL EKLE
                    </a>
                </span>
                <p class="text-muted">Sistemdeki tüm okulların listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
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
                                <th scope="col">Adı</th>
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
                <Pagination object={state.pagination_info} onClick={getSchools} />

            </div>

        </div>

    )
}

export default TableSchool