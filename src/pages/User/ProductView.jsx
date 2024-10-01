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
    console.log(result.data);
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
        <Col>
        <h2>{product?.name}</h2>
        <h4>Brand : {product?.brand}</h4>
        <h2>Description</h2>
        <h5>{product?.description}</h5>
        <h3>$ {product?.price}</h3>
        <button className='btn btn-primary me-2'>Add to Cart</button>
        <button className='btn btn-success'>Payment</button>
        </Col>
        
      </Row>
    </div>
  )
}

export default ProductView
