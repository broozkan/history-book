import React from 'react'
import { Component } from 'react';

class CardInstitue extends Component {

    constructor() {
        super()

        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick = (e) => {
        this.props.onClick(e)
    }

    render() {

        if (this.props.isActive == 'active') {
            return (
                <a href="#" className="text-center donate-institute" data-id={this.props.institute._id} onClick={this.handleOnClick}>
                    <img src={`${process.env.REACT_APP_API_ENDPOINT}file/${this.props.institute.institute_photo}`} className="w-75 mt-3 active" alt="" />
                </a>
            )
        } else {
            return (
                <a href="#" className="text-center donate-institute" data-id={this.props.institute._id} onClick={this.handleOnClick}>
                    <img src={`${process.env.REACT_APP_API_ENDPOINT}file/${this.props.institute.institute_photo}`} className="w-75 mt-3" alt="" />
                </a>
            )
        }


    }
}

export default CardInstitue