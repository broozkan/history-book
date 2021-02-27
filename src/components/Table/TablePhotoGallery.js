import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import FormFilterPhotoGallery from '../Form/FormFilterPhotoGallery'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TablePhotoGallery = () => {

    const [state, setState] = useState({
        photo_galleries: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_photo_galleries_loaded: false
    })


    useEffect(() => {
        getPhotoGalleries()
    }, [])


    const getPhotoGalleries = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_photo_galleries_loaded: false
        })


        const photoGalleries = await api.get('/photo-gallery/list/' + page, { params: filters })

        setState({
            ...state,
            photo_galleries: photoGalleries.data.docs,
            pagination_info: photoGalleries.data,
            is_photo_galleries_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/photo-gallery/delete/'+e.target.dataset.id)

        console.log(submitResponse);

    }



    let loaderHtml = ''
    if (!state.is_photo_galleries_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_photo_galleries_loaded) {
        tableContentHtml = state.photo_galleries.map((item, index) => {
            
            return (
                <tr>
                    <td>{item.photo_gallery_name}</td>
                    <td>
                        <a href={"/admin/photo-gallery/update/" + item._id}>Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterPhotoGallery onSubmit={getPhotoGalleries} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Fotoğraf Galerisi Listesi
                    <a href="/admin/photo-gallery/new" className="btn btn-primary btn-sm float-right">
                        <span className="fa fa-plus"></span> YENİ FOTOĞRAF GALERİSİ EKLE
                    </a>
                </span>
                <p class="text-muted">Sistemdeki tüm fotoğraf galerilerinin listesidir. Silme, düzenleme işlemleri yapabilirsiniz</p>
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
                <Pagination object={state.pagination_info} onClick={getPhotoGalleries} />

            </div>

        </div>

    )
}

export default TablePhotoGallery