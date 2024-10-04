import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPasswordAPI } from '../../services/allAPI';

function ResetPassword() {
   const {token} = useParams() 
   const [message, setMessage] = useState("")
   const [password,setPassword] = useState()
   const [confirmPassword,setConfirmPassword] = useState()
   const navigate = useNavigate()

   useEffect(()=>{
    const decoded = jwtDecode(token)
    const date = Date.now() /1000
    if(date > decoded.exp){
        setMessage("The link has been expired! Please resend..")
    }
   },[])

   const handleSet = async(e)=>{
    e.preventDefault()
    if(!password || !confirmPassword){
      toast.warning("Please fill the Form Completely")
    }else{
      if(password == confirmPassword){
        const reqBody = {
          token ,
          password : confirmPassword
        }
        const result = await setPasswordAPI(reqBody)
        console.log(result);
        
        if(result.status === 200){
          toast.success("Password Updated")
          navigate('/login')
        }else{
          toast.error("Error")
          console.log(result);
        }
      }else{
        toast.warning("Incorrect Password")
      }
    }
   }

  return (
    <div>
      <Row>
            <Col></Col>
            <Col>
           { 
             message? <p>{message}</p> :
            <Form>
                <h1 className='text-center'>Reset Password</h1>
                <input type="password" className='form-control mb-3 mt-2' placeholder='New Password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" className='form-control mb-3' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <button className='btn btn-primary' onClick={(e)=>handleSet(e)}>Save</button>
            </Form>}
            </Col>
            <Col></Col>
        </Row>
        <ToastContainer/>
    </div>
  )
}

export default ResetPassword
