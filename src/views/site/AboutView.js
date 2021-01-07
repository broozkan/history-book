import React from 'react'
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';

const HomeView = () => {
    return(
        <>
            <SectionPageTitle page_title="BİZ KİMİZ?"  />
            <SectionAboutUs />
            <Footer />
        </>
    )
}

export default HomeView