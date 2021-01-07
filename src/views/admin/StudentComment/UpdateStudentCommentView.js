import React from 'react'
import HeaderAdmin from '../../../components/Header/HeaderAdmin'
import Sidebar from '../../../components/Sidebar/Sidebar'
import FormStudentComment from '../../../components/Form/FormStudentComment'

const UpdateStudentCommentView = (props) => {

    return (
        <>
            <Sidebar />
            <div className="body-inner">
                <HeaderAdmin />
                <section id="section1" className="background-grey">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card-header">
                                    <span class="h4">
                                        Öğrenci Yorumunu Düzenle
                                    </span>
                                    <p class="text-muted">Yorumu düzenleyebilirsiniz</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <FormStudentComment student_comment_id={props.match.params.studentCommentId} />
                                <a href="/admin/student-comment/list" className="btn btn-primary mt-3">Geri Dön</a>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UpdateStudentCommentView