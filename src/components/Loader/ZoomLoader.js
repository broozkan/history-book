import React from 'react'
import zoomLoaderGif from '../../images/zoom-loader.gif'
import gearLoaderGif from '../../images/gear-loader.gif'
import FormFeedback from '../Form/FormFeedback'
import SpinLoader from './SpinLoader'

const BookLoader = (props) => {

    return(
        <div className={"zoom-loader-container "+props.state}>
            <button className="btn btn-primary btn-cancel-search" onClick={props.handleCancelClick}><span className="fa fa-3x fa-times"></span></button>
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center" style={{height:"80px"}}>
                    <img src={zoomLoaderGif} className="img-fluid"/>
                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <h2 className="text-black">Burada bekleyin. Araştırma yapıp geliyoruz.</h2>
                </div>
       
                <div className="col-lg-12 d-flex justify-content-center">
                    <FormFeedback />
                </div>
            </div>
         
        </div>
    )
}

export default BookLoader