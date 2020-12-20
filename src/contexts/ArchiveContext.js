import React, {useState, createContext, useEffect} from 'react'

export const ArchiveContext = createContext()

export const ArchiveContextWrapper = (props) => {


    const [state, setState] = useState({
        search_results: []
    })


    const updateState = (key, val) => {
        setState({
            ...state,
            [key] : val
        })
    }

    return(
        <ArchiveContext.Provider value={{state: state, updateState: updateState}}>
            {props.children}
        </ArchiveContext.Provider>
    )

}
