import React, {useState} from 'react'


const FormFilterStudent = (props) => {

    const [state, setState] = useState({
        student_name: '',
        student_gender: ''
        
    })

    const resetState = () => {
        setState({
            student_name: '',
            student_gender: '' 
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

        props.onSubmit(props.pagination_info.page, state)
    }

    
    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="student_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.student_name} name="student_name" id="student_name" placeholder="Personel adı giriniz" />
            </div>
            <div className="form-group ml-3">
                <label for="student_gender">Cinsiyeti</label>
                <select className="form-control" onChange={handleChange} value={state.student_gender} name="student_gender" id="student_gender">
                    <option value="">Farketmez</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                </select>
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn btn-sm">Ara</button>
                <a href="#" className="btn btn-sm btn-secondary" onClick={resetState}>TEMİZLE</a>
            </div>
        </form>
    )
}

export default FormFilterStudent