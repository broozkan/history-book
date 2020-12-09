import React, {useState} from 'react'


const Pagination = (props) => {

    const [state, setState] = useState({
        clicked_index: 1
    })

    const handleClick = (e) => {

        if(!e){
            return false
        }
        console.log(e.target.dataset.index);
        setState({
            ...state,
            clicked_index: e.target.dataset.index
        })

        props.onClick(e.target.dataset.index)
       
    }
   
    let paginationHtml = []
    for (let index = 0; index < props.object.totalPages; index++) {
        if(index == 0 && !props.object.hasPrevPage){
            paginationHtml.push(
                <li className="disabled page-item"><a className="page-link">Önceki</a></li>
            )
        }else if(index == 0){
            paginationHtml.push(
                <li className="page-item"><a onClick={handleClick} data-index={props.object.page-1} className="page-link">Önceki</a></li>
            )

        }
        
        if(index+1 == state.clicked_index){
            paginationHtml.push(
                <li 
                    data-index={index+1}
                    onClick={() => {
                        props.onClick(index+1)
                        handleClick()
                    }} 
                    className="active page-item"
                >
                    <a className="page-link" onClick={handleClick}  data-index={index+1}>{index+1}</a>
                </li>
            )
        }else{
            paginationHtml.push(
                <li 
                    data-index={index+1}
                    className="page-item"
                >
                    <a className="page-link" onClick={handleClick}  data-index={index+1}>{index+1}</a>
                </li>
            )
        }
        
        console.log(props.object.hasNextPage);
        if(index == (props.object.totalPages-1) && !props.object.hasNextPage){

            paginationHtml.push(
                <li className="disabled page-item"><a className="page-link">Sonraki</a></li>
            )
        }else if(index == (props.object.totalPages-1)){
            paginationHtml.push(
                <li className="page-item"><a onClick={handleClick} data-index={props.object.page+1} className="page-link">Sonraki</a></li>
            )
        }
    }
    

    return(
        <ul className="pagination">
            {paginationHtml}
        </ul>
    )
}

export default Pagination