import { useContext, useEffect, useState } from "react"
import { getUsersAPI } from "../../services/allAPI"
import { EditContext } from "../../context/EditContext"

function ViewUsers() {

  const [user,setUser] = useState([])
    // const {editResponse} = useContext(EditContext)

  const getUserDetails = async()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      var reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }else{
      alert("Unauthorized User")
    }
    const result = await getUsersAPI(reqHeader)
    if(result.status  == 200){
      setUser(result.data)
    }
  }

  useEffect(()=>{
    getUserDetails()
  },[])
  
  return (
    <div id="divtable">
      <h3 className='text-center mb-3 mt-5'>Registered Users Details</h3>
      <table className='w-75 m-5 shadow table table-bordered' id="table">
        <thead className='text-center'>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
        {
          user?.length > 0 ?
          user.map((item,index)=>(
            <tr className='text-center' key={index}>
              <td>{item.fname}</td>
              <td>{item.lname}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
            </tr>
          )):"Nothing to display"
        }
        
        </tbody>
      </table>
    </div>
  )
}

export default ViewUsers
