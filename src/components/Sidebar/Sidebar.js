import React from 'react'


const Sidebar = () => {
    return (
        <div id="side-panel" className="text-center dark" style={{ opacity: 1 }}>
            <div id="close-panel">
                <i className="fa fa-times"></i>
            </div>
            <div className="side-panel-wrap">
                <h3>Yönetim Paneli</h3>
                <hr className="space"></hr>

                <div id="mainMenu" className="menu-onclick menu-vertical">
                    <div className="container">
                        <nav>
                            <ul>
                                <li><a href="index.html"><span className="fa fa-home"></span> YÖNETİM <span className="fa fa-chevron-right float-right mt-1"></span></a> </li>
                                <li><a href="/admin/student/list"><span className="fa fa-user-friends"></span> ÖĞRENCİLER <span className="fa fa-chevron-right float-right mt-1"></span></a></li>
                                <li><a href="/admin/staff/list"><span className="fa fa-user-friends"></span> PERSONELLER <span className="fa fa-chevron-right float-right mt-1"></span></a></li>
                                <li><a href="/admin/student-comment/list"><span className="fa fa-comments"></span> YORUMLAR <span className="fa fa-chevron-right float-right mt-1"></span></a></li>
                                <li><a href="/admin/post/list"><span className="fa fa-rss"></span> YAZILAR <span className="fa fa-chevron-right float-right mt-1"></span></a></li>
                                <hr className="space"></hr>

                                <li><a href="/admin/user/logout"> <span className="fa fa-sign-out-alt"></span> ÇIKIŞ YAP</a></li>
                                
                                
                                
                                
                                
                                
                            </ul>
                        </nav>
                    </div>
                </div>

                <hr className="space"></hr>



            </div>
        </div>
    )
}

export default Sidebar