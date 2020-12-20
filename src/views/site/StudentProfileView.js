import React from 'react'
import Footer from '../../components/Footer/Footer';
import FormStudentComment from '../../components/Form/FormStudentComment';
import SectionPageTitle from '../../components/Section/SectionPageTitle';



const StudentProfileView = () => {
    return (
        <>
            <SectionPageTitle />
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30 student-profile" data-item="post-item">

                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="row team-members">
                                        <div class="col-lg-12">
                                            <div class="team-member">
                                                <div class="team-image">
                                                    <img className="img-fluid" src="https://1.bp.blogspot.com/_PuVIh5XWcv4/TT33Cx_jSYI/AAAAAAAAAFs/68XmCfBglgU/s1600/foto+ekram-4.JPG" />
                                                </div>
                                                <div class="team-desc text-center">
                                                    <h3>BASRİ BAHADIR TİRKEŞ</h3>
                                                    <p>1925-1926</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 pl-5">
                                    <h6 class="card-subtitle text-muted">Mahir Hamza Tirkeş Oğlu</h6>
                                    <h4>
                                        BASRİ BAHADIR TİRKEŞ
                                        <div class="p-dropdown p-dropdown-invert float-right">
                                            <a class="btn btn-outline btn-sm"><i class="icon-sliders"></i> BU KİŞİ SİZ MİSİNİZ?</a>
                                            <ul class="p-dropdown-content">
                                                <li><a href="#"><i class="fa fa-times"></i>Kaldırma talebinde bulunun</a></li>
                                                <li>
                                                    <a  data-toggle="tooltip" title="Onaylama sonrasında bilgilerinizi düzenleyebilirsiniz" data-placement="bottom" href="#"><i class="fa fa-check-circle"></i>
                                                        Onaylama yapın  
                                                    </a>
                                                 </li>

                                            </ul>
                                        </div>
                                    </h4>


                                        <div class="tabs mt-4">
                                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Kişisel Bilgiler</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Okul Bilgileri</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Ek Bilgiler</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" id="comment-tab" data-toggle="tab" href="#comment" role="tab" aria-controls="comment" aria-selected="false"><span className="fa fa-comment"></span> Yorum Yazın</a>
                                                </li>
                                            </ul>
                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <ul className="personal-informations">
                                                        <li>
                                                            <h5>Baba Adı</h5> <h6 className="card-subtitle text-muted">Mahir Hamza Tirkeş</h6>
                                                        </li>
                                                        <li>
                                                            <h5>Doğum Yeri</h5> <h6 className="card-subtitle text-muted">Sivas - 1978</h6>
                                                        </li>
                                                        <li>
                                                            <h5>Uyruğu</h5> <h6 className="card-subtitle text-muted">Türk</h6>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <ul className="personal-informations">
                                                        <li>
                                                            <h5>Lise Mezuniyet Durumu</h5> <h6 className="card-subtitle text-muted">Mezun</h6>
                                                        </li>
                                                        <li>
                                                            <h5>Lise Mezuniyet İmtihanı</h5> <h6 className="card-subtitle text-muted">1925-1926</h6>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                    Lorem ipsum
                                                </div>
                                                <div class="tab-pane fade" id="comment" role="tabpanel" aria-labelledby="comment-tab">
                                                <h5>Bu kişiyi tanıyor musunuz?</h5> 
                                                <h6 className="card-subtitle text-muted mb-3">öyleyse yorum yapın</h6>
                                                    <FormStudentComment />
                                                </div>
                                            </div>
                                        </div>
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

export default StudentProfileView