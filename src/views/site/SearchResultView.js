import React, {useContext} from 'react'
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link

} from 'react-router-dom'
import CardStudentSearchResult from '../../components/Card/CardStudentSearchResult';
import { ArchiveContextWrapper, ArchiveContext } from '../../contexts/ArchiveContext'
import CardStaffSearchResult from '../../components/Card/CardStaffSearchResult';


const SearchResultView = () => {

    const archiveContext = useContext(ArchiveContext)

    console.log(archiveContext);
    // render results
    let resultsHtml = ''
    if (archiveContext.state.search_results.length > 0) {
        resultsHtml = archiveContext.state.search_results.map((item) => {
            
            if (archiveContext.state.object === "student") {
                return(
                    <CardStudentSearchResult object={item} />
                )    
            }else{
                return(
                    <CardStaffSearchResult object={item} />
                )
            }
            
        })    
    }else{
        resultsHtml = (
            <h4>Sonuç bulunamadı</h4>
        )
    }
    



    return (
        <>
            <SectionPageTitle page_title="Arama Sonuçları" />
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">
                            <div className="row team-members team-members-left team-members-shadow m-b-40">
                                {resultsHtml}

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