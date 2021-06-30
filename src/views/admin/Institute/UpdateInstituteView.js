import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormInstitute from '../../../components/Form/FormInstitute'

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
                            <FormInstitute institute_id={props.match.params.instituteId} />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default UpdateStudentView