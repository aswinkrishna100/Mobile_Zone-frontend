import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReviewsAPI, ViewProductAPI } from '../../services/allAPI';
import { useParams } from 'react-router-dom';

function Review({product}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = JSON.parse(sessionStorage.getItem("user"))
  const [reviews,setReviews] = useState({
    review:"",
    username:user.fname+user.lname
  })

  console.log(reviews.review);

  const reqBody = {
    review : reviews.review,
    username : reviews.username
  }

  const productReview = async()=>{
    if(!reviews.review){
      alert("Please fill the Review ")
    }else{
      const result = await ReviewsAPI(reqBody,product._id)
      console.log(result);
      if(result.status == 200){
        handleClose()
        setReviews({...reviews,review:""})
        alert("Review Uploaded")
      }else{
        console.log(result);
      }    
    }
  }

  return (
    <div>
      <Button variant="dark" onClick={handleShow} >Write a Review  <i class="fa-solid fa-pen"></i></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='fw-bold'><i>Type Review...</i></Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e)=>setReviews({...reviews,review:e.target.value})}/>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="success" onClick={productReview}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Review
