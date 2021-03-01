import React from 'react'
import { Component } from 'react';
import iyzicoLogoBand from '../../images/logo-band.png'

class FormDonate extends Component {
    constructor() {
        super()

        this.state = {
            donate: '',
            donate_name: '',
            donate_surname: '',
            donate_phone_number: '',
            donate_email_address: '',
            is_form_submitting: false
        }
    }


    render() {
        return (
            <div class="row">
                <div class="col-lg-6">
                    <h4 class="upper">Bağış Miktarınız</h4>
                    <div class="table table-sm table-striped table-responsive table table-bordered table-responsive">
                        <table class="table m-b-0 text-center table-donates">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Bağış Tutarı</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="cart-product-thumbnail">
                                        <div class="form-check">
                                            <input class="form-check-input" name="donate" value="5" type="radio" />
                                        </div>
                                    </td>
                                    <td class="cart-product-subtotal">
                                        <span class="amount">5 TL</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="cart-product-thumbnail">
                                        <div class="form-check">
                                            <input class="form-check-input" name="donate" value="10" type="radio" />
                                        </div>
                                    </td>
                                    <td class="cart-product-subtotal">
                                        <span class="amount">10 TL</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <img src={iyzicoLogoBand} style={{float:'left',width: '50%'}} className="img-fluid" />
                </div>
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-12">
                            <h4>Ödeme Bilgileri</h4>

                            <form>
                                <div className="form-row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_name">Ad</label>
                                            <input className="form-control" placeholder="Adınızı Giriniz" name="donate_name" id="donate_name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_surname">Soyad</label>
                                            <input className="form-control" placeholder="Soyadınızı Giriniz" name="donate_surname" id="donate_surname" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_phone_number">Telefon <sup>Zorunlu değildir</sup> </label>
                                            <input className="form-control" placeholder="Telefon numaranızı giriniz" name="donate_phone_number" id="donate_phone_number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_email">E-posta <sup>Zorunlu değildir</sup></label>
                                            <input className="form-control" placeholder="E-posta adresiniz giriniz" name="donate_email" id="donate_email" />
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="col-lg-12">
                            <a class="btn icon-left float-right mt-3" href="#"><span>Proceed to PayPal</span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FormDonate