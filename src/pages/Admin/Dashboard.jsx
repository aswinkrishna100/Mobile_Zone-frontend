import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <Row className='m-5'>
        <Col className='m-2'>
        <div style={{width:"300px", height:"100px", backgroundColor:"steelblue"}}>
        <Link style={{textDecoration:"none", color:"white"}} to={'/viewusers'} className='fs-3 p-3' >Registered Users</Link></div>
        </Col>
        <Col className='m-2'>
        <div style={{width:"300px", height:"100px", backgroundColor:"steelblue"}}>
        <Link style={{textDecoration:"none", color:"white"}} to={'/available'} className='fs-3 p-3' >Available Products</Link></div>
        </Col>
        <Col className='m-2'>
        <div style={{width:"300px", height:"100px", backgroundColor:"steelblue"}}>
        <Link style={{textDecoration:"none", color:"white"}} to={'/orders'} className='fs-3 p-3' >Orders</Link></div>
        </Col>
        <Col className='m-2'>
        <div style={{width:"300px", height:"100px", backgroundColor:"steelblue"}}>
        <Link style={{textDecoration:"none", color:"white"}} to={'/total'} className='fs-3 p-3' >Total Earnings</Link></div>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
