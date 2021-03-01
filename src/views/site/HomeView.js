import React from 'react'
import SectionParallax from '../../components/Section/SectionParallax';
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import SectionLastArticles from '../../components/Section/SectionLastArticles';
import Footer from '../../components/Footer/Footer';
import WidgetDonate from '../../components/Widget/WidgetDonate';

const HomeView = () => {
    return(
        <>
            <SectionParallax />
            <SectionAboutUs />
            <SectionLastArticles />
            <WidgetDonate />
            <Footer />
        </>
    )
}

export default HomeView