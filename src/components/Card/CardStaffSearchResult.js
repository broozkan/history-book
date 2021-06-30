import React, { useContext } from 'react'
import { ArchiveContext } from '../../contexts/ArchiveContext'

const CardStaffSearchResult = (props) => {

    const archiveContext = useContext(ArchiveContext)


    // render gender abbrevation
    let genderAbbr = ''
    if (props.object.staff_gender === "K") {
        genderAbbr = "KIZI"
    } else {
        genderAbbr = "OĞLU"
    }



    return (
        <div class="col-lg-6">
            <div class="team-member">
                <div class="team-image">
                    <img src={`${process.env.REACT_APP_API_ENDPOINT}file/${props.object.staff_photo}`} />
                </div>
                <div class="team-desc">
                    <span>{props.object.staff_father_name} {genderAbbr}</span>

                    <h3>{props.object.staff_name} {props.object.staff_surname}</h3>
                    <ul className="team-member-ul list-style-none">
                        <li><span className="fa fa-birthday-cake"></span> {props.object.staff_birthday}</li>
                        <li><span className="fa fa-map-pin"></span> {props.object.staff_country}</li>
                    </ul>
                    <div class="align-center">
                        <a class="btn btn-xs btn-slide btn-light" href={'/arsiv/personel/' + props.object._id} target="_blank">
                            <i class="fas fa-chevron-right"></i>
                            <span>PROFİLE GİT</span></a>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default CardStaffSearchResult