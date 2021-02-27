import React from 'react'
import { Component } from 'react'

class CardBlogPost extends Component {

    

    render() {
        return (
            <div className="post-item blog-post-item border p-3">
                <div className="post-item-wrap">
                    <div className="post-image">
                        <a href={"/blog/detay/"+this.props.post._id}>
                            <img alt="" src={process.env.REACT_APP_API_ENDPOINT+"/file/"+this.props.post.post_photo} />
                        </a>
                        <span className="post-meta-category"><a href="#">{this.props.post.post_category[0].category_name}</a></span>
                    </div>
                    <div className="post-item-description">
                        <span className="post-meta-date">
                            <i className="fa fa-calendar-o"></i>
                            28.12.2020
                            </span>
                        <span className="post-meta-comments">
                            <a href="#">
                                <i className="fa fa-comments-o"></i>
                                33  Yorum
                                </a>
                        </span>
                        <h2>
                            <a href={"/blog/detay/"+this.props.post._id}>
                            {this.props.post.post_title}
                                </a>
                        </h2>
                        <p>
                        {this.props.post.post_alternative_title}
                                            </p>
                        <a href={"/blog/detay/"+this.props.post._id} className="item-link">Devamını Oku... <i className="fa fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardBlogPost