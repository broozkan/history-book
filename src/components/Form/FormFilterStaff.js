import React, {useState} from 'react'


const FormFilterStaff = (props) => {

    const [state, setState] = useState({
        staff_name: '',
        staff_gender: ''
        
    })

    const resetState = () => {
        setState({
            staff_name: '',
            staff_gender: '' 
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
                <label for="staff_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.staff_name} name="staff_name" id="staff_name" placeholder="Personel adı giriniz" />
            </div>
            <div className="form-group ml-3">
                <label for="staff_gender">Cinsiyeti</label>
                <select className="form-control" onChange={handleChange} value={state.staff_gender} name="staff_gender" id="staff_gender">
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

export default FormFilterStaff