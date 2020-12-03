import React from 'react'
import CardBlogPost from '../../components/Card/CardBlogPost'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'


const BlogView = () => {
    return (
        <>
            <SectionPageTitle />
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">

                            <CardBlogPost />
                            <CardBlogPost />
                            <CardBlogPost />


                        </div>

                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default BlogView