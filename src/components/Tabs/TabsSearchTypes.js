import React from 'react'
import {Link} from 'react-router-dom'

const TabsSearchTypes = (props) => {


    // render activity
    let studentActivity = ''
    if(props.type == "ogrenci"){
        studentActivity = 'active'
    }

    let staffActivity = ''
    if(props.type == "personel"){
        staffActivity = 'active'
    }

    return (

        <ul class="nav nav-tabs search-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <Link class={"nav-link "+studentActivity} id="home-tab" to="/arsiv/ara/ogrenci">Öğrenci Ara</Link>
            </li>
            <li class="nav-item">
                <Link class={"nav-link "+staffActivity} id="profile-tab" to="/arsiv/ara/personel">Personel Ara</Link>
            </li>
        </ul>
    )
}

export default TabsSearchTypes