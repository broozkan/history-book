import React from 'react'
import { Component } from 'react';


class WidgetDonate extends Component{
    render() {
        return (
            <div className="widget-donate">
                <h4>Bağış Yap!</h4>
                <a href="/bagis" class="btn btn-success btn-donate"><i class="fa fa-heart fa-3x"></i></a>
            </div>
        )
    }
}

export default WidgetDonate