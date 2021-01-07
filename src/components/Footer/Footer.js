import React from 'react'
import cityPhoto from '../../images/siluet.png'

const Footer = () => {
    return(
        <>
        <img src={cityPhoto} className="city-photo" />
        <footer id="footer">
            <div className="footer-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="widget">
                                <div className="widget-title">sivaslisesi.com</div>
                                <p className="mb-5">Sivas lisesine ait dev arşiv<br></br>
                                    Sivas lisesi öğrencilerinin tarihi arşiv bilgileri</p>
                                <a href="/bize-ulasin"
                                    className="btn btn-inverted" target="_blank">BİZE YAZIN</a>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">SİTE HARİTASI</div>
                                        <ul className="list">
                                            <li><a href="#">Anasayfa</a></li>
                                            <li><a href="#">Nedir?</a></li>
                                            <li><a href="#">Köşe Yazıları</a></li>
                                            <li><a href="#">Öğrenci Ara</a></li>
                                            <li><a href="#">Personel Ara</a></li>
                                            <li><a href="#">Galeri</a></li>
                                            <li><a href="#">İletişim</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">KURALLAR</div>
                                        <ul className="list">
                                            <li><a href="#">Kişisel Veri Politikası</a></li>
                                            <li><a href="#">Gizlilik Sözleşmesi</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">DESTEK</div>
                                        <ul className="list">
                                            <li><a href="#">İstek, şikayet, öneri</a></li>
                                            <li><a href="#">Geri bildirim</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-content">
                <div className="container">
                    <div className="copyright-text text-center">&copy; <a href="http://www.arqmedya.com/" target="_blank" rel="noopener">
                        ArqMedya - Yazılım </a> </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer