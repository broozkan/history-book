import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormSchool from '../../../components/Form/FormSchool'

const UpdateSchoolView = (props) => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <FormSchool school_id={props.match.params.schoolId} />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default UpdateSchoolView