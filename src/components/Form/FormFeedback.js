import React, { useContext, useState } from 'react'
import { ArchiveContext } from '../../contexts/ArchiveContext'
import SpinLoader from '../Loader/SpinLoader'



const FormFeedback = () => {

    const archiveContext = useContext(ArchiveContext)



    const [state, setState] = useState({
        feedback: '',
        is_form_submitting: false
    })


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(state);

    }


    const handleOnChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })



        if (state.feedback === "") {
            archiveContext.updateState('is_commenting', false, ()=>{})
        }else{
            console.log("sasfsa");
            archiveContext.updateState('is_commenting', true, ()=>{})
        }



    }

    // render submitting
    let submitButtonHtml = ''
    if(state.is_form_submitting){
        submitButtonHtml = <SpinLoader />
    }else{
        submitButtonHtml = "Gönder"
    }


    return(
        <form className="w-75" onSubmit={handleSubmit}>
            <h4 class="card-subtitle text-muted">Beklerken görüş bildirin</h4>

            <div className="d-inline-flex w-100">
            <div className="form-group w-100">
                <input className="form-control" name="feedback" onChange={handleOnChange} value={state.feedback} placeholder="Topluluk kurallarını göz önüne alarak bir yorum yazınız" />
            </div>
            <div className="form-group">
                <button className="btn btn-outline">{submitButtonHtml}</button>
            </div>
            </div>
            
        </form>
    )
}


export default FormFeedback