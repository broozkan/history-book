import React from 'react'
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link

} from 'react-router-dom'
import { ArchiveContextWrapper } from '../../contexts/ArchiveContext';
import CardSearchResult from '../../components/Card/CardSearchResult';


const SearchResultView = () => {
    return (
        <>
            <SectionPageTitle />
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">
                            <div className="row team-members team-members-left team-members-shadow m-b-40">
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />
                            <CardSearchResult />

                            </div>


                        </div>

                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default SearchResultView