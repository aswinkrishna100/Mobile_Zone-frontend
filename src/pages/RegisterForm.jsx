import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUserAPI, ResendOtpUser, verifiedUser } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {

    const [FirstName,setFirstName] = useState("")
    const [LastName,setLastName] = useState("")
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [Address,setAddress] = useState("")
    const [Otp,setOtp] = useState("")
    const [FirstNameValid,setFirstNameValid] = useState(true)
    const [LastNameValid,setLastNameValid] = useState(true)
    const [EmailValid,setEmailValid] = useState(true)
    const [PasswordValid,setPasswordValid] = useState(true)
    const [isOtpVerified,setIsOtpVerified] = useState(false)

    const navigate = useNavigate()

    const validateForm = (e) =>{
        const {name,value} = e.target

        if(name =="firstname"){
            if(!!value.match(/^[A-z\s\.]+$/)){
                setFirstName(value)
                setFirstNameValid(true)
            }else{
                setFirstName(value)
                setFirstNameValid(false)
            }            
        }
        else if(name =="lastname"){
            if(!!value.match(/^[A-z\s\.]+$/)){
                setLastName(value)
                setLastNameValid(true)
            }else{
                setLastName(value)
                setLastNameValid(false)
            }
        }
        else if(name =="email"){
            if(!!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){
                setEmail(value)
                setEmailValid(true)
              }else{
                setEmail(value)
                setEmailValid(false)
              }   
        }
        else if(name =="password"){
            if(!!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&amp;^])[A-Za-z\d@.#$!%*?&amp;]{8,15}$/)){
                setPassword(value)
                setPasswordValid(true)
              }else{
                setPassword(value)
                setPasswordValid(false)
              }
        }
    }
    
    const handleRegister=async(e)=>{
      e.preventDefault()
        if(!FirstName || !LastName ||!Address || !Email ||!Password){
          toast.warning("Please fill the Form")
        }else{
          const reqBody = {
            fname: FirstName,
            lname : LastName,
            address : Address,
            email : Email,
            password :Password
          }
          const result = await addUserAPI(reqBody)
          if(result.status==200){
            toast.success("Registration Successfully")
            setIsOtpVerified(true)
          }else{
            toast.error("Error")
            console.log(result);            
          }
        }
    }

    const Emailverify = async (e)=>{
      e.preventDefault()
      const reqBody = {
        email : Email,
        otp : Otp
      }
      if(!Otp){
        toast.warning("Please enter OTP")
      }else{
        const OtpVerify = await verifiedUser(reqBody)
        if(OtpVerify.status==200){
          toast.success("Email Verified ... Please Login")
          navigate('/login')
        }
        else{
          toast.error(OtpVerify?.response.data?.message)
          console.log(OtpVerify);
        }

      }
     
    }

    const ResendOtp = async()=>{
      const reqBody = {
        email : Email,
        otp : Otp
      }
      const OtpResend = await ResendOtpUser(reqBody)
          if(OtpResend.status==200){
            toast.success("OTP Resend Successful")
          }else{
            toast.warning("OTP already Sented")
            console.log(OtpResend);
          }
    }

  return (
    <div>
      <div className="row">
        <div className="col"></div>
          { 
          !isOtpVerified ?
        <div className="col p-5 shadow" style={{marginTop:"100px"}}>
            <h2 className='mb-3 text-center'>Registration Form</h2>
            <input type="text" className='form-control w-100 mb-3' value={FirstName} name='firstname' placeholder='First Name'  onChange={(e)=>validateForm(e)}/>
            { 
            !FirstNameValid &&
            <div className='text-danger'>
              Please Enter a Valid Name
            </div>
            }
            <input type="text" className='form-control w-100 mb-3' value={LastName} name='lastname' placeholder='Last Name'  onChange={(e)=>validateForm(e)}/>
            { 
            !LastNameValid &&
            <div className='text-danger'>
              Please Enter a Valid Name
            </div>
            }
            <textarea type="text" className='form-control w-100 mb-3' placeholder='Address' value={Address} onChange={(e)=>setAddress(e.target.value)} />
            <input type="email" className='form-control w-100 mb-3' value={Email} name='email' placeholder='Email' onChange={(e)=>validateForm(e)}/>
            { 
            !EmailValid &&
            <div className='text-danger'>
              Please Enter a Valid Email ID
            </div>
            }
            <input type="password" className='form-control w-100 mb-3' value={Password} name='password' placeholder='Password'  onChange={(e)=>validateForm(e)}/>
            { 
            !PasswordValid &&
            <div className='text-danger'>
              Please Enter a Strong Password
            </div>
            }
            <button className='btn btn-primary mb-2' onClick={(e)=>handleRegister(e)}>Register</button>
            <Link to={'/login'} className='ms-2'>Existing User?Log In</Link>  
        </div>
          :
        <div className="row">
          <div className="col"></div>
          <div className="col-5 justify-content-center  p-5" style={{height:"100vh"}}>
          <h2 className='mb-3 text-center'>Enter Verification Code</h2>
          <h5>OTP send in your Email : {Email}</h5>
          <input type="text" className='form-control w-75 mt-2 mb-2' value={Otp} onChange={(e)=>setOtp(e.target.value)}/>
          <button className='btn btn-primary me-2 mb-1' onClick={ResendOtp}>Resend</button>
          <button className='btn btn-success' onClick={(e)=>Emailverify(e)}>Verify</button>
          </div>
          <div className="col"></div>
        </div>
        }
        <div className="col"></div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RegisterForm
