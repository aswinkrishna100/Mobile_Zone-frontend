import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { ResetPasswordAPI } from '../../services/allAPI'

function ForgotPassword() {

    const [email,setEmail] = useState()

    const handleSend = async()=>{  
        if(!email){
            alert("Please Enter the Email")
        }else{
            const result = await ResetPasswordAPI(email)
            if(result.status == 200){
                alert("Email Sented")
            }else{
                alert("Email not Sented")
                console.log(result);
            }
        }     
    }

  return (
    <div>
        <Row>
            <Col></Col>
            <Col>
            <Form>
                <h1 className='text-center'>Forgot Password</h1>
                <input type="email" className='form-control mb-3 mt-2' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
                <button className='btn btn-primary' onClick={handleSend}>Sent Email</button>
            </Form>
            </Col>
            <Col></Col>
        </Row>
    </div>
  )
}

export default ForgotPassword
