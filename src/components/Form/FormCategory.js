import React, { useState } from 'react'
import { Component } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'

class FormCategory extends Component {

    constructor() {
        super()

        this.state = {
            category_name: '',
            category_type: 'photo_gallery',
            is_category_main: true,
            category_upper_category: [],
            categories: [],
            is_categories_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCategories = this.getCategories.bind(this)
        this.getCategory = this.getCategory.bind(this)
    }


    componentDidMount = () => {
        if (this.props.category_id) {
            this.getCategories()
            this.getCategory()
        }
    }


    getCategory = async () => {

        const category = await api.get('/category/get/'+this.props.category_id)
        console.log(category);
        this.setState({
            category_name: category.data.category_name,
            category_type: category.data.category_type,
            is_category_main: category.data.is_category_main,
            category_upper_category: category.data.category_upper_category
        })
    }


    getCategories = async () => {

        const categories = await api.get('/category/list/1')

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }

    handleOnChange = (e) => {

        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked
            })


            if (e.target.name === "is_category_main" && e.target.checked == false) {
                if (this.state.categories.length < 1) {
                    this.getCategories()
                }
            }else{
                this.setState({
                    category_upper_category: []
                })
            }
        } else if (e.target.type === "select-one"){

            let categoryUpperCategory = new Array()

            this.state.categories.map((item) => {
                if (e.target.value == item._id) {
                    categoryUpperCategory.push(item)
                }
            })


            this.setState({
                category_upper_category: categoryUpperCategory
            })

        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        console.log(this.state);
    }


    handleSubmit = async (e) => {
        e.preventDefault()

        let submitResponse = ''
        if (this.props.category_id) {
            submitResponse = await api.put('/category/update/'+this.props.category_id, this.state)
        }else{
            submitResponse = await api.post('/category/new', this.state)
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: "Başarılı",
                text: "Kategori kaydedildi",
                icon: "success"
            })

        } else {
            Swal.fire({
                title: "Başarılı",
                text: submitResponse.data.responseData,
                icon: "error"
            })
        }

    }


    render() {


        // render upper categories
        let upperCategoriesHtml = ''
        if (!this.state.is_category_main) {
            let categoriesOptionListHtml = ''
            if (this.state.is_categories_loaded) {
                categoriesOptionListHtml = this.state.categories.map((item) => {
                    return (
                        <option value={item._id}>{item.category_name}</option>
                    )
                })
            }

            let value = ''
            if (this.state.category_upper_category[0]) {
                value = this.state.category_upper_category[0]._id
            }

            upperCategoriesHtml = (
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category_upper_category">Üst Kategori (*)</label>
                        <select className="form-control" onChange={this.handleOnChange} value={value} name="category_upper_category" name="category_upper_category" id="category_upper_category" required >
                            {categoriesOptionListHtml}
                        </select>
                    </div>
                </div>
            )
        }


        return (
            <div className="card">
                <div className="card-header">
                    <span className="h4">Kategori Formu</span>
                    <p className="text-muted">Yeni kategori ekleyebilir veya mevcut kategorilerinizi düzenleyebilirsiniz.</p>
                </div>
                <div className="card-body">
                    <form id="form1" className="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div className="h5 mb-4">Kategori Bilgileri</div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="category_name">Adı (*)</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} value={this.state.category_name} name="category_name" id="category_name" placeholder="Kategori adını giriniz" required="" />
                            </div>

                        </div>
                        <fieldset class="form-group">
                            <div class="row">
                                <div class="col-sm-10">
                                    <div class="custom-controls-stacked">
                                        <label class="custom-control custom-radio">
                                            <input name="category_type" onChange={this.handleOnChange} value="photo_gallery" type="radio" class="custom-control-input" checked={this.state.category_type === "photo_gallery"} />
                                            <span class="custom-control-label">Fotoğraf Galerisi Kategorisi</span>
                                        </label>
                                        <label class="custom-control custom-radio">
                                            <input name="category_type" onChange={this.handleOnChange} value="post" type="radio" class="custom-control-input" checked={this.state.category_type === "post"} />
                                            <span class="custom-control-label">Yazı Kategorisi</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <label class="custom-control custom-checkbox m-0">
                                    <input type="checkbox" name="is_category_main" onChange={this.handleOnChange} checked={this.state.is_category_main} class="custom-control-input" />
                                    <span class="custom-control-label">Herhangi bir kategorinin alt kategorisi olmayacak</span>
                                </label>
                            </div>
                        </div>
                        {upperCategoriesHtml}



                        <button type="submit" className="btn m-t-30 mt-3">Kaydet</button>
                        <a href="/admin/category/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                    </form>
                </div>
            </div>
        )
    }

}

export default FormCategory