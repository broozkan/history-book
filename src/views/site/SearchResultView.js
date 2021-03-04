import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';
import { useRouteMatch } from 'react-router-dom'
import CardStudentSearchResult from '../../components/Card/CardStudentSearchResult';
import CardStaffSearchResult from '../../components/Card/CardStaffSearchResult';
import Pagination from '../../components/Pagination/Pagination';
import {getResults} from '../../components/Form/FormSearchStudent'
import { logRoles } from '@testing-library/react';


const SearchResultView = () => {

    const match = useRouteMatch()
    const [results, setResults] = useState([])


    useEffect(() => {
        setResults(JSON.parse(localStorage.getItem('search_results')))
    }, [])


    const handleOnClick = async (clickedPageNumber) => {
        await getResults(clickedPageNumber)

        await setResults(JSON.parse(localStorage.getItem('search_results')))
    }


    // render results
    let resultsHtml = ''
    if (results.length > 0) {
        resultsHtml = results.map((item) => {

            if (match.params.searchBy === "student") {
                return (
                    <CardStudentSearchResult object={item} />
                )
            } else {
                return (
                    <CardStaffSearchResult object={item} />
                )
            }

        })
    } else {
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
                            <div className="row">
                                <div className="col-lg-12">
                                    <Pagination object={JSON.parse(localStorage.getItem('search_results_pagination'))}  onClick={handleOnClick}/>
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

export default SearchResultView