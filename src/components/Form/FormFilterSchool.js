import React, {useState} from 'react'


const FormFilterSchool = (props) => {

    const [state, setState] = useState({
        school_name: ''
        
    })

    const resetState = () => {
        setState({
            school_name: '',
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
                <label for="school_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.school_name} name="school_name" id="school_name" placeholder="Okul adı giriniz" />
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn btn-sm">Ara</button>
                <a href="#" className="btn btn-sm btn-secondary" onClick={resetState}>TEMİZLE</a>
            </div>
        </form>
    )
}

export default FormFilterSchool