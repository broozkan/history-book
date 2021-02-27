import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormCategory from '../../../components/Form/FormCategory'

const NewCategoryView = () => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <FormCategory />
                        </div>
                        
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default NewCategoryView