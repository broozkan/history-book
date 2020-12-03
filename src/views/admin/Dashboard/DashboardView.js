import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'


const DashboardView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
            <HeaderAdmin />
            <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="heading-text heading-section">
                                <h2>Yönetim<br></br>Paneli</h2>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div data-animate-delay="300" data-animate="fadeInUp" className="col-lg-6 animated fadeInUp visible">
                                    <p>The most happiest time of the day!. Morbi sagittis, sem quis lacinia faucibus, orci ipsum gravida tortor, vel interdum mi sapien ut justo. Nulla varius consequat magna, id molestie ipsum volutpat quis.
<br></br>
                                        <br></br>Facilisis ut venenatis eu, sodales vel dolor. The most happiest time of the day!. Morbi sagittis, sem quis lacinia faucibus, orci ipsum gravida tortor, vel interdum mi sapien ut justo. Nulla varius.</p>
                                </div>
                                <div data-animate-delay="600" data-animate="fadeInUp" className="col-lg-6 animated fadeInUp visible">
                                    <p>Pellentesque ipsum erat, facilisis ut venenatis eu, sodales vel dolor. The most happiest time of the day!. Morbi sagittis, sem quis lacinia faucibus, orci ipsum gravida tortor, vel interdum mi sapien ut justo.
<br></br>
                                        <br></br>The most happiest time of the day!. Morbi sagittis, sem quis lacinia faucibus, orci ipsum gravida tortor, vel interdum mi sapien ut justo. Nulla varius consequat magna, id molestie ipsum volut.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
            
        </>
    )
}

export default DashboardView