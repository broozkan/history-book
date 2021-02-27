import React from 'react'
import { Component } from 'react';
import {
    Link,
    Switch,
    BrowserRouter as Router,
    useRouteMatch,
    useParams,
    Route,
    withRouter
} from 'react-router-dom';
import api from '../../services/api';


class CardPhotoCategory extends Component {


    constructor() {
        super()

        this.state = {
            categories: [],
            is_categories_loaded: false,
            is_last_categories_loaded: false
        }

        this.getCategory = this.getCategory.bind(this)
    }


    async componentDidMount() {


        this.getCategory()

    }


    getCategory = async () => {



        let params = {}
        if (this.props.match.params.id != 0) {
            params = { 'category_upper_category._id': this.props.match.params.id }
        } else {
            params = { 'is_category_main': 'true', 'category_type': 'photo_gallery' }
        }

        const categories = await api.get('/category/list/1', { params: params })

        if (categories.data.docs.length < 1) {
            window.location.href = '/fotograf-galerisi-detay/' + this.props.match.params.id
            return false

        }

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }


    render() {

        console.log(this.state);
        let categoriesHtml = ''
        if (this.state.is_categories_loaded) {
            categoriesHtml = this.state.categories.map((item) => {
                return (
                    <>
                        <div className="col-lg-4 card-photo-category">
                            <Link to={this.props.match.url + "/" + item._id}  >
                                <div class={"call-to-action call-to-action-border"}>
                                    <h3>
                                        {item.category_name}
                                    </h3>
                                </div>
                            </Link>
                        </div>

                    </>

                )
            })
            categoriesHtml.push(
                <div className="line"></div>
            )
        }


        return (
            <>
                {categoriesHtml}

                <Switch>
                    <Route path={this.props.match.url + "/:id"} component={CardPhotoCategory}></Route>
                </Switch>
            </>

        )
    }

}

export default withRouter(CardPhotoCategory)