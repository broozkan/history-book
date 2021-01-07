import React, { useContext, useEffect } from 'react'
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import FormLoginSite from '../../components/Form/FormLoginSite';
import FormRegister from '../../components/Form/FormRegister';
import { SiteUserContext } from '../../contexts/SiteUserContext';
import { useHistory } from 'react-router-dom';

const LoginView = () => {


    const siteUserContext = useContext(SiteUserContext)
    const history = useHistory()

    useEffect(()=>{
        console.log(siteUserContext.state.is_logged_in);
        if (siteUserContext.state.is_logged_in) {
            history.push('/')
        }
    })


    return (
        <>
            <SectionPageTitle page_title="GİRİŞ YAPIN" page_description="Yorum yazabilmek, doğrulama yapabilmek için giriş yapın" />
            <div className="row p-50">
                <div className="col-lg-4 offset-lg-4">
                    <div class="tabs">
                        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Giriş Yap</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Hesap Oluştur</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                               <FormLoginSite />

                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <FormRegister />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default LoginView