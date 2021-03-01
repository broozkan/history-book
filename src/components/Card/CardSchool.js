import React from 'react'


const CardSchool = (props) => {

    return (
        <div class="portfolio-item text-bottom" onClick={props.onClick} data-id={props.school._id} data-model="school">
            <div class="portfolio-item-wrap">
                <div class="portfolio-image">
                    <a><img src={process.env.REACT_APP_API_ENDPOINT + "/file/" + props.school.school_photo} alt="" /></a>
                </div>
                <div class="portfolio-description">
                    <a>
                        <h3>{props.school.school_name}</h3>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardSchool