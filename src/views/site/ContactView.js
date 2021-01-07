import React from 'react'
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';

const ContactView = () => {

    console.log("okasfkla");
    return (
        <>
            <SectionPageTitle page_title="İLETİŞİM" />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h3 className="text-uppercase">BİZE YAZIN</h3>
                            <p>Bizimle iletişime geçmekten çekinmeyin. Sizlerle etkileşim içerisinde olmak bizi iyi hissettirecektir.</p>
                            <div className="m-t-30">
                                <form className="widget-contact-form" novalidate="" action="https://inspirothemes.com/polo/include/contact-form.php" role="form" method="post">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label for="name">İsim Soyisim</label>
                                            <input type="text" aria-required="true" name="widget-contact-form-name" required="" className="form-control required name" placeholder="İsminizi ve soy isminizi giriniz" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="email">E-Posta</label>
                                            <input type="email" aria-required="true" name="widget-contact-form-email" required="" className="form-control required email" placeholder="E-posta adresinizi giriniz" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="message">Mesaj</label>
                                        <textarea type="text" name="widget-contact-form-message" required="" rows="5" className="form-control required" placeholder="Mesajınızı giriniz"></textarea>
                                    </div>

                                    <button className="btn" type="submit" id="form-submit"><i className="fa fa-paper-plane"></i>&nbsp;Gönder</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">sda
                            <h3 className="text-uppercase">İLETİŞİM BİLGİLERİMİZ</h3>
                            <div className="row">
                                <div className="col-lg-12">
                                    <address>
                                        <strong><span className="fa fa-envelope"></span> Bize e-posta gönderebilirsiniz</strong>
                                        <br></br>
                                        merhaba@sivaslisesi.com
                                    </address>
                                    <address>
                                        <strong><span className="fa fa-phone"></span> Bizi arayabilirsiniz</strong>
                                        <br></br>
                                        +90 (532) 157 74 89
                                    </address>
                                </div>
                              
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
        
    )
}

export default ContactView