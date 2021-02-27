import React from 'react'
import { Component } from 'react'
import CardBlogPost from '../../components/Card/CardBlogPost'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'
import api from '../../services/api'


class BlogView extends Component {


    constructor() {
        super()

        this.state = {
            articles: [],
            is_articles_loaded: false
        }
    }

    componentDidMount = async () => {
        const articles = await api.get('/post/list/1')

        this.setState({
            articles: articles.data.docs,
            is_articles_loaded: true
        })
    }

    render() {


        // render articles
        let articlesHtml = ''
        if (this.state.is_articles_loaded) {
            articlesHtml = this.state.articles.map((item) => {
                return (
                    <CardBlogPost post={item} />
                )
            })
        }

        return (
            <>
                <SectionPageTitle />
                <section id="page-content">
                    <div className="container">

                        <div id="blog">

                            <div id="blog" className="post-3-columns m-b-30" data-item="post-item">

                                {articlesHtml}


                            </div>

                        </div>
                    </div>


                </section>
                <Footer />
            </>
        )
    }

}

export default BlogView