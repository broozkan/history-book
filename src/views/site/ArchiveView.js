import React from 'react'
import Footer from '../../components/Footer/Footer';
import PortfolioItem from '../../components/Portfolio/PortfolioItem';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import studentsPhoto from '../../images/students.jpg'
import teachersPhoto from '../../images/teachers.jpg'


const ArchiveView = () => {
    return(
        <>
            <SectionPageTitle/>
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">

                            
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-text heading-section">
                                <h2>Aramanızı neye göre yapmak istersiniz?</h2>
                                <div className="portfolio-2-columns">
                                    <PortfolioItem 
                                        photo={studentsPhoto}
                                        title="ÖĞRENCİLERE GÖRE ARAMA YAP"
                                        href="/arsiv/ogrenci-ara"

                                    />

                                    <PortfolioItem
                                        photo={teachersPhoto}
                                        title="PERSONELLERE GÖRE ARAMA YAP"
                                        href="/arsiv/personel-ara"
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>

                        </div>

                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default ArchiveView