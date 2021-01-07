import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {SiteUserContext} from '../../contexts/SiteUserContext'

const TabsSearchCards = (props) => {

    const siteUserContext = useContext(SiteUserContext) 


    // render my cards
    let myCardsHtml = ''
    if (siteUserContext.state.is_logged_in) {
        myCardsHtml = (
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Kartlarım</a>
            </li>
        )
    }

    return (

        <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Yeni Kart</a>
            </li>
            {myCardsHtml}
        </ul>
    )
}

export default TabsSearchCards