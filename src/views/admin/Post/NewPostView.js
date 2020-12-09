import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormPost from '../../../components/Form/FormPost'

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
                            <FormPost />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default NewStudentView