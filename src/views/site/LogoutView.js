import React, { useEffect } from 'react'
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import FormLoginSite from '../../components/Form/FormLoginSite';
import FormRegister from '../../components/Form/FormRegister';

const LogoutView = () => {

    useEffect(()=>{
        logout()
    },[])

    const logout = async () => {
        await localStorage.clear()
    }


    return (
        <>
            <SectionPageTitle page_title="OTURUMUNUZU KAPATIN" />
            <div className="row p-50">
                <div className="col-lg-4 offset-lg-4 text-center">
                    <h3>Oturumunuz kapatıldı</h3>
                    <a href="/">Anasayfaya dön</a>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default LogoutView