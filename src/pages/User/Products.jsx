import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap'
import { ThemeContext } from '../../context/ThemeContext'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { EditContext } from '../../context/EditContext';
import { addCartAPI, getProductAPI, MobilePhoneAPI } from '../../services/allAPI';
import { BASE_URL } from '../../services/baseURL';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Products() {
  
  const {darkMode} = useContext(ThemeContext)
  
  const [product,setProduct] = useState([])
  const [mobile,setMobile] = useState([])
  const {editResponse} = useContext(EditContext)

  const [search,setSearch] = useState()  

  const getProductDetails = async()=>{
    
    const result = await getProductAPI()
    if(result.status  == 200){
      setProduct(result.data)
    }
  }

  const getmobiles = async()=>{
    const reqBody={
       category:"Accessories"
    }
    const result = await MobilePhoneAPI(reqBody)
    console.log(result);
    if(result.status == 200){
      setMobile(result.data)
    }
  }

  

  useEffect(()=>{
    getProductDetails()
  },[editResponse])

  const addtoCart = async(id)=>{
    const reqBody = {
      productid :id,
      count:1
    }
    const user = JSON.parse(sessionStorage.getItem("user"))
    
    const result = await addCartAPI(reqBody,user._id)
    console.log(user._id);
    
    if(result.status == 200){
      toast.success("Product Added to Cart")
    }else{
      toast.error("Product not added in Cart")
      console.log(result);
      
    }
  }
  
    // ascending order

  const ascending = ()=>{
    const price = product.sort((n1,n2)=>n1.price-n2.price);
    setProduct(price)
    console.log(price);
  }

    // descending order

  const descending = ()=>{
    const price = product.sort((n1,n2)=>n2.price-n1.price)
    setProduct(price)
    console.log(price);
  }
  
  return (
    <div className={darkMode ? `bg-dark text-light`:`bg-light text-dark`}>
        <Row>
          <Col lg={4} md={4} sm={12}>
          <button className='m-2' id='category' onClick={getmobiles}>Mobile Phones</button>
          <button className='m-2' id='category'>Accessories</button>
          </Col>

          <Col lg={4} md={4} sm={12}>
          <Dropdown as={ButtonGroup}>
      <Button variant="success">Sort</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="" onClick={ascending}>Price low to high</Dropdown.Item>
        <Dropdown.Item href="" onClick={descending}>Price high to low</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </Col>

          <Col lg={4} md={4} sm={12} className='d-flex'>
          <input type="text" className='form-control w-50 mt-2' placeholder='Search' onChange={(e)=>setSearch(e.target.value)}/>
          <button className='ms-2 rounded' id='search'><i class="fa-solid fa-magnifying-glass"></i></button>
          </Col>
        </Row>
        <Row className='m-5'>

      {
        product?.length > 0 ?
        product?.map((item,index)=>(
        <Col lg={3} md={6} sm={12} className='mb-4'>
        <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={item?`${BASE_URL}/uploads/${item.image}`:""} style={{height:"300px"}}/>
      <Card.Body>
        <Card.Title>{item?.name}</Card.Title>
        <Card.Text>
        <h5>{item?.category}</h5>
        <p> {item?.description.slice(0,100)}...</p>
        <h5> {item?.price}</h5>
        </Card.Text>
        <Button variant="primary"><Link to={`/productview/${item._id}`} style={{color:'white', textDecoration:"none"}}>View</Link></Button>
        <Button variant="primary" className='ms-2' onClick={()=>addtoCart(item._id)}>Cart</Button>
      </Card.Body>
    </Card>
        </Col>
        )):"Nothing to Display"
      }
      </Row>
      <ToastContainer/>
    </div>
  )
}

export default Products
