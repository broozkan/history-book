import React from 'react'

const CardBlogPost = () => {
    return (
        <div className="post-item blog-post-item border p-3">
            <div className="post-item-wrap">
                <div className="post-image">
                    <a href="#">
                        <img alt="" src="images/blog/12.jpg" />
                    </a>
                    <span className="post-meta-category"><a href="#">Etkinlikler</a></span>
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
                        <a href="#">
                            20. Dönem Mezunlar Buluşması
                            </a>
                    </h2>
                    <p>
                        Curabitur pulvinar euismod ante, ac sagittis ante posuere ac. Vivamus luctus
                        commodo dolor porta feugiat. Fusce at velit id ligula pharetra laoreet.
                                        </p>
                    <a href="#" className="item-link">Devamını Oku... <i className="fa fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    )
}

export default CardBlogPost