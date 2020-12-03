import React,{useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation

} from 'react-router-dom'
import Header from '../components/Header/Header'
import HomeView from '../views/site/HomeView'
import AboutView from '../views/site/AboutView'
import BlogView from '../views/site/BlogView'
import GalleryView from '../views/site/GalleryView'
import ContactView from '../views/site/ContactView'

const RouterSite = (props) => {

   


    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={HomeView}></Route>
                <Route path="/nedir" exact component={AboutView}></Route>
                <Route path="/blog" exact component={BlogView}></Route>
                <Route path="/fotograf-galerisi" exact component={GalleryView}></Route>
                <Route path="/bize-ulasin" exact component={ContactView}></Route>
            </Switch>
        </Router>
    )

}

export default RouterSite