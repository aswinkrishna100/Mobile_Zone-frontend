import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getOrderAPI, getOrderUserAPI } from '../../services/allAPI';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../services/baseURL';
import axios from 'axios';

function UserOrders() {

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        getOrderDetails()
    },[])

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
        console.log(result);
        
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
    <div>
        <Row>
        {
            orders?.length > 0 ?
            orders.map((item,index)=>(
            <Col lg={12} md={12} sm={12} className='m-4'>
            <Card style={{ width: '80rem'}}>
            <Card.Body className='d-flex'>
                <Card.Text style={{fontWeight:'bold'}}>
                <p>Order ID : {item?._id}</p>
                <p>Time : {item?.orderDate.toLocaleString()}</p>
                <p>Status : {item?.status}</p>
               <p>Total Amount : {item?.amount}</p>
                </Card.Text>
                {item.products.map((items,index)=>(
                <div className='ms-5 me-5'>
                    <Card.Img variant="top"  src={items?`${BASE_URL}/uploads/${items.productid.image}`:""} style={{height:"100px",width:"100px", backgroundSize:"cover"}} />
                    <Card.Title>{items?.productid.name}</Card.Title>
                </div>
                ))
                }
                <div className='ms-auto'>
                    <Button variant="primary" style={{height:"50px"}} onClick={()=>paymentSlip(item.payment_id)} >Download</Button>
                </div>
            </Card.Body>
            </Card>
            </Col>
            )):""
        }
        </Row>
    </div>
  )
}

export default UserOrders
