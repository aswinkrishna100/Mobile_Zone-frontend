import React, { useEffect, useState } from 'react'
import { getOrderAdminAPI } from '../../services/allAPI'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { BASE_URL } from '../../services/baseURL'

function Orders() {

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

      const result = await getOrderAdminAPI(reqHeader)
      console.log(result);
      
      if(result.status == 200){
          setOrders(result.data)
      }
  }

  return (
    <div>
      <Row>
        {
            orders?.length > 0 ?
            orders.map((item,index)=>(
            <Col lg={12} md={1} sm={1} className='ms-2'>
            <Card style={{ width: '80rem'}}>
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
                {/* <div className='ms-auto'>
                    <Button variant="primary" className='me-2' style={{height:"50px"}}>Download</Button>
                </div> */}
            </Card.Body>
            </Card>
            </Col>
            )):""
        }
        </Row>
    </div>
  )
}

export default Orders
