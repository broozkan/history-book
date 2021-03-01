import React from 'react'
import { Component } from 'react';
import googleLogo from '../../images/3.png'

class CardInstitue extends Component {

    render() {
        return (
            <li>
                <a href="#">
                    <img src={googleLogo} alt="" />
                    </a>
            </li>
        )
    }
}

export default CardInstitue