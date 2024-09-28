import { createContext, useState } from "react";


const EditContext = createContext()
function AdminProvider(props){
    const [editResponse,setEditResponse]= useState("")

    return(
        <div>
            <EditContext.Provider value={{editResponse,setEditResponse}}>
                {props.children}
            </EditContext.Provider>
        </div>
    )
}
export {EditContext,AdminProvider}
