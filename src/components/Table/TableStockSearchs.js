import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'


const TableStockSearchs = (props) => {

    const [state, setState] = useState({
        stock_searchs: [],
        filter_visibility: false,
        pagination_info: [],
        checked_items: [],
        is_stock_searchs_loaded: false
    })


    useEffect(() => {
        getStockSearchs()
    }, [])




    const getStockSearchs = async (page = 1, filters = {}) => {
        setState({
            ...state,
            is_stock_searchs_loaded: false
        })


        const stock_searchs = await api.get('/stock-search/list/' + page, { params: filters, headers: { 'site-token': localStorage.getItem('site-token')} })

        setState({
            ...state,
            stock_searchs: stock_searchs.data.docs,
            pagination_info: stock_searchs.data,
            is_stock_searchs_loaded: true
        })

    }


    const handleOnClick = async (e) => {

        e.preventDefault()

        const stockSearchInformations = await api.get('/stock-search/get/'+e.target.dataset.id)

        props.setStockSearchState(stockSearchInformations.data)

    }


    const handleDeleteClick = async (e) => {
        e.preventDefault()
        
        Swal.fire({
            title: 'Arama kartınızı silmek istediğinize emin misiniz?',
            showCancelButton: true,
            confirmButtonText: `Sil`,
            denyButtonText: `Vazgeç`,
          }).then( async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              
                const submitResponse = await api.delete('/stock-search/delete/'+e.target.dataset.id)

                if(submitResponse.data.response){
                    Swal.fire({
                        title: 'Başarılı',
                        text: 'Arama kartınız silindi',
                        icon: 'success'
                    })
                    getStockSearchs()
                }else{
                    Swal.fire({
                        title: 'Hata',
                        text: submitResponse.data.responseData,
                        icon: 'error'
                    })
        
                }

            }
          })

        

      

    }


    let loaderHtml = ''
    if (!state.is_stock_searchs_loaded) {
        loaderHtml = <CardLoader />
    }


    // render table content
    let tableContentHtml = ''
    if (state.is_stock_searchs_loaded) {
        tableContentHtml = state.stock_searchs.map((item, index) => {

            return (
                <tr>
                    <td>{item.stock_search_card_name}</td>
                    <td>
                        <a href="#" onClick={handleOnClick} data-id={item._id}>Görüntüle</a>
                        <a href="#" className="ml-2 text-danger" data-id={item._id} onClick={handleDeleteClick}>Sil</a>
                    </td>
                </tr>
            )
        })
    }

    return (
        <table class="table table-sm  text-center tbl-stock-searchs">
            <tbody>
                {tableContentHtml}
            </tbody>
        </table>

    )
}

export default TableStockSearchs