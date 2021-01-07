import React from 'react'
import bg from '../../images/14.jpg'

const SectionPageTitle = (props) => {

    return (
        <section id="page-title" data-bg-parallax={bg}>
            <div class="parallax-container img-loaded" data-bg={bg} data-velocity="-.140" data-ll-status="loaded"></div>
            <div class="bg-overlay"></div>
            <div class="container">
                <div class="page-title">
                    <h1 class="text-uppercase text-medium">{props.page_title}</h1>
                    <span>{props.page_description}</span>
                </div>
            </div>
        </section>
    )
}

export default SectionPageTitle