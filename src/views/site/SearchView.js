import React from 'react'
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link

} from 'react-router-dom'
import FormSearchStudent from '../../components/Form/FormSearchStudent';
import FormSearchStaff from '../../components/Form/FormSearchStaff';
import { ArchiveContextWrapper } from '../../contexts/ArchiveContext';


const StudentSearchView = () => {
    return (
        <>
            <SectionPageTitle />
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">

                            <div class="tabs">

                                <Router>
                                    <ul class="nav nav-tabs search-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <Link class="nav-link active" id="home-tab" to="/arsiv/ogrenci-ara">Öğrenci Ara</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link class="nav-link" id="profile-tab" to="/arsiv/personel-ara">Personel Ara</Link>
                                        </li>
                                    </ul>

                                    <Switch>
                                        <ArchiveContextWrapper>
                                            <Route path="/arsiv/ogrenci-ara" component={FormSearchStudent}></Route>
                                            <Route path="/arsiv/personel-ara" component={FormSearchStaff}></Route>
                                        </ArchiveContextWrapper>
                                       
                                    </Switch>
                                    
                                    
                                </Router>
                            </div>


                        </div>

                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default StudentSearchView