import React, { useEffect, useState } from 'react'
import { Component } from 'react'
import { Link, Redirect, matchPath, useParams, useRouteMatch, Switch, BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'
import api from '../../services/api'
import CardPhotoCategory from '../../components/Card/CardPhotoCategory'



class GalleryView extends Component {

    constructor() {
        super()

        this.state = {
            choices: [],
            categories: [],
            photo_galleries: [],
            category_history: [],
            is_categories_loaded: false
        }
        this.handleOnClick = this.handleOnClick.bind(this)
        this.getCategories = this.getCategories.bind(this)
    }

    componentDidMount() {
        this.getCategories()
    }


    getCategories = async (page = 1, params = null) => {
    
        if (params == null) {
            params = { 'is_category_main': 'true', 'category_type': 'photo_gallery' }
        }

        const categories = await api.get('/category/list/' + page, { params: params })



        if(categories.data.docs.length < 1){

            window.location.href = '/fotograf-galerisi/detay/'+params["category_upper_category._id"] 
        }

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }


    handleOnClick = (e) => {
      
        const params = {
            'category_type': 'photo_gallery',
            'category_upper_category._id': e.currentTarget.dataset.id
        }


        this.getCategories(1, params)

    }


    render() {

        // render main categories
        let mainCategoriesHtml = ''
        let reverseButtonHtml = ''
        if (this.state.is_categories_loaded) {

            reverseButtonHtml = (
                <div className="col-lg-12">
                    <button className="btn btn-light" onClick={this.getCategories}><span className="fa fa-chevron-left"></span> BAŞA DÖN</button>
                </div>
            )
            mainCategoriesHtml = this.state.categories.map((item) => {
                return (
                    <CardPhotoCategory category={item} onClick={this.handleOnClick} />
                )
            })
        }


        return (
            <>
                <SectionPageTitle />
                <section id="page-content">
                    <div className="container">
                        <div className="heading-text heading-section text-center m-b-40">
                            <h4 className="m-b-0">Fotoğraf Arşivimiz</h4>
                            <span className="lead">Detaylandırılmış fotoğraf arşivimiz ile geçmişe yolculuk yapmaya ne dersiniz?</span>
                        </div>
                        <div className="row">
                            {reverseButtonHtml}
                            {mainCategoriesHtml}
                            <div className="line"></div>
                        </div>

                    </div>


                </section>
                <Footer />
            </>
        )
    }



}

export default GalleryView