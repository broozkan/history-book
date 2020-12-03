import React from 'react'


const Header = () => {

    return (
        <section className="fullscreen" data-bg-parallax="images/parallax/15.jpg">
            <div className="bg-overlay"></div>
            <div className="container-fluid">
                <div className="container-fullscreen">
                    <div className="text-middle text-center text-light">
                        <h3 className="m-b-0">SİVAS LİSESİ DEV</h3>
                        <h2 className="text-lg m-t-0">ARŞİV</h2>
                        <p className="lead">Geçmişte bir yolculuğa hazır mısınız?</p>
                        <a className="btn btn-light btn-outline" href="#">Detaylı Arama Yap</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header