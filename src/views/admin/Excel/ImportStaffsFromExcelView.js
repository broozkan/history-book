import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormImportStaffsFromExcel from '../../../components/Form/FormImportStaffs'

const ImportStaffsFromExcelView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <FormImportStaffsFromExcel />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default ImportStaffsFromExcelView