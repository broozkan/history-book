import React from 'react'
import { Component } from 'react';
import api from '../../services/api';


class CardPhotoCategory extends Component {


    constructor() {
        super()

        this.state = {
            categories: [],
            is_categories_loaded: false
        }
    }




    render() {

        return (
            <>
                <div className="col-lg-4" onClick={this.props.onClick} data-ismain={this.props.category.is_category_main} data-id={this.props.category._id}>
                    <div class="call-to-action call-to-action-dark">
                        <h3>
                            {this.props.category.category_name}
                        </h3>
                    </div>
                </div>
            </>

        )
    }

}

export default CardPhotoCategory