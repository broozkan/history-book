import React from 'react'
import SectionAboutUs from '../../components/Section/SectionAboutUs';
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import { Component } from 'react';
import FormPayment from '../../components/Form/FormPayment';


class PaymentSuccessView extends Component {

    render() {
        return (
            <>
                <SectionPageTitle page_title="" />
                <section className="p-b-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div class="heading-text heading-section">
                                    <h2 className="display-1"><span>Bağışınız alındı. Teşekkür ederiz.</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

}

export default PaymentSuccessView