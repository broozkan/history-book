import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FormFilterStaff from '../Form/FormFilterStaff'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableStaffs = () => {

    const [state, setState] = useState({
        staffs: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_staffs_loaded: false
    })


    useEffect(() => {
        getStaffs()
    }, [])


    const getStaffs = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_staffs_loaded: false
        })


        const staffs = await api.get('/staff/list/' + page, { params: filters })

        setState({
            ...state,
            staffs: staffs.data.docs,
            pagination_info: staffs.data,
            is_staffs_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/staff/delete/'+e.target.dataset.id)

        console.log(submitResponse);

    }



    let loaderHtml = ''
    if (!state.is_staffs_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_staffs_loaded) {
        tableContentHtml = state.staffs.map((item, index) => {

            return (
                <tr>
                    <td>{item.staff_name} {item.staff_surname}</td>
                    <td>{item.staff_branch}</td>
                    <td>{item.staff_duty}</td>
                    <td>
                        <a href={"/admin/staff/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterStaff onSubmit={getStaffs} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Personel Listesi
                    <a href="/admin/excel/import/staff" className="btn btn-outline btn-dark btn-sm float-right ml-2">
                        <span className="fa fa-file-excel"></span> EXCEL'DEN AKTAR
                    </a>
                    <a href="/admin/staff/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ PERSONEL EKLE
                    </a>
                </span>
                <p class="text-muted">Sistemdeki tüm personellerin listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
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
                                <th scope="col">Branşı</th>
                                <th scope="col">Görevi</th>
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
                <Pagination object={state.pagination_info} onClick={getStaffs} />

            </div>

        </div>

    )
}

export default TableStaffs