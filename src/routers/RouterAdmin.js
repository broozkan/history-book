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

const RouterAdmin = () => {
    const location = useLocation()
    console.log(location.pathname);
        console.log("router admin");
    return (
        <body className="side-panel side-panel-static">
            <Router>
            
            <Switch>
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
            </Switch>
        </Router>
        </body>
        
    )

}

export default RouterAdmin