import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableInstitutes = () => {

    const [state, setState] = useState({
        institutes: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_institutes_loaded: false
    })


    useEffect(() => {
        getInstitutes()
    }, [])


    const getInstitutes = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_institutes_loaded: false
        })


        const institutes = await api.get('/institute/list/' + page, { params: filters })

        setState({
            ...state,
            institutes: institutes.data.docs,
            pagination_info: institutes.data,
            is_institutes_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/institute/delete/' + e.target.dataset.id)

        console.log(submitResponse);

    }



    let loaderHtml = ''
    if (!state.is_institutes_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_institutes_loaded) {
        tableContentHtml = state.institutes.map((item, index) => {
            console.log(item);
            return (
                <tr>
                    <td>{item.institute_name}</td>
                    <td>
                        <a href={"/admin/institute/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }


    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Dernek Listesi
                    <a href="/admin/institute/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ DERNEK EKLE
                    </a>
                </span>
                <p class="text-muted">Sistemdeki tüm yazıların listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
            </div>
            <div className="card-body">

                <div className="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Dernek</th>
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
                <Pagination object={state.pagination_info} onClick={getInstitutes} />

            </div>

        </div>

    )
}

export default TableInstitutes