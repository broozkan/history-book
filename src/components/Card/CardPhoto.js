import React from 'react'
import { Component } from 'react';


class CardPhoto extends Component {

    render() {
        return (
            <div class="grid-item">
                <a class="image-hover-zoom" href={process.env.REACT_APP_API_ENDPOINT + "/file/" + this.props.photo.name} data-lightbox="gallery-image">
                    <img src={process.env.REACT_APP_API_ENDPOINT + "/file/"+this.props.photo.name} />
                </a>
            </div>
        )
    }
}

export default CardPhoto