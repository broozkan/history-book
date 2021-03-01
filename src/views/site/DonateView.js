import React from 'react'
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import { Component } from 'react';
import FormDonate from '../../components/Form/FormDonate';

class DonateView extends Component {


    render() {
        return (
            <>
                <SectionPageTitle page_title="" />
                <section className="p-b-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div class="heading-text heading-section">
                                    <h2 className="display-1"><span>Neden bağış?</span></h2>
                                    <p>Yaptığınız bağışın %30'u sizlere bu arşivi açmamızda kullanılmaktadır. Geri kalanı ise belirli kurumlara bağış olarak aktarılmaktadır.</p>
                                    <a href="/bagis-kurumlari" class="btn btn-outline btn-rounded">Hangi kurumlara bağış yapılıyor?</a>
                                </div>
                            </div>
                        </div>
                        <FormDonate />
                    </div>
                </section>
                <Footer />
            </>
        )
    }

}

export default DonateView