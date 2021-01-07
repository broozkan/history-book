import React, {useState, createContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

export const AdminUserContext = createContext()

export const AdminUserContextWrapper = (props) => {


    const [state, setState] = useState({
        is_logged_in: false
    })

    const history = useHistory()

    useEffect(()=>{
        const user = localStorage.getItem('admin-token')

        if (user) {
            setState({
                is_logged_in: true
            })
        }else{
            history.push('/admin/user/login')
        }
    },[])


    const updateState = (key, val, callBack) => {
        setState({
            ...state,
            [key] : val
        })

        callBack(state)
    }
    console.log(state);

    return(
        <AdminUserContext.Provider value={{state: state, updateState: updateState}}>
            {props.children}
        </AdminUserContext.Provider>
    )

}
