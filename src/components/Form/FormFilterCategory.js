import React, {useState} from 'react'


const FormFilterCategory = (props) => {

    const [state, setState] = useState({
        category_name: ''
        
    })

    const resetState = () => {
        setState({
            category_name: '',
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
                <label for="category_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.category_name} name="category_name" id="category_name" placeholder="Kategori adı giriniz" />
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn btn-sm">Ara</button>
                <a href="#" className="btn btn-sm btn-secondary" onClick={resetState}>TEMİZLE</a>
            </div>
        </form>
    )
}

export default FormFilterCategory