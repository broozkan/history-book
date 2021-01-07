import React, { useContext } from 'react'
import { ArchiveContext } from '../../contexts/ArchiveContext'

const CardStudentSearchResult = (props) => {

    const archiveContext = useContext(ArchiveContext)


    // render gender abbrevation
    let genderAbbr = ''
    if(props.object.student_gender === "K"){
        genderAbbr = "KIZI"
    }else{
        genderAbbr = "OĞLU"
    }



    return (
        <div class="col-lg-6">
            <div class="team-member">
                <div class="team-image">
                    <img src="https://1.bp.blogspot.com/_PuVIh5XWcv4/TT33Cx_jSYI/AAAAAAAAAFs/68XmCfBglgU/s1600/foto+ekram-4.JPG" />
                </div>
                <div class="team-desc">
                    <span>{props.object.student_father_name} {genderAbbr}</span>

                    <h3>{props.object.student_name} {props.object.student_surname}</h3>
                    <ul className="team-member-ul list-style-none">
                        <li><span className="fa fa-birthday-cake"></span> {props.object.student_birthday}</li>
                        <li><span className="fa fa-globe-americas"></span> {props.object.student_nationality}</li>
                    </ul>
                    <div class="align-center">
                        <a class="btn btn-xs btn-slide btn-light" href={'/arsiv/ogrenci/'+props.object._id} target="_blank">
                            <i class="fas fa-chevron-right"></i>
                            <span>PROFİLE GİT</span></a>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default CardStudentSearchResult