import React from 'react'


const PortfolioItem = (props) => {



    return(
        <div class="portfolio-item text-bottom" data-model={props.model} onClick={props.onClick}>
            <div class="portfolio-item-wrap">
                <div class="portfolio-image">
                    <a href={props.href}><img src={props.photo} alt="" /></a>
                </div>
                <div class="portfolio-description">
                    <a href={props.href}>
                        <h3>{props.title}</h3>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PortfolioItem