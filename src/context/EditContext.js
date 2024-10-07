import { createContext, useState } from "react";


const EditContext = createContext()
function AdminProvider(props){
    const [editResponse,setEditResponse]= useState("")
    const [profileResponse,setProfileResponse] = useState("")
    const [cartResponse,setCartResponse] = useState("")
    const [orderResponse,setOrderResponse] = useState("")

    return(
        <div>
            <EditContext.Provider value={{editResponse,setEditResponse,profileResponse,setProfileResponse,cartResponse,setCartResponse,orderResponse,setOrderResponse}}>
                {props.children}
            </EditContext.Provider>
        </div>
    )
}
export {EditContext,AdminProvider}
