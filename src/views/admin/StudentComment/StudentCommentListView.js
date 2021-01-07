import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Pagination from '../../../components/Pagination/Pagination'
import Sidebar from '../../../components/Sidebar/Sidebar'
import TableStaff from '../../../components/Table/TableStaff'
import TableStudentComments from '../../../components/Table/TableStudentComments'

const StudentCommentListView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <TableStudentComments />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default StudentCommentListView