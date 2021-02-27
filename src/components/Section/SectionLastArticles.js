import React from 'react'
import { Component } from 'react'
import api from '../../services/api'
import CardBlogPost from '../Card/CardBlogPost'


class SectionLastArticles extends Component {


    constructor(){
        super()

        this.state = {
            articles: [],
            is_articles_loaded: false
        }
    }

    componentDidMount = async () => {
        const articles = await api.get('/post/list/1', {},{params: {limit:3}})

        this.setState({
            articles: articles.data.docs,
            is_articles_loaded: true
        })
    }


    

    render(){
    
        // render articles
        let articlesHtml = ''
        if (this.state.is_articles_loaded) {
            articlesHtml = this.state.articles.map((item) => {
                return(
                    <CardBlogPost post={item} />
                )
            })
        }

    
        return (
            <section id="section4">
                <div className="container">
                    <div className="heading-text heading-section text-center m-b-40">
                        <h2 className="m-b-0">YAZI KÖŞEMİZ</h2>
                        <span className="lead">İletişim halinde olalım istiyoruz</span>
                    </div>
                    <div id="blog">
    
                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">
    
                            {articlesHtml}
    
    
                        </div>
    
                    </div>
                </div>
            </section>
        )
    }
    
}

export default SectionLastArticles