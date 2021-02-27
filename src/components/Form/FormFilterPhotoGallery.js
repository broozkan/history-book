import React, {useState} from 'react'


const FormFilterPhotoGallery = (props) => {

    const [state, setState] = useState({
        photo_gallery_name: ''
        
    })

    const resetState = () => {
        setState({
            photo_gallery_name: '',
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
                <label for="photo_gallery_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.photo_gallery_name} name="photo_gallery_name" id="photo_gallery_name" placeholder="Galeri adı giriniz" />
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn btn-sm">Ara</button>
                <a href="#" className="btn btn-sm btn-secondary" onClick={resetState}>TEMİZLE</a>
            </div>
        </form>
    )
}

export default FormFilterPhotoGallery