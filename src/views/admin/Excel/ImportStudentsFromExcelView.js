import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormStudent from '../../../components/Form/FormStudent'
import FormImportStudentsFromExcel from '../../../components/Form/FormImportStudents'

const ImportStudentsFromExcelView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <FormImportStudentsFromExcel />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default ImportStudentsFromExcelView