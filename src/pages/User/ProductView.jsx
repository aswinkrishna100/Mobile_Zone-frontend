import React from 'react'
import { Col, Row } from 'react-bootstrap'

function ProductView() {
  return (
    <div>
      <Row>
        <Col>
        <img id='viewproduct' className='img fluid' src="https://www.livemint.com/lm-img/img/2024/08/07/1600x900/v40_1723019341566_1723019349005.jpg" alt="" />
        </Col>
        <Col>
        <h2>Name</h2>
        <h4>Brand</h4>
        <h4>Description</h4>
        <h3>price</h3>
        <button className='btn btn-primary me-2'>Add to Cart</button>
        <button className='btn btn-success'>Payment</button>
        </Col>
        
      </Row>
    </div>
  )
}

export default ProductView


