import React from 'react'
import { Component } from 'react';
import donatePng from '../../images/donate.png'

class WidgetDonate extends Component {
    render() {
        return (
            <div className="widget-donate">
                <a href="/bagis"><img src={donatePng} className="widget-donate" width="150" /></a>
            </div>
        )
    }
}

export default WidgetDonate