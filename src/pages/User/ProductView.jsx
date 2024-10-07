import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { ViewProductAPI } from '../../services/allAPI';
import { BASE_URL } from '../../services/baseURL';
import Review from './Review';
import { ThemeContext } from '../../context/ThemeContext';

function ProductView() {

  const {darkMode} = useContext(ThemeContext)

  const {id} = useParams()

  const [product,setProduct] = useState([])  

  const viewproduct = async()=>{
    const result = await ViewProductAPI(id)
    setProduct(result.data)
  }

  useEffect(()=>{
    viewproduct()
  },[])

  const date = new Date(Date.now())
  
  return (
    <div className={darkMode ? `bg-dark text-light`:`bg-light text-dark`}>
      <Row>
        <Col lg={6} md={6} sm={12}>
        <img id='viewproduct' className='img fluid' src={product?`${BASE_URL}/uploads/${product.image}`:""} alt="No Image" style={{height:"500px"}} />
        </Col>
        <Col className='fw-bold' lg={6} md={6} sm={12}>
        <p>{product?.name}</p>
        <p>Brand : {product?.brand}</p>
        <p>Description :</p>
        <p>{product?.description}</p>
        <p>$ {product?.price}</p>
        <button className='btn btn-primary'>Add to Cart</button>
        {/* <button className='btn btn-success'>Payment</button> */}
        <Row>
        <Col className='mt-3'>
        <div className='w-50 shadow p-2 mb-4'>
          <h4 className='text-center'><i class="fa-solid fa-truck"></i>  Free Delivery</h4>
          <p className='ps-4'>Enter your postal for delivery availability</p>
        </div>
        <div className='w-50 shadow p-2 mb-4'>
          <h4 className='text-center'><i class="fa-solid fa-repeat"></i>  Return Delivery</h4>
          <p className='ps-5'>Free 30 Days Delivery Returns</p>
        </div>
        <Review product={product}/>
        </Col>
        </Row>
        </Col>
      </Row>
      {
        product.reviews?.length > 0 ?
        product.reviews.map((item,index)=>(
          <>
          <div className='w-50 shadow p-2 mb-4'>
            <h4 className='me-auto'>{item?.username}</h4>
            <p className='ps-5'>{item?.review}</p>
          </div>
            <p></p>
            <p></p>
          </>
         
        )):""
      }
    </div>
  )
}

export default ProductView
