import React from 'react'


const HeaderAdmin = () => {

    return (
        <header id="header" data-transparent="true" className={"submenu-light"}>
            <div className="header-inner">
                <div className="container">

                    <div id="logo"> <a href="index.html"><span className="logo-default">sivaslisesi.com</span><span
                        className="logo-dark">sivaslisesi.com</span></a> </div>






                    <div id="mainMenu-trigger"> <a className="lines-button x"><span className="lines"></span></a> </div>


                    <div id="mainMenu">
                        <div className="container">
                            <nav>
                                <ul>
                                    <li className="dropdown">
                                        <a href="#">Hoşgeldiniz, broozkan__  <span className="fa fa-chevron-down"></span> </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="#">Çıkış Yap</a>
                                            </li>
                                        </ul>
                                    </li>






                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default HeaderAdmin