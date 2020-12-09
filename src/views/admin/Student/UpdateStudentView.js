import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormStudent from '../../../components/Form/FormStudent'

const UpdateStudentView = (props) => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <FormStudent student_id={props.match.params.studentId} />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default UpdateStudentView