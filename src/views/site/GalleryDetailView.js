import React, { useEffect, useState } from 'react'
import { Component } from 'react'
import CardPhoto from '../../components/Card/CardPhoto'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'
import api from '../../services/api'



class GalleryDetailView extends Component {

    constructor() {
        super()

        this.state = {
            photos: [],
            is_photos_loaded: false
        }

        this.getPhotos = this.getPhotos.bind(this)
    }


    componentDidMount() {
        this.getPhotos()

    }

    getPhotos = async (page = 1) => {
        const photos = await api.get('/photo-gallery/list/' + page, { params: { 'photo_gallery_category._id': this.props.match.params.photoGalleryCategoryId } })

        this.setState({
            photos: photos.data.docs,
            is_photos_loaded: true
        })
    }


    render() {

        // render photos
        let photosHtml = ''
        if (this.state.is_photos_loaded) {
            photosHtml = this.state.photos[0].photo_gallery_photos.map((item) => {
                return (
                    <CardPhoto photo={item} />
                )
            })
        }

        return (
            <>
                <SectionPageTitle />
                <section id="page-content">
                    <div className="container">
                        <div className="heading-text heading-section text-center m-b-40">
                            <h4 className="m-b-0">Fotoğraf Arşivimiz</h4>
                            <span className="lead">Detaylandırılmış fotoğraf arşivimiz ile geçmişe yolculuk yapmaya ne dersiniz?</span>
                        </div>
                        <div className="row">

                            <section id="page-content">
                                <div class="container">

                                    <div class="grid-layout grid-4-columns" data-margin="20" data-item="grid-item" data-lightbox="gallery">

                                        {photosHtml}
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 text-center">
                                            <button className="btn btn-light btn-lg" type="button">Daha Fazla Yükle</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>


                </section>
                <Footer />
            </>
        )
    }



}

export default GalleryDetailView