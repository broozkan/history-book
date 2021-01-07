import React, {useState} from 'react'


const FormFilterStudentComment = (props) => {

    const [state, setState] = useState({
        student_comment_user_name_surname: '',
        student_comment_student_name: '',
        student_comment_verify: ''
        
    })

    const resetState = () => {
        setState({
            student_comment_user_name_surname: '',
            student_comment_student_name: '',
            student_comment_verify: ''
        })
    }

    const handleChange = (e) => {
        
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
        
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const filters = {
            user_name: state.student_comment_user_name_surname,
            student_name: state.student_comment_student_name,
            student_comment_verify: state.student_comment_verify
        }

        props.onSubmit(props.pagination_info.page, filters)
    }

    
    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="student_comment_user_name_surname">Yorum Sahibi Adı</label>
                <input className="form-control" onChange={handleChange} value={state.student_comment_user_name_surname} name="student_comment_user_name_surname" id="student_comment_user_name_surname" placeholder="Yorum sahibi adı giriniz" />
            </div>
            <div className="form-group">
                <label for="student_comment_student_name">Öğrenci Adı</label>
                <input className="form-control" onChange={handleChange} value={state.student_comment_student_name} name="student_comment_student_name" id="student_comment_student_name" placeholder="Yorum sahibi adı giriniz" />
            </div>
            <div className="form-group ml-2">
                <label for="student_comment_verify">Onay Durumu</label>
                <select className="form-control" onChange={handleChange} value={state.student_comment_verify} name="student_comment_verify">
                    <option value="">Tümü</option>
                    <option value="0">Onay Bekleyen</option>
                    <option value="1">Onaylanmış</option>
                </select>
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn btn-sm">Ara</button>
                <a href="#" className="btn btn-sm btn-secondary" onClick={resetState}>TEMİZLE</a>
            </div>
        </form>
    )
}

export default FormFilterStudentComment