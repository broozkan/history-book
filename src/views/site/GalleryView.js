import React from 'react'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'


const GalleryView = () => {
    return (
        <>
            <SectionPageTitle />
            <section id="page-content">
                <div className="container">

                    <div className="grid-layout grid-3-columns grid-loaded" data-item="grid-item" data-lightbox="gallery">
                        <div class="grid-item gallery-item">
                            <a class="image-hover-zoom" href="images/gallery/1.jpg" data-lightbox="gallery-image">
                                <img src="images/gallery/1.jpg" />

                            </a>
                        </div>
                        <div class="grid-item gallery-item">
                            <a class="image-hover-zoom" href="images/gallery/1.jpg" data-lightbox="gallery-image">
                                <img src="images/gallery/1.jpg" />

                            </a>
                        </div>
                        <div class="grid-item gallery-item">
                            <a class="image-hover-zoom" href="images/gallery/1.jpg" data-lightbox="gallery-image">
                                <img src="images/gallery/1.jpg" />

                            </a>
                        </div>
                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default GalleryView