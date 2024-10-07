import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getOrderAPI, getOrderUserAPI } from '../../services/allAPI';
import { Col } from 'react-bootstrap';
import { BASE_URL } from '../../services/baseURL';
import axios from 'axios';
import { EditContext } from '../../context/EditContext';
import { ThemeContext } from '../../context/ThemeContext';

function UserOrders() {

    const [orders,setOrders] = useState([])
    const {setOrderResponse} = useContext(EditContext)
    const {darkMode} = useContext(ThemeContext)

    useEffect(()=>{
        getOrderDetails()
    },[setOrderResponse])

    const getOrderDetails = async()=>{
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

        const result = await getOrderUserAPI(reqHeader,user._id)        
        if(result.status == 200){
            setOrders(result.data)
        }
    }
    const paymentSlip = async(payment_id)=>{
        try{
            const pdfResponse = await axios.post(`${BASE_URL}/paymentSlip/download`,{payment_id:payment_id},{ responseType: 'blob'})
            const url = window.URL.createObjectURL(new Blob([pdfResponse.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('Download',`reciept-${payment_id}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className={darkMode ? `bg-dark text-light`:`bg-light text-dark`} id='divtable'>
       {
            orders?.length > 0 ?
            orders.map((item,index)=>(
            <Card style={{ width: '80rem'}} className='m-4' id='table'>
            <Card.Body className='d-flex'>
                <Card.Text style={{fontWeight:'bold'}}>
                <Col>
                    <p>Order ID : {item?._id}</p>
                    <p>Time : {item?.orderDate.toLocaleString()}</p>
                    <p>Status : {item?.status}</p>
                   <p>Total Amount : {item?.amount}</p>
                </Col>
                </Card.Text>
                {item.products.map((items,index)=>(
                <Col  className='ms-3 me-5'>
                    <Card.Img variant="top"  src={items?`${BASE_URL}/uploads/${items.productid.image}`:""} style={{height:"100px",width:"100px", backgroundSize:"cover"}} />
                    <Card.Title>{items?.productid.name}</Card.Title>
                </Col>
                ))
                }
               <div className='me-auto'>
                    <Button variant="primary" style={{height:"50px"}} onClick={()=>paymentSlip(item.payment_id)} >Download</Button>
               </div>
            </Card.Body>
            </Card>
            )):""
        } 
    </div>
  )
}

export default UserOrders
