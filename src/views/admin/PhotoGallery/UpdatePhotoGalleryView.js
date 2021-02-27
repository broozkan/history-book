import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormPhotoGallery from '../../../components/Form/FormPhotoGallery'

const UpdatePhotoGalleryView = (props) => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <FormPhotoGallery photo_gallery_id={props.match.params.photoGalleryId} />
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UpdatePhotoGalleryView