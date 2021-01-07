import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer';
import FormStudentComment from '../../components/Form/FormStudentComment';
import ModalLoginSite from '../../components/Modal/ModalLoginSite';
import ModalNewRemoveRequest from '../../components/Modal/ModalNewRemoveRequest';
import ModalNewStudentVerifyRequest from '../../components/Modal/ModalNewStudentVerifyRequest';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import { SiteUserContext } from '../../contexts/SiteUserContext';
import api from '../../services/api';



const StudentProfileView = (props) => {

    const [state, setState] = useState({
        student: '',
        show_login_modal: false,
        show_student_verify_modal: false,
        show_remove_request_modal: false
    })

    const siteUserContext = useContext(SiteUserContext)

    useEffect(()=>{
        getStudent()
    },[])


    const getStudent = async () => {
        const student = await api.get('/student/get/'+props.match.params.studentId)
        
        setState({
            student: student.data
        })

    }


    const handleNewStudentVerifyRequestClick = (e) => {
        e.preventDefault()

        setState({
            ...state,
            show_student_verify_modal: true
        })
    }

    const handleNewRemoveRequestClick = (e) => {
        e.preventDefault()

        setState({
            ...state,
            show_remove_request_modal: true
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
     if(state.student.student_gender === "K"){
         genderAbbr = "KIZI"
     }else{
         genderAbbr = "OĞLU"
     }


     // render student comment field
     let studentCommentHtml = ''
     if(siteUserContext.state.is_logged_in){

        studentCommentHtml = <FormStudentComment student={state.student} /> 
     }else{
        studentCommentHtml = (
            <>
                <hr></hr>
                <h5>Yorum yapabilmek için üye girişi yapmalısınız</h5>
                <a href="#" onClick={handleOpenModalClick}>Üye girişi yapmak için tıklayın</a>
            </>
        )
     }


    // render login modal
    let loginModalHtml = ''
    if(state.show_login_modal){
        loginModalHtml = <ModalLoginSite />
    }

    // render remove request modal
    let removeRequestModalHtml = ''
    if(state.show_remove_request_modal){
        removeRequestModalHtml = <ModalNewRemoveRequest student={state.student} />
    }

    // render student verify modal
    let studentVerifyModalHtml = ''
    if(state.show_student_verify_modal){
        studentVerifyModalHtml = <ModalNewStudentVerifyRequest student={state.student} />
    }

    // render user query field
    let userQueryFieldHtml = ''
    if(siteUserContext.state.is_logged_in){
        userQueryFieldHtml = (
            <>
                <li><a href="#" onClick={handleNewRemoveRequestClick} ><i class="fa fa-times"></i>Kaldırma talebinde bulunun</a></li>
                <li>
                    <a data-toggle="tooltip" onClick={handleNewStudentVerifyRequestClick} title="Onaylama sonrasında bilgilerinizi düzenleyebilirsiniz" data-placement="bottom" href="#"><i class="fa fa-check-circle"></i>
                    Onaylama yapın
                </a>
                </li>
            </>
        )
    }else{
        userQueryFieldHtml = <li><a href="#" onClick={handleOpenModalClick} ><i class="fa fa-user"></i>Giriş Yapın</a></li>
    }

    return (
        <>
            <SectionPageTitle page_title="ÖĞRENCİ PROFİLİ" />
            {loginModalHtml}
            {removeRequestModalHtml}
            {studentVerifyModalHtml}  
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
                                                    <h3>{state.student.student_name} {state.student.student_surname}</h3>
                                                    <p>{state.student.student_high_school_graduation_exam}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 pl-5">
                                    <h6 class="card-subtitle text-muted">{state.student.student_father_name} {genderAbbr}</h6>
                                    <h4>
                                        {state.student.student_name} {state.student.student_surname}
                                        <div class="p-dropdown p-dropdown-invert float-right">
                                            <a class="btn btn-outline btn-sm"><i class="icon-sliders"></i> BU KİŞİ SİZ MİSİNİZ?</a>
                                            <ul class="p-dropdown-content">
                                                {userQueryFieldHtml}

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
                                                            <h5>Baba Adı</h5> <h6 className="card-subtitle text-muted">{state.student.student_father_name}</h6>
                                                        </li>
                                                        <li>
                                                            <h5>Doğum Tarihi</h5> <h6 className="card-subtitle text-muted">{state.student.student_birthday}</h6>
                                                        </li>
                                                        <li>
                                                            <h5>Uyruğu</h5> <h6 className="card-subtitle text-muted">{state.student.student_nationality}</h6>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <ul className="personal-informations">
                                                        <li>
                                                            <h5>Lise Mezuniyet Durumu</h5> <h6 className="card-subtitle text-muted">{state.student.student_high_school_graduation_result}</h6>
                                                        </li>
                                                        <li>
                                                            <h5>Lise Mezuniyet İmtihanı</h5> <h6 className="card-subtitle text-muted">{state.student.student_high_school_graduation_exam}</h6>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                    Lorem ipsum
                                                </div>
                                                <div class="tab-pane fade" id="comment" role="tabpanel" aria-labelledby="comment-tab">
                                                <h5>Bu kişiyi tanıyor musunuz?</h5> 
                                                <h6 className="card-subtitle text-muted mb-3">öyleyse yorum yapın</h6>
                                                    {studentCommentHtml}
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