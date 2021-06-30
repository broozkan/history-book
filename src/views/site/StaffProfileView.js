import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer';
import FormStaffComment from '../../components/Form/FormStaffComment';
import ModalLoginSite from '../../components/Modal/ModalLoginSite';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import { SiteUserContext } from '../../contexts/SiteUserContext';
import api from '../../services/api';



const StaffProfileView = (props) => {


    const [state, setState] = useState({
        staff: ''
    })


    const siteUserContext = useContext(SiteUserContext)


    useEffect(() => {
        getStaff()
    }, [])


    const getStaff = async () => {
        const staff = await api.get('/staff/get/' + props.match.params.staffId)

        setState({
            staff: staff.data
        })

    }

    const handleOpenModalClick = (e) => {
        e.preventDefault()

        setState({
            ...state,
            show_login_modal: true
        })
    }


    // render gender abbrevation
    let genderAbbr = ''
    if (state.staff.staff_gender === "K") {
        genderAbbr = "KIZI"
    } else {
        genderAbbr = "OĞLU"
    }

    // render duty field
    let dutyFieldHtml = ''
    if (state.staff.staff_duty) {
        dutyFieldHtml = (
            <li>
                <h5>2. Görevi</h5>
                <h6 className="card-subtitle text-muted">{state.staff.staff_duty}</h6>
            </li>
        )
    }



    // render staff comment field
    let staffCommentHtml = ''
    if (siteUserContext.state.is_logged_in) {
        staffCommentHtml = <FormStaffComment />
    } else {
        staffCommentHtml = (
            <>
                <hr></hr>
                <h5>Yorum yapabilmek için üye girişi yapmalısınız</h5>
                <a href="#" onClick={handleOpenModalClick}>Üye girişi yapmak için tıklayın</a>
            </>
        )
    }


    // render login modal
    let loginModalHtml = ''
    if (state.show_login_modal) {
        loginModalHtml = <ModalLoginSite />
    }

    return (
        <>
            <SectionPageTitle page_title="PERSONEL PROFİLİ" />
            {loginModalHtml}
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30 staff-profile" data-item="post-item">

                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="row team-members">
                                        <div class="col-lg-12">
                                            <div class="team-member">
                                                <div class="team-image">
                                                    <img className="img-fluid" src={`${process.env.REACT_APP_API_ENDPOINT}file/${state.staff.staff_photo}`} />
                                                </div>
                                                <div class="team-desc text-center">
                                                    <h3>{state.staff.staff_name} {state.staff.staff_surname}</h3>
                                                    <p>{state.staff.staff_duty_beginning_date}-{state.staff.staff_duty_ending_date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 pl-5">
                                    <h6 class="card-subtitle text-muted">{state.staff.staff_father_name} {genderAbbr}</h6>
                                    <h4>
                                        {state.staff.staff_name} {state.staff.staff_surname}
                                        <div class="p-dropdown p-dropdown-invert float-right">
                                            <a class="btn btn-outline btn-sm"><i class="icon-sliders"></i> BU KİŞİ SİZ MİSİNİZ?</a>
                                            <ul class="p-dropdown-content">
                                                <li><a href="#"><i class="fa fa-times"></i>Kaldırma talebinde bulunun</a></li>
                                                <li>
                                                    <a data-toggle="tooltip" title="Onaylama sonrasında bilgilerinizi düzenleyebilirsiniz" data-placement="bottom" href="#"><i class="fa fa-check-circle"></i>
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
                                                        <h5>Baba Adı</h5> <h6 className="card-subtitle text-muted">{state.staff.staff_father_name}</h6>
                                                    </li>
                                                    <li>
                                                        <h5>Doğum Yeri</h5> <h6 className="card-subtitle text-muted">{state.staff.staff_country} - {state.staff.staff_birthday}</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <ul className="personal-informations">
                                                    <li>
                                                        <h5>Branşı</h5>
                                                        <h6 className="card-subtitle text-muted">{state.staff.staff_branch}</h6>
                                                    </li>
                                                    {dutyFieldHtml}
                                                    <li>
                                                        <h5>Görev Süresi</h5>
                                                        <h6 className="card-subtitle text-muted">{state.staff.staff_duty_beginning_date}-{state.staff.staff_duty_ending_date}</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                Lorem ipsum
                                            </div>
                                            <div class="tab-pane fade" id="comment" role="tabpanel" aria-labelledby="comment-tab">
                                                <h5>Bu kişiyi tanıyor musunuz?</h5>
                                                <h6 className="card-subtitle text-muted mb-3">öyleyse yorum yapın</h6>
                                                {staffCommentHtml}
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

export default StaffProfileView