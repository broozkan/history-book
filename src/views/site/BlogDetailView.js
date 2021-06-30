import React from 'react'
import { Component } from 'react'
import CardBlogPost from '../../components/Card/CardBlogPost'
import Footer from '../../components/Footer/Footer'
import SectionPageTitle from '../../components/Section/SectionPageTitle'
import SpinLoader from '../../components/Loader/SpinLoader';
import api from '../../services/api'

class BlogDetailView extends Component {

    constructor() {
        super()

        this.state = {
            post: '',
            is_post_loaded: false
        }
    }


    async componentDidMount() {
        const post = await api.get('/post/list/1', { params: { '_id': this.props.match.params.postId } })

        this.setState({
            post: post.data.docs[0],
            is_post_loaded: true
        })
    }

    render() {

        let postContentJsx = <SpinLoader />
        if (this.state.is_post_loaded) {
            postContentJsx = (
                <div id="blog" class="single-post mt-5">
                    <div class="post-item">
                        <div className="row">
                            <div className="col-lg-3">
                                <div class="post-image">
                                    <a href="#">
                                        <img alt="" src={`${process.env.REACT_APP_API_ENDPOINT}file/${this.state.post.post_photo}`} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div class="post-item-wrap">

                                    <div class="post-item-description">
                                        <h2>{this.state.post.post_title}</h2>
                                        <div class="post-meta">
                                            <span class="post-meta-category"><a href=""><i class="fa fa-tag"></i>{this.state.post.post_category[0].category_name}</a></span>
                                        </div>
                                        <h4>
                                            {this.state.post.post_alternative_title}
                                        </h4>
                                        <br></br>

                                        <div dangerouslySetInnerHTML={{ __html: this.state.post.post_content }} />

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            )
        }

        return (
            <>
                <SectionPageTitle />
                <div class="container" >
                    <div class="row" >

                        <div class="content col-lg-12">
                            {postContentJsx}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}

export default BlogDetailView