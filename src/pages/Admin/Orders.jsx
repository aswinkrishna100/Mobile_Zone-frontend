import React, { useContext, useEffect, useState } from 'react'
import { getOrderAdminAPI } from '../../services/allAPI'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { BASE_URL } from '../../services/baseURL'
import { EditContext } from '../../context/EditContext'

function Orders() {

  const [orders,setOrders] = useState([])
  const {setOrderResponse} = useContext(EditContext)

  useEffect(()=>{
      getOrderDetails()
  },[setOrderResponse])

  const getOrderDetails = async()=>{
      const token = sessionStorage.getItem('token')
      if(token){
      var reqHeader = {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
      }
      }else{
      alert("Unauthorized User")
      }

      const result = await getOrderAdminAPI(reqHeader)
      if(result.status == 200){
          setOrders(result.data)
      }
  }

  return (
    <div className='divtable'>
        {
            orders?.length > 0 ?
            orders.map((item,index)=>(
            <Card style={{ width: '80rem'}} className='table'>
            <Card.Body className='d-flex'>
                <Card.Text style={{fontWeight:'bold'}}>
                <Col>
                    <p>Order ID : {item?._id}</p>
                    <p>Time : {item?.orderDate.toLocaleString()}</p>
                    <p>Status : {item?.status}</p>
                   <p>Total Amount : {item?.amount}</p>
                   <p>Name : {item.userid.fname} {item.userid.lname}</p>
                   <p>Email : {item.userid.email}</p>
                   <p>Address : {item.userid.address}</p>
                </Col>
                </Card.Text>
                {item.products.map((items,index)=>(
                <Col  className='ms-3 me-5'>
                    <Card.Img variant="top"  src={items?`${BASE_URL}/uploads/${items.productid.image}`:""} style={{height:"100px",width:"100px", backgroundSize:"cover"}} />
                    <Card.Title>{items?.productid.name}</Card.Title>
                    
                </Col>
                ))
                }
               
            </Card.Body>
            </Card>
            )):""
        }
    </div>
  )
}

export default Orders
