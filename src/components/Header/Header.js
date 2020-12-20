import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import studentsPhoto from '../../images/students.jpg'
import teachersPhoto from '../../images/teachers.jpg'
import PortfolioItem from '../Portfolio/PortfolioItem'

const Header = (props) => {


    const [state, setState] = useState({
        header_class: ""
    })


    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/") {
            setState({
                header_class: "dark"
            })
        }
    }, [])


    return (
        <header id="header" data-transparent="true" className={state.header_class + " submenu-light"}>
            <div className="header-inner">
                <div className="container">

                    <div id="logo"> <a href="index.html"><span className="logo-default">sivaslisesi.com</span><span
                        className="logo-dark">sivaslisesi.com</span></a> </div>


                    <div id="search"><a id="btn-search-close" className="btn-search-close" aria-label="Close search form"><i
                        className="icon-x"></i></a>
                        <form className="search-form" action="https://inspirothemes.com/polo/search-results-page.html"
                            method="get">
                            <input className="form-control" name="q" type="text" placeholder="Type & Search..." />
                            <span className="text-muted">Start typing & press "Enter" or "ESC" to close</span>
                        </form>
                    </div>

                    <div className="header-extras">
                        <ul>
                            <li> <a id="btn-search" href="#"> <i className="icon-search"></i></a> </li>
                            <li>
                                <div className="p-dropdown"> <a href="#"><i className="icon-globe"></i><span>EN</span></a>
                                    <ul className="p-dropdown-content">
                                        <li><a href="#">French</a></li>
                                        <li><a href="#">Spanish</a></li>
                                        <li><a href="#">English</a></li>
                                    </ul>
                                </div>
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
                                                                    href="/arsiv/ogrenci-ara"

                                                                />

                                                                <PortfolioItem
                                                                    photo={teachersPhoto}
                                                                    title="PERSONELLERE GÖRE ARAMA YAP"
                                                                    href="/arsiv/personel-ara"
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