import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
                ...state,
                header_class: "dark"
            })
        }
    }, [])

    const handleOnChange = (e) => {
        e.preventDefault()

        window.location.href = e.target.value
    }

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
                            <span className="logo-default d-xs-none">sivaslisesi.com</span>
                            <span className="logo-dark d-xs-none">sivaslisesi.com</span>
                        </a>
                    </div>



                    <div className="header-extras">
                        <ul>
                            <li>
                                {userFieldHtml}
                            </li>
                        </ul>
                    </div>


                    <select className="form-control d-none d-xs-block" onChange={handleOnChange} value={location.pathname}>
                        <option value="/">ANASAYFA</option>
                        <option value="/nedir">NEDİR?</option>
                        <option value="/blog">KÖŞE YAZILARI</option>
                        <option value="/arsiv">ARŞİV</option>
                        <option value="/fotograf-galerisi">FOTOĞRAF GALERİSİ</option>
                        <option value="/bize-ulasin">İLETİŞİM</option>
                        <option value="/login">GİRİŞ YAP</option>
                    </select>

                    <div id="mainMenu">
                        <div className="container">
                            <nav>
                                <ul>
                                    <li><a href="/">ANASAYFA</a></li>
                                    <li><a href="/nedir">NEDİR?</a></li>
                                    <li><a href="/blog">KÖŞE YAZILARI</a></li>
                                    <li><a href="/arsiv">ARŞİV</a></li>
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