import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'

const FormStudentComment = (props) => {

    const [state, setState] = useState({
        student_comment: '',
        student_comment_student: []
    })


    useEffect(() => {
        if (props.student_comment_id) {
            getStudentComment()
        }
    }, [])

    const getStudentComment = async () => {
        setState({
            ...state,
            is_form_submitting: true
        })

        const student = await api.get('/student-comment/get/' + props.student_comment_id, {})


        setState({
            ...state,
            student_comment: student.data.student_comment
        })

    }

    const resetState = () => {
        setState({
            model: 'student',
            student_comment: '',
            student_comment_student: []
        })
    }

    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            student_comment: state.student_comment,
            student_comment_student: [
                props.student
            ]
        }

        if (props.student_comment_id) {
            const submitResponse = await api.put('/student-comment/update/'+props.student_comment_id, data, { headers: { 'site-token': localStorage.getItem('site-token') } })

            if (submitResponse.data.response) {
                Swal.fire({
                    title: 'Başarılı',
                    text: 'Yorum güncellendi',
                    icon: 'success'
                })
                resetState()
            } else {
                Swal.fire({
                    title: 'Hata',
                    text: submitResponse.data.responseData,
                    icon: 'error'
                })

            }

        } else {
            const submitResponse = await api.post('/student-comment/new', data, { headers: { 'site-token': localStorage.getItem('site-token') } })

            if (submitResponse.data.response) {
                Swal.fire({
                    title: 'Başarılı',
                    text: 'Yorumunuz kaydedildi. Onaylandıktan sonra yayınlanacaktır',
                    icon: 'success'
                })
                resetState()
            } else {
                Swal.fire({
                    title: 'Hata',
                    text: submitResponse.data.responseData,
                    icon: 'error'
                })

            }
        }


    }


    return (
        <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group w-50">
                <input className="form-control w-100" onChange={handleChange} value={state.student_comment} name="student_comment" id="student_comment" placeholder="Yorumunuz" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-outline mb-0"><span className="fa fa-paper-plane"></span> Kaydet</button>
            </div>
        </form>
    )
}

export default FormStudentComment