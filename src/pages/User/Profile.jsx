import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../../services/allAPI';
import { EditContext } from '../../context/EditContext';
import { BASE_URL } from '../../services/baseURL';

function Profile() {
    const [show, setShow] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [edit,setEdit] = useState(false)
    const [editUser,setEditUser] = useState({
      fname : user.fname,
      lname : user.lname,
      email : user.email,
      address : user.address,
      profileImage :""
    })

    const [preview, setPreview] = useState()

    const handleEdit = ()=>{
      setEdit(true)
    }

    useEffect(()=>{
      if(editUser.profileImage){
        setPreview(URL.createObjectURL(editUser.profileImage))
      }
    },[editUser.profileImage])


    const handleUpdate = async()=>{
      const {fname,lname,email,address} = editUser
      if(!fname || !lname || !email || !address  ){
        toast.warning("Please fill the form Completely")
      }else{
        const user = JSON.parse(sessionStorage.getItem('user'))
        console.log(user);
        
        const reqBody = new FormData()
        reqBody.append("fname",fname)
        reqBody.append("lname",lname)
        reqBody.append("email",email)
        reqBody.append("address",address)
        editUser.profileImage? reqBody.append("profileImage",editUser.profileImage)
        : reqBody.append("profile",user.profile)
        const token = sessionStorage.getItem('token')
        if(token){
          var reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization": `Bearer ${token}`
          }      
        }else{
          alert("Unauthorized User")
        }
        const result = await editUserAPI(user._id,reqBody,reqHeader)
        if(result.status == 200){
          toast.success('Profile Updated')
          sessionStorage.setItem('user',JSON.stringify(result?.data))
          setShow(false)
          setEdit(false)
        }else{
          toast.error('Error')
          console.log(result);
        }
      }
    }

    
  return (
    <div>
        <button id='profile'  className='ms-2 fs-5 fw-large text-center mt-1' onClick={() => setShow(true)}><i class="fa-solid fa-user"></i></button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Profile</Modal.Title>
          <button className='btn btn-secondary' style={{marginLeft:"300px"}} onClick={handleEdit}><i class="fa-solid fa-pen-to-square"></i></button>
        </Modal.Header>
        <Modal.Body>
            <Form.Label>
              {
                !editUser.profileImage ?
                <>
                  <input type="file" style={{display:'none'}}  onChange={(e)=>setEditUser({...editUser,profileImage:e.target.files[0]})} disabled={edit ? false : true}/>
                  <img style={{height:"150px"}} src={user?`${BASE_URL}/uploads/${user.profile}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="image" />
                </>
                :
                <>
                  <input type="file" style={{display:'none'}}  onChange={(e)=>setEditUser({...editUser,profileImage:e.target.files[0]})} disabled={edit ? false : true}/>
                  <img style={{height:"150px"}} src={preview?preview:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="image" />
               </>
              }
            </Form.Label> 
            <input type="text" className='form-control mb-3' value={editUser.fname}  disabled={edit ? false : true} onChange={(e)=>setEditUser({...editUser,fname:e.target.value})}/>
            <Form.Label>Last Name</Form.Label>
            <input type="text" className='form-control mb-3' value={editUser.lname}  disabled={edit ? false : true} onChange={(e)=>setEditUser({...editUser,lname:e.target.value})}/>
            <Form.Label>Email</Form.Label>
            <input type="email" className='form-control mb-3' value={editUser.email}  disabled={edit ? false : true} onChange={(e)=>setEditUser({...editUser,email:e.target.value})}/>
            <Form.Label>Address</Form.Label>
            <textarea className='form-control mb-3' value={editUser.address} disabled={edit ? false : true} onChange={(e)=>setEditUser({...editUser,address:e.target.value})}></textarea>
            {
              edit ?
              <button className='btn btn-success' onClick={handleUpdate}>Save</button>
              :
              <button className='btn btn-success' hidden>Save</button>
            }
        </Modal.Body>
      </Modal>
    <ToastContainer/>
    </div>
  )
}

export default Profile
