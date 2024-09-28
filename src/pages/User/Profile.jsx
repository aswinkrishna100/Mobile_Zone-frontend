import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function Profile() {
    const [show, setShow] = useState(false);
    const user = sessionStorage.getItem('user')    
    
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
          <button className='btn btn-secondary' style={{marginLeft:"300px"}} ><i class="fa-solid fa-pen-to-square"></i></button>
        </Modal.Header>
        <Modal.Body>
            <div className='fs-4 fw-large text center' id='profileimage'></div>
            <Form.Label>Name</Form.Label>
            <input type="text" className='form-control mb-3' disabled/>
            <Form.Label>Email</Form.Label>
            <input type="email" className='form-control mb-3' disabled/>
            <Form.Label>Address</Form.Label>
            <textarea className='form-control mb-3' disabled></textarea>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default Profile
// style={{width:"100", height:"50px", borderRadius:"25px"}}