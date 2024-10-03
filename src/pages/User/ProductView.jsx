import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ViewProductAPI } from '../../services/allAPI';
import { BASE_URL } from '../../services/baseURL';

function ProductView() {
  const {id} = useParams()

  const [product,setProduct] = useState([])  

  const viewproduct = async()=>{
    const result = await ViewProductAPI(id)
    setProduct(result.data)
  }

  useEffect(()=>{
    viewproduct()
  },[])
  
  return (
    <div>
      <Row>
        <Col>
        <img id='viewproduct' className='img fluid' src={product?`${BASE_URL}/uploads/${product.image}`:""} alt="No Image" style={{height:"500px"}} />
        </Col>
        <Col className='fw-bold'>
        <p>{product?.name}</p>
        <p>Brand : {product?.brand}</p>
        <p>Description :</p>
        <p>{product?.description}</p>
        <p>$ {product?.price}</p>
        <button className='btn btn-primary me-2 mb-1'>Add to Cart</button>
        <button className='btn btn-success'>Payment</button>
        </Col>
        
      </Row>
    </div>
  )
}

export default ProductView
