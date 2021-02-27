import React, { useEffect, useState } from 'react'
import { Component } from 'react'
import { Link, Redirect, matchPath, useParams, useRouteMatch, Switch, BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'
import api from '../../services/api'
import CardPhotoCategory from '../../components/Card/CardPhotoCategory'



const GalleryView = (props) => {

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
                        <Switch>
                            <Route path="/fotograf-galerisi/:id" component={CardPhotoCategory}></Route>
                            <Route path="/fotograf-galerisi/">
                                <Redirect to="/fotograf-galerisi/0" />
                            </Route>
                        </Switch>
                    </div>

                </div>


            </section>
            <Footer />
        </>
    )


}

export default GalleryView