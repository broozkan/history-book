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

                <Route path="/admin/staff/list" exact component={StaffListView}></Route>
                <Route path="/admin/staff/new" exact component={NewStaffView}></Route>
            </Switch>
        </Router>
        </body>
        
    )

}

export default RouterAdmin