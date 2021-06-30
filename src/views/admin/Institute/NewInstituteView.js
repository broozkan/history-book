import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormInstitute from '../../../components/Form/FormInstitute'

const NewStudentView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <FormInstitute />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default NewStudentView