import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'
import FormFilterStudentComment from '../Form/FormFilterStudentComment'
import CardLoader from '../Loader/CardLoader'
import Pagination from '../Pagination/Pagination'


const TableStudentComments = () => {

    const [state, setState] = useState({
        student_comments: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_student_comments_loaded: false
    })


    useEffect(() => {
        getStudentComments()
    }, [])


    const getStudentComments = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_student_comments_loaded: false
        })

        console.log(filters);
        const student_comments = await api.get('/student-comment/list/' + page, { params: filters })

        setState({
            ...state,
            student_comments: student_comments.data.docs,
            pagination_info: student_comments.data,
            is_student_comments_loaded: true
        })

    }


    const handleFilterClick = () => {
        setState({
            ...state,
            filter_visibility: !state.filter_visibility
        })
    }

    const handleDeleteClick = (e) => {

        const submitResponse = api.delete('/student-comment/delete/'+e.target.dataset.id)

        console.log(submitResponse);

    }

    const handleVerifyComment = async (e) => {
        
        const submitResponse = await api.put('/student-comment/verify-comment/'+e.target.dataset.id)

        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Yorum onaylandı',
                icon: 'success'
            })
        }else{
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })

        }
        getStudentComments()
    }

    const handleUnVerifyComment = async (e) => {
        const submitResponse = await api.put('/student-comment/unverify-comment/'+e.target.dataset.id)

        if(submitResponse.data.response){
            Swal.fire({
                title: 'Başarılı',
                text: 'Yorum onayı kaldırıldı',
                icon: 'success'
            })
        }else{
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })

        }

        getStudentComments()

    }



    let loaderHtml = ''
    if (!state.is_student_comments_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_student_comments_loaded) {
        tableContentHtml = state.student_comments.map((item, index) => {
            let commentVerifyHtml = ''
            if(item.student_comment_verify){
                commentVerifyHtml = <span className="fa fa-check"></span>
            }else{
                commentVerifyHtml = <span className="fa fa-times"></span>
            }

            let commentVerifyStatusHtml = ''
            if (item.student_comment_verify) {
                commentVerifyStatusHtml = <a href="#" data-id={item._id} onClick={handleUnVerifyComment}>Onayı Kaldır</a>
            }else{
                commentVerifyStatusHtml = <a href="#" data-id={item._id} onClick={handleVerifyComment}>Onayla</a>
            }
            return (
                <tr>
                    <td>{item.student_comment_user[0].user_name}</td>
                    <td>{item.student_comment_student[0].student_name} {item.student_comment_student[0].student_surname}</td>
                    <td>{item.student_comment}</td>
                    <td>{commentVerifyHtml}</td>
                    <td>
                        {commentVerifyStatusHtml}
                        <a href={"/admin/student-comment/update/" + item._id} className="ml-2">Düzenle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    // render filter form
    let filterFormHtml = ''
    if (state.filter_visibility) {
        filterFormHtml = <FormFilterStudentComment onSubmit={getStudentComments} pagination_info={state.pagination_info} />
    }
    console.log(state);
    return (
        <div className="card">
            <div className="card-header">
                {loaderHtml}
                <span class="h4">
                    Öğrenci Yorumları Listesi
                </span>
                <p class="text-muted">Sistemdeki tüm öğrenci yorumları listesidir. Silme, onaylama, düzenleme işlemleri yapabilirsiniz</p>
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
                                <th scope="col">Yorum Sahibi Adı Soyadı</th>
                                <th scope="col">Yorum Yapılan Öğrenci</th>
                                <th scope="col">Yorum</th>
                                <th scope="col">Onay Durumu</th>
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
                <Pagination object={state.pagination_info} onClick={getStudentComments} />

            </div>

        </div>

    )
}

export default TableStudentComments