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
import StudentSearchView from '../views/site/SearchView'
import BlogView from '../views/site/BlogView'
import GalleryView from '../views/site/GalleryView'
import ContactView from '../views/site/ContactView'
import BlogDetailView from '../views/site/BlogDetailView'
import ArchiveView from '../views/site/ArchiveView'
import SearchResultView from '../views/site/SearchResultView'
import StudentProfileView from '../views/site/StudentProfileView'
import StaffProfileView from '../views/site/StaffProfileView'

const RouterSite = (props) => {

   


    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={HomeView}></Route>
                <Route path="/nedir" exact component={AboutView}></Route>
                <Route path="/blog" exact component={BlogView}></Route>
                <Route path="/blog/detay/:postId" exact component={BlogDetailView}></Route>
                <Route path="/arsiv" exact component={ArchiveView}></Route>
                <Route path="/arsiv/ogrenci-ara" exact component={StudentSearchView}></Route>
                <Route path="/arsiv/arama-sonuclari" exact component={SearchResultView}></Route>
                <Route path="/arsiv/ogrenci/:studentId" exact component={StudentProfileView}></Route>
                <Route path="/arsiv/personel/:staffId" exact component={StaffProfileView}></Route>
                <Route path="/fotograf-galerisi" exact component={GalleryView}></Route>
                <Route path="/bize-ulasin" exact component={ContactView}></Route>
            </Switch>
        </Router>
    )

}

export default RouterSite