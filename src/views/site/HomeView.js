import React from 'react'
import SectionParallax from '../../components/Section/SectionParallax';
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import SectionLastArticles from '../../components/Section/SectionLastArticles';
import Footer from '../../components/Footer/Footer';

const HomeView = () => {
    return(
        <>
            <SectionParallax />
            <SectionAboutUs />
            <SectionLastArticles />
            <Footer />
        </>
    )
}

export default HomeView