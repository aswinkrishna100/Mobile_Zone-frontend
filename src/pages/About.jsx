import React from 'react'
import { Col, Row } from 'react-bootstrap'

function About() {

  return (
    <div className='w-100'>
        <div id='aboutpage'>
          <h1 className='text-center fs-1 fw-bold'>About</h1>
        </div>

       <Row className='m-5 '>
        <Col lg={6} sm={12}>
        <h1 >Mobile Zone</h1>
        <p>Mobile zone is your trusted destination for high quality Mobile Phones and Accesssories.We offering the lastest models and top brands with competitive prices.We are dedicated to exceptional customer service and strive to make your purchase as easy and enjoyable as possible.</p>
        </Col>
        <Col lg={6} sm={12}>
        <div>
          <img className='img-fluid' src="https://img.freepik.com/premium-photo/3d-rendering-black-smartphone-black-background-smartphone-is-placed-angle-showing-its-side-back_14117-156918.jpg" alt="" />
        </div>
        </Col>
       </Row>

      <Row className='m-5'>
        <Col lg={6} md={6} sm={12}>
        <div>
          <img className='img-fluid' src="https://img.freepik.com/premium-photo/funny-trendy-cartoon-character-man-show-smartphone-with-white-blank-screen-blue-background_530049-39.jpg" alt="" />
        </div>
        </Col>
        <Col lg={6} md={6} sm={12}>
        <h1>Our Vision</h1>
        <p>At Mobile Zone our vision to empower customers with a diverse selection of the lastest Mobile Phones,Accessories and exceptional service.We ensuring that every purchase is as effortless,affortable and satisfying as possible.</p>
        </Col>
      </Row>

    </div>
  )
}

export default About
