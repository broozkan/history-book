import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation

} from 'react-router-dom'
import DashboardView from '../views/admin/Dashboard/DashboardView'

import NewStudentView from '../views/admin/Student/NewStudentView'
import StudentListView from '../views/admin/Student/StudentListView'
import UpdateStudentView from '../views/admin/Student/UpdateStudentView'

import StaffListView from '../views/admin/Staff/StaffListView'
import NewStaffView from '../views/admin/Staff/NewStaffView'
import UpdateStaffView from '../views/admin/Staff/UpdateStaffView'

import PostListView from '../views/admin/Post/PostListView'
import NewPostView from '../views/admin/Post/NewPostView'
import UpdatePostView from '../views/admin/Post/UpdatePostView'
import LoginView from '../views/admin/User/LoginView'
import ImportStudentsFromExcelView from '../views/admin/Excel/ImportStudentsFromExcelView'
import ImportStaffsFromExcelView from '../views/admin/Excel/ImportStaffsFromExcelView'
import { AdminUserContext, AdminUserContextWrapper } from '../contexts/AdminUserContext'
import LogoutView from '../views/admin/User/LogoutView'
import StudentCommentListView from '../views/admin/StudentComment/StudentCommentListView'
import UpdateStudentCommentView from '../views/admin/StudentComment/UpdateStudentCommentView'

const RouterAdmin = () => {
    
    const location = useLocation()

    return (
        <body className="side-panel side-panel-static">
            <Router>

                <Switch>
                    <Route path="/admin/user/login" exact component={LoginView}></Route>
                    <Route path="/admin/user/logout" exact component={LogoutView}></Route>
                    <AdminUserContextWrapper>
                        <Route path="/admin" exact component={DashboardView}></Route>

                        <Route path="/admin/student/new" exact component={NewStudentView}></Route>
                        <Route path="/admin/student/list" exact component={StudentListView}></Route>
                        <Route path="/admin/student/update/:studentId" exact component={UpdateStudentView}></Route>

                        <Route path="/admin/staff/list" exact component={StaffListView}></Route>
                        <Route path="/admin/staff/new" exact component={NewStaffView}></Route>
                        <Route path="/admin/staff/update/:staffId" exact component={UpdateStaffView}></Route>

                        <Route path="/admin/post/list" exact component={PostListView}></Route>
                        <Route path="/admin/post/new" exact component={NewPostView}></Route>
                        <Route path="/admin/post/update/:postId" exact component={UpdatePostView}></Route>

                        <Route path="/admin/student-comment/list" exact component={StudentCommentListView}></Route>
                        <Route path="/admin/student-comment/update/:studentCommentId" exact component={UpdateStudentCommentView}></Route>


                        <Route path="/admin/excel/import/student" exact component={ImportStudentsFromExcelView}></Route>
                        <Route path="/admin/excel/import/staff" exact component={ImportStaffsFromExcelView}></Route>
                    </AdminUserContextWrapper>



                </Switch>
            </Router>
        </body>

    )

}

export default RouterAdmin