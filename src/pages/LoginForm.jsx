import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserLogin } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginForm() {
  const [user,setUser] = useState({
    email :"",
    password :""
  })
  const navigate = useNavigate()
  

  const userLogin =async()=>{
    const result = await UserLogin(user)
    if(result?.status == 200){
      sessionStorage.setItem('user',JSON.stringify(result?.data.existingUser))
      sessionStorage.setItem('token',result.data.token)
      toast.success('Login Successfully')
      if(result?.data.existingUser.role === 1){
        navigate('/dashboard')
      }else{
        navigate('/')
      }
    }else{
      toast.error('Incorrect Email and Password')
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center flex-column w-100' style={{height:"80vh"}}>
      <div className="row shadow-lg">
        <div className="col">
            <img className="img-fluid w-100"src="https://media.istockphoto.com/id/1135341047/vector/login-page-on-laptop-screen-notebook-and-online-login-form-sign-in-page-user-profile-access.jpg?s=612x612&w=0&k=20&c=EsJEsevxVZujj_IU_nLz4tZcvmcXTy7sQt03bpfz3ZQ="  />
        </div>
        <div className="col d-flex align-items-center flex-column justify-content-top">
            <h2 className='mb-3' style={{marginTop:"50px"}}>Login Form</h2>
            <input type="email" className='form-control w-75 mb-3' placeholder='Enter Email ID' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password" className='form-control w-75 mb-3' placeholder='Enter Password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <Link className='mb-2'>Forgot Password?</Link>
            <button className='btn btn-primary mb-2' onClick={userLogin}>Login</button>
            <Link to={'/register'} className='d-flex'>Create New<p className='text-dark'>?</p></Link>
            <GoogleLogin
  onSuccess={credentialResponse => {
    const decoded = jwtDecode(credentialResponse?.credential)
    console.log(decoded);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginForm
