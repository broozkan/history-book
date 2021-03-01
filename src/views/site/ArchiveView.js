import React from 'react'
import { Component } from 'react'
import CardSchool from '../../components/Card/CardSchool'
import Footer from '../../components/Footer/Footer'
import FormSearchStaff from '../../components/Form/FormSearchStaff'
import FormSearchStudent from '../../components/Form/FormSearchStudent'
import PortfolioItem from '../../components/Portfolio/PortfolioItem'
import SectionPageTitle from '../../components/Section/SectionPageTitle'
import studentsPhoto from '../../images/students.jpg'
import teachersPhoto from '../../images/teachers.jpg'
import api from '../../services/api'
import ScrollTo from 'react-scroll-into-view'

class ArchiveView extends Component {

    constructor() {
        super()

        this.state = {
            schools: [],
            choices: [],
            is_schools_loaded: false
        }

        this.getSchools = this.getSchools.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    componentDidMount() {
        this.getSchools()
    }

    getSchools = async (page = 1) => {
        const schools = await api.get('/school/list/' + page)

        this.setState({
            schools: schools.data.docs,
            is_schools_loaded: true
        })
    }

    handleOnClick = (e) => {
        let choicesArray = this.state.choices
        console.log(typeof (e.currentTarget.dataset.model));
        if (e.currentTarget.dataset.model == "school") {
            this.state.schools.map((item) => {
                if (e.currentTarget.dataset.id == item._id) {
                    choicesArray["school"] = item
                }
            })
        } else if (e.currentTarget.dataset.model == "staff") {
            choicesArray["search_type"] = "staff"
        } else if (e.currentTarget.dataset.model == "student") {
            choicesArray["search_type"] = "student"
        }


        this.setState({
            choices: choicesArray
        })
    }

    render() {

        console.log(this.state);
        // render schools
        let schoolsHtml = ''
        if (this.state.is_schools_loaded) {
            schoolsHtml = this.state.schools.map((item) => {
                return (
                    <ScrollTo selector="#type-field">
                        <CardSchool onClick={this.handleOnClick} school={item} />
                    </ScrollTo>
                )
            })
        }


        // render search types
        let searchTypesHtml = ''
        if (this.state.choices.school) {
            searchTypesHtml = (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-text heading-section">
                            <h4>Hangisini aramak istersiniz?</h4>
                            <div className="portfolio-2-columns">
                                <ScrollTo selector="#form-field">
                                    <PortfolioItem
                                        title="Öğrenci aramak istiyorum"
                                        photo={studentsPhoto}
                                        model="student"
                                        onClick={this.handleOnClick}
                                    />
                                </ScrollTo>
                                <ScrollTo selector="#form-field">
                                    <PortfolioItem
                                        title="Personel aramak istiyorum"
                                        photo={teachersPhoto}
                                        model="staff"
                                        onClick={this.handleOnClick}
                                    />
                                </ScrollTo>

                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            searchTypesHtml = (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-text heading-section">
                            <h4>Okul seçiminizi bekliyoruz...</h4>
                        </div>
                    </div>
                </div>

            )
        }


        // render search form
        let searchFormHtml = ''
        if (this.state.choices.search_type) {
            let formHtml = ''
            if (this.state.choices.search_type == "student") {
                formHtml = (
                    <FormSearchStudent />
                )
            } else if (this.state.choices.search_type == "staff") {
                formHtml = (
                    <FormSearchStaff />
                )
            }

            searchFormHtml = (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-text heading-section">
                            <h4>Hazırız. Biraz daha detay eklemek isterseniz diye düşündük</h4>
                            <div className="portfolio-2-columns">
                                {formHtml}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            searchFormHtml = (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading-text heading-section">
                            <h4>Aranacak kişi tipini seçmenizi bekliyoruz...</h4>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <>
                <SectionPageTitle page_title="" />
                <section id="page-content" className="search-page">
                    <div className="container">

                        <div id="blog">

                            <div id="blog" className="post-3-columns m-b-30" data-item="post-item">


                                <div className="row">
                                    <div className="col-lg-12">

                                        <p>
                                            Buraya sahip olunan arşiv ile ilgili bilgiler konulabilir.
                                            Bence gayet de güzel durur. Ayrıca iki satır yazılırsa harika olur
                                            Bence gayet de güzel durur. Ayrıca iki satır yazılırsa harika olurBence gayet de güzel durur. Ayrıca iki satır yazılırsa harika olur
                                        </p>
                                        <p>
                                            Hadi başlayalım...
                                        </p>
                                        <div className="heading-text heading-section">
                                            <h4>Önce okulunuzu seçelim</h4>
                                            <div className="portfolio-3-columns">
                                                {schoolsHtml}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="line"></div>
                                <div id="type-field">
                                    {searchTypesHtml}

                                </div>
                                <div className="line"></div>
                                <div id="form-field">
                                    {searchFormHtml}

                                </div>
                            </div>

                        </div>
                    </div>


                </section>
                <Footer />
            </>
        )
    }

}

export default ArchiveView