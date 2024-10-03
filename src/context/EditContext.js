import { createContext, useState } from "react";


const EditContext = createContext()
function AdminProvider(props){
    const [editResponse,setEditResponse]= useState("")
    const [profileResponse,setProfileResponse] = useState("")

    return(
        <div>
            <EditContext.Provider value={{editResponse,setEditResponse,profileResponse,setProfileResponse}}>
                {props.children}
            </EditContext.Provider>
        </div>
    )
}
export {EditContext,AdminProvider}
