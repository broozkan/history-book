import React from 'react'
import { Component } from 'react';
import iyzicoLogoBand from '../../images/logo-band.png'
import api from '../../services/api';
import CardInstitue from '../Card/CardInstitue';
import SpinLoader from '../Loader/SpinLoader';

class FormDonate extends Component {
    constructor() {
        super()

        this.state = {
            donate_amount: '',
            donate_institute: {},
            donater_name: '',
            donater_surname: '',
            donater_phone: '',
            donater_email: '',
            institutes: [],
            is_form_submitting: false,
            is_institutes_loaded: false
        }
        this.getInstitutes = this.getInstitutes.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }


    async componentDidMount() {
        await this.getInstitutes()
    }

    getInstitutes = async (page = 1, filters = {}) => {

        const institutes = await api.get('/institute/list/' + page, { params: filters })

        this.setState({
            institutes: institutes.data.docs,
            is_institutes_loaded: true
        })

    }

    handleOnSubmit = async (e) => {
        e.preventDefault()

        const donate = {
            donate_amount: this.state.donate_amount,
            donate_institute: this.state.donate_institute,
            donater_name: this.state.donater_name,
            donater_surname: this.state.donater_surname,
            donater_phone: this.state.donater_phone,
            donater_email: this.state.donater_email
        }

        await localStorage.setItem('donateData', JSON.stringify(donate))

        window.location.href = '/odeme'

    }


    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnClick(e) {
        this.state.institutes.map((item) => {
            if (e.currentTarget.dataset.id == item._id) {
                this.setState({
                    donate_institute: item
                })
            }
        })
    }

    render() {

        // render institutes
        let institutesJsx = <SpinLoader />
        if (this.state.is_institutes_loaded) {
            institutesJsx = this.state.institutes.map((item) => {
                let isActive = ''
                if (this.state.donate_institute._id == item._id) {
                    isActive = 'active'
                }
                return (
                    <div className="col-lg-12">
                        <CardInstitue isActive={isActive} institute={item} onClick={this.handleOnClick} />
                    </div>
                )
            })
        }

        console.log(this.state);

        return (
            <form onSubmit={this.handleOnSubmit}>
                <div class="row">
                    <div class="col-lg-4">
                        <h4 class="upper">Bağış Miktarınız</h4>
                        <input className="form-control form-control-lg" name="donate_amount" onChange={this.handleOnChange} value={this.state.donate_amount} required placeholder="Bağış miktarı giriniz" />
                        <img src={iyzicoLogoBand} style={{ float: 'left', width: '50%' }} className="img-fluid mt-3" />
                    </div>
                    <div className="col-lg-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <h4>Bağış Yapılacak Kurum</h4>
                            </div>
                            {institutesJsx}
                        </div>

                    </div>
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <h4>Ödeme Bilgileri</h4>

                                <div className="form-row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_name">Ad</label>
                                            <input className="form-control" onChange={this.handleOnChange} value={this.state.donater_name} required placeholder="Adınızı Giriniz" name="donater_name" id="donate_name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_surname">Soyad</label>
                                            <input className="form-control" onChange={this.handleOnChange} value={this.state.donater_surname} required placeholder="Soyadınızı Giriniz" name="donater_surname" id="donate_surname" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_phone_number">Telefon </label>
                                            <input className="form-control" onChange={this.handleOnChange} value={this.state.donater_phone} required placeholder="Telefon numaranızı giriniz" name="donater_phone" id="donate_phone_number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label for="donate_email">E-posta <sup>Zorunlu değildir</sup></label>
                                            <input className="form-control" onChange={this.handleOnChange} value={this.state.donater_email} placeholder="E-posta adresiniz giriniz" name="donater_email" id="donate_email" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-lg-12">
                                <button class="btn icon-left float-right mt-3" type="submit" href="#"><span>ÖDEME ADIMINA GEÇ</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
export default FormDonate