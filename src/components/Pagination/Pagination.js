import React from 'react'


const Pagination = () => {
    return (
        <>
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Önceki</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item active"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item"><a class="page-link" href="#">Sonraki</a></li>
            </ul>
            <select className="form-control form-control-sm item-per-page float-right w-10">
                <option value="25">25</option>
            </select>
        </>
    )
}

export default Pagination