import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function ResetPassword() {
   const {token} = useParams() 
   const [message, setMessage] = useState("")
   useEffect(()=>{
    const decoded = jwtDecode(token)
    const date = Date.now() /1000
    if(date > decoded.exp){
        setMessage("The link has been expired! Please resend..")
    }
   },[])

  return (
    <div>
      <Row>
            <Col></Col>
            <Col>
           { 
             message? <p>{message}</p> :
            <Form>
                <h1 className='text-center'>Reset Password</h1>
                <input type="password" className='form-control mb-3 mt-2' placeholder='New Password'/>
                <input type="password" className='form-control mb-3' placeholder='Confirm Password'/>
                <button className='btn btn-primary'>Save</button>
            </Form>}
            </Col>
            <Col></Col>
        </Row>
    </div>
  )
}

export default ResetPassword
