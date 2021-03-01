import React from 'react'
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import { Component } from 'react';
import FormDonate from '../../components/Form/FormDonate';
import CardInstitue from '../../components/Card/CardInstitue';

class DonateInstituesView extends Component {


    render() {
        return (
            <>
                <SectionPageTitle page_title="" />
                <section className="p-b-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div class="heading-text heading-section text-center">
                                    <span class="lead">
                                        Yaptığınız bağışların %30'unu sizlere bu arşivi açmak için kullanıyor. Geri kalanını aşağıdaki kurumlara bağışlıyoruz.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul class="grid grid-4-columns">
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />
                            <CardInstitue />

                        </ul>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

}

export default DonateInstituesView