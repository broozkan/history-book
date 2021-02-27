import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FormFilterCategory from '../Form/FormFilterCategory'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableCategory = () => {

    const [state, setState] = useState({
        categories: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_categories_loaded: false
    })


    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_categories_loaded: false
        })


        const categories = await api.get('/category/list/' + page, { params: filters })

        setState({
            ...state,
            categories: categories.data.docs,
            pagination_info: categories.data,
            is_categories_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/category/delete/'+e.target.dataset.id)

        console.log(submitResponse);

    }



    let loaderHtml = ''
    if (!state.is_categories_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_categories_loaded) {
        tableContentHtml = state.categories.map((item, index) => {
            console.log(item);
            return (
                <tr>
                    <td>{item.category_name}</td>
                    <td>
                        <a href={"/admin/category/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterCategory onSubmit={getCategories} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Kategori Listesi
                    <a href="/admin/category/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ KATEGORİ EKLE
                    </a>
                </span>
                <p class="text-muted">Sistemdeki tüm kategorilerin listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
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
                <Pagination object={state.pagination_info} onClick={getCategories} />

            </div>

        </div>

    )
}

export default TableCategory