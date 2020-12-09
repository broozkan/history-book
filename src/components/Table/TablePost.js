import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FormFilterPost from '../Form/FormFilterPost'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TablePosts = () => {

    const [state, setState] = useState({
        posts: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_posts_loaded: false
    })


    useEffect(() => {
        getPosts()
    }, [])


    const getPosts = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_posts_loaded: false
        })


        const posts = await api.get('/post/list/' + page, { params: filters })

        setState({
            ...state,
            posts: posts.data.docs,
            pagination_info: posts.data,
            is_posts_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/post/delete/'+e.target.dataset.id)

        console.log(submitResponse);

    }



    let loaderHtml = ''
    if (!state.is_posts_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_posts_loaded) {
        tableContentHtml = state.posts.map((item, index) => {

            return (
                <tr>
                    <td>{item.post_name} {item.post_surname}</td>
                    <td>{item.post_school_number}</td>
                    <td>{item.post_book_number}</td>
                    <td>
                        <a href={"/admin/post/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterPost onSubmit={getPosts} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Öğrenci Listesi
                    <a href="/admin/post/new" className="btn btn-primary btn-sm float-right">
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
                <Pagination object={state.pagination_info} onClick={getPosts} />

            </div>

        </div>

    )
}

export default TablePosts