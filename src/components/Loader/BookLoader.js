import React, { useContext, useState } from 'react'
import { ArchiveContext } from '../../contexts/ArchiveContext'
import bookLoaderGif from '../../images/book-loader.gif'
import FormFeedback from '../Form/FormFeedback'

const BookLoader = (props) => {


    return (
        <div className={"book-loader-container " + props.state}>
            <button className="btn btn-primary btn-cancel-search" onClick={props.handleCancelClick}><span className="fa fa-3x fa-times"></span></button>
            <div className="row  mt-5"> 
                <div className="col-lg-12 text-center">
                <img src={bookLoaderGif} className="img-fluid" />

                    <h2 className="text-black">Burada bekleyin. Araştırma yapıp geliyoruz.</h2>
                </div>

           
            </div>

        </div>
    )
}

export default BookLoader