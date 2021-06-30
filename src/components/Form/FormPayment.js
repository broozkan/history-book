import React from 'react'
import { Component } from 'react';
import api from '../../services/api';
import InnerHTML from 'dangerously-set-html-content'

class FormPayment extends Component {
    constructor() {
        super()

        this.state = {
            payment_method: 'online',
            payment_cart_name: '',
            payment_cart_number: '',
            payment_cart_expiration_month: '',
            payment_cart_expiration_year: '',
            payment_cart_ccv: '',
            payment_form_html: '',
            is_payment_form_loaded: false,
            conversation_id: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }


    async componentDidMount() {
        const parsedDonateData = JSON.parse(localStorage.getItem('donateData'))

        const donate = {
            donate_amount: parsedDonateData.donate_amount,
            donate_institute: parsedDonateData.donate_institute,
            donater_name: parsedDonateData.donater_name,
            donater_surname: parsedDonateData.donater_surname,
            donater_phone: parsedDonateData.donater_phone,
            donater_email: parsedDonateData.donater_email
        }

        const response = await api.get('/donate/initialize', { params: donate })

        this.setState({
            payment_form_html: response.data.checkoutFormContent,
            is_payment_form_loaded: true,
            conversation_id: response.data.conversationId
        })
    }

    handleOnChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {

        // render payment form
        let paymentFormJsx = ''
        if (this.state.is_payment_form_loaded) {
            paymentFormJsx = (
                <>
                    <div id="iyzipay-checkout-form" class="responsive"></div>

                    <InnerHTML html={this.state.payment_form_html} />
                </>
            )
        } else {
            paymentFormJsx = <span className="fa fa-3x fa-spinner fa-spin"> </span>
        }

        return (
            <form>
                {paymentFormJsx}
            </form>
        )
    }
}
export default FormPayment