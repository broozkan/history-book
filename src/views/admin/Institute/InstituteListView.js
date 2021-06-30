import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Pagination from '../../../components/Pagination/Pagination'
import Sidebar from '../../../components/Sidebar/Sidebar'
import TableInstitute from '../../../components/Table/TableInstitute'

const StudentListView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <TableInstitute />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default StudentListView