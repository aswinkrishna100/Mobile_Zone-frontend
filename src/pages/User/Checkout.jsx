import React, { useEffect, useState } from 'react'
import { DeleteCartbyOrderAPI, OrdersAPI, paymentAPI } from '../../services/allAPI'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout({orders,total}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [responseId,setResponseId] = useState("")
    const [address,setAddress] = useState("")

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("user"))
        setAddress(user.address)
    },[])
    
    

    const loadScript = (src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src = src

            script.onload = ()=>{
                resolve(true)
            }

            script.onerror=()=>{
                resolve(false)
            }

            document.body.appendChild(script)
        })
    }

    const createRazorpayOrder = async(amount)=>{
        if(!address){
            toast.warning("Please Enter your Address")
        }else{
        const token = sessionStorage.getItem('token')
        if(token){
        var reqHeader = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        }else{
        alert("Unauthorized User")
        }

        const reqBody = {
            amount : amount*100
        }

        const result = await paymentAPI(reqBody,reqHeader)        
        if(result.status == 200){
            handleRazorpayScreen(result.data.amount)
        }else{
            console.log(result);
        }
    }
    }

    const handleRazorpayScreen = async(amount)=>{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert("Some Error at Razorpay Screen Loading")
        }

        const options = {
            key : 'rzp_test_YWob3NoKy2p5h6',
            amount : amount,
            currency:"INR",

            handler: function(result){
                setResponseId(result.razorpay_payment_id)
                placeOrders(result.razorpay_payment_id)
            },

        theme : {
            color : "#F4C430"
        }
    }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const placeOrders = async(paymentId)=>{
        
        const user = JSON.parse(sessionStorage.getItem("user"))
        const token = sessionStorage.getItem('token')
        if(token){
        var reqHeader = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        }else{
        alert("Unauthorized User")
        }

        const reqBody = {
            productid : orders?.map(item=>item.productid),
            payment_id : paymentId,
            amount : total,
            address : address
        }

        const result = await OrdersAPI(reqBody,reqHeader,user._id)
        handleClose()
        if(result.status == 200){
            handleDelete()
        }else{
            console.log(result);
            
        }
    }

    const handleDelete = async()=>{
        const user = JSON.parse(sessionStorage.getItem("user"))
        const token = sessionStorage.getItem('token')
        if(token){
        var reqHeader = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        }else{
        alert("Unauthorized User")
        }
        const result = await DeleteCartbyOrderAPI(reqHeader,user._id)
    }
        
  return (

    <div>
    <Button variant="success" onClick={handleShow}>Checkout</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                !address?
                <input type="text" className='form-control' placeholder='Address'onChange={(e)=>setAddress(e.target.value)} />
                 :
                <input type="text" className='form-control' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} />
             } 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="success"  onClick={()=>createRazorpayOrder(total)}>Proceed to Checkout</Button>
        </Modal.Footer>
      </Modal>
        <ToastContainer/>
    </div>
  )
}

export default Checkout
