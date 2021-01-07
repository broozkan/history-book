import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import studentsPhoto from '../../images/students.jpg'
import teachersPhoto from '../../images/teachers.jpg'
import PortfolioItem from '../Portfolio/PortfolioItem'
import { SiteUserContext } from '../../contexts/SiteUserContext'

const Header = (props) => {


    const [state, setState] = useState({
        header_class: ""
    })


    const siteUserContext = useContext(SiteUserContext)
    const location = useLocation()

    useEffect(() => {

        if (location.pathname === "/") {
            setState({
                header_class: "dark"
            })
        }
    }, [])

    // render user profile content
    let userFieldHtml = ''
    if (siteUserContext.state.is_logged_in) {
        console.log(siteUserContext);
        userFieldHtml = (
            <div className="p-dropdown">
                <a href="#">
                    <button className="btn btn-light btn-outline">
                        {siteUserContext.state.user.user_name}
                    </button>

                </a>
                <ul className="p-dropdown-content">
                    <li><a href="/profile">Profil</a></li>
                    <hr></hr>
                    <li><a href="/logout">Çıkış Yap</a></li>
                </ul>
            </div>

        )
    } else {
        userFieldHtml = (
            <>
                <a href="/login">
                    <button className="btn btn-light btn-outline">GİRİŞ YAP</button>
                </a>
             
            </>
        )
    }

    return (
        <header id="header" data-transparent="true" className={state.header_class + " submenu-light"}>
            <div className="header-inner">
                <div className="container">

                    <div id="logo">
                        <a href="/">
                            <span className="logo-default">sivaslisesi.com</span>
                            <span className="logo-dark">sivaslisesi.com</span>
                        </a>
                    </div>



                    <div className="header-extras">
                        <ul>
                            <li>
                                {userFieldHtml}
                            </li>
                        </ul>
                    </div>


                    <div id="mainMenu-trigger"> <a className="lines-button x"><span className="lines"></span></a> </div>


                    <div id="mainMenu">
                        <div className="container">
                            <nav>
                                <ul>
                                    <li><a href="/">ANASAYFA</a></li>
                                    <li><a href="/nedir">NEDİR?</a></li>
                                    <li><a href="/blog">KÖŞE YAZILARI</a></li>
                                    <li className="dropdown mega-menu-item">
                                        <a href="/arsiv">ARŞİV</a>
                                        <ul className="dropdown-menu">
                                            <li className="mega-menu-content">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <h3>Buradan başlayalım <small>nasıl aramak istersiniz?</small></h3>

                                                        <div className="row filter-by">
                                                            <div class="portfolio-2-columns">

                                                                <PortfolioItem
                                                                    photo={studentsPhoto}
                                                                    title="ÖĞRENCİLERE GÖRE ARAMA YAP"
                                                                    href="/arsiv/ara/ogrenci"

                                                                />

                                                                <PortfolioItem
                                                                    photo={teachersPhoto}
                                                                    title="PERSONELLERE GÖRE ARAMA YAP"
                                                                    href="/arsiv/ara/personel"
                                                                />



                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="/fotograf-galerisi">FOTOĞRAF GALERİSİ</a></li>
                                    <li><a href="/bize-ulasin">İLETİŞİM</a></li>






                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header