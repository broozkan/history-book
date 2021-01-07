import React from 'react'
import CardBlogPost from '../Card/CardBlogPost'


const SectionLastArticles = () => {




    return (
        <section id="section4">
            <div className="container">
                <div className="heading-text heading-section text-center m-b-40">
                    <h2 className="m-b-0">OUR BLOG</h2>
                    <span className="lead">We do blogging sometimes!</span>
                </div>
                <div id="blog">

                    <div id="blog" className="post-3-columns m-b-30" data-item="post-item">

                        <CardBlogPost />
                        <CardBlogPost />
                        <CardBlogPost />


                    </div>

                </div>
            </div>
        </section>
    )
}

export default SectionLastArticles