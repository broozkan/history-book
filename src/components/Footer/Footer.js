import React from 'react'

const Footer = () => {
    return(
        <footer id="footer">
            <div className="footer-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="widget">
                                <div className="widget-title">Polo HTML5 Template</div>
                                <p className="mb-5">Built with love in Fort Worth, Texas, USA<br></br>
                                    All rights reserved. Copyright © 2019. INSPIRO.</p>
                                <a href="https://themeforest.net/item/polo-responsive-multipurpose-html5-template/13708923"
                                    className="btn btn-inverted" target="_blank">Purchase Now</a>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">Discover</div>
                                        <ul className="list">
                                            <li><a href="#">Features</a></li>
                                            <li><a href="#">Layouts</a></li>
                                            <li><a href="#">Corporate</a></li>
                                            <li><a href="#">Updates</a></li>
                                            <li><a href="#">Pricing</a></li>
                                            <li><a href="#">Customers</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">Features</div>
                                        <ul className="list">
                                            <li><a href="#">Layouts</a></li>
                                            <li><a href="#">Headers</a></li>
                                            <li><a href="#">Widgets</a></li>
                                            <li><a href="#">Footers</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">Pages</div>
                                        <ul className="list">
                                            <li><a href="#">Portfolio</a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="#">Shop</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="widget">
                                        <div className="widget-title">Support</div>
                                        <ul className="list">
                                            <li><a href="#">Help Desk</a></li>
                                            <li><a href="#">Documentation</a></li>
                                            <li><a href="#">Contact Us</a></li>
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
                    <div className="copyright-text text-center">&copy; 2019 POLO - Responsive Multi-Purpose HTML5 Template.
                        All Rights Reserved.<a href="http://www.inspiro-media.com/" target="_blank" rel="noopener">
                            INSPIRO</a> </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer