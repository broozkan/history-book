import React,{useState, useEffect} from 'react'
import api from '../../services/api'


const SelectCategory = () => {
    const [state, setState] = useState({
        categories : [],
        is_categories_loaded: false
    })    

    useEffect(()=>{
        getCategories()
    },[])


    const getCategories = () => {
        const submitResponse = api.get('/category/list/1')

        setState({
            ...state,
            categories: submitResponse.data.docs,
            is_categories_loaded: true
        })
    }

    // render categories
    let categoriesHtml = ''
    if(state.is_categories_loaded){
        categoriesHtml = state.categories.map((item)=>{
            <option value={item._id}>{item.category_name}</option>
        })
    }

    return(
        <>
            {categoriesHtml}
        </>
    )
}
export default SelectCategory