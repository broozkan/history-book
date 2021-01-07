import React, {useState, createContext, useEffect} from 'react'

export const ArchiveContext = createContext()

export const ArchiveContextWrapper = (props) => {


    const [state, setState] = useState({
        search_results: [],
        object: '',
        is_commenting: false
    })


    const updateState = (key, val, callBack) => {
        setState({
            ...state,
            [key] : val
        })

        callBack(state)
    }

    console.log(state);

    return(
        <ArchiveContext.Provider value={{state: state, updateState: updateState}}>
            {props.children}
        </ArchiveContext.Provider>
    )

}
