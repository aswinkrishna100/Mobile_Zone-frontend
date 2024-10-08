import React, { useContext, useEffect, useState } from 'react'
import {Button, Container,Nav, Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Profile from '../pages/User/Profile';
import { ThemeContext } from '../context/ThemeContext';
import { EditContext } from '../context/EditContext';

function Header() {
     const {darkMode,toggleDarkMode} = useContext(ThemeContext)
     const handleClick=()=>{
      toggleDarkMode()
      setDark(!dark)
     }
const {profileResponse} = useContext(EditContext)
const [dark,setDark] = useState(false)
const [token,setToken] = useState("")

useEffect(()=>{
  const getToken = sessionStorage.getItem('token')
  if(getToken){
    setToken(getToken)
  }
},[profileResponse])

  return (
    <div id='navbar'>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#" ><Link className='fs-2 fw-bold' style={{textDecoration:"none", color:"black"}} to={'/'}>Mobile Zone</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" id='navlinks' style={{color:"black"}} className='fs-5'><Link style={{textDecoration:"none", color:"black"}} to={'/'}>Home</Link></Nav.Link>
            <Nav.Link href="#"  id='navlinks' className='fs-5'> <Link style={{color:"black", textDecoration:"none"}} to={'/about'}>About</Link></Nav.Link>
            <Nav.Link href="#" id='navlinks' style={{color:"black"}} className='fs-5'><Link style={{color:"black", textDecoration:"none"}} to={'/product'}>Products</Link></Nav.Link>
            <Nav.Link href="#" id='navlinks' style={{color:"black"}} className='fs-5'><Link style={{color:"black", textDecoration:"none"}} to={'/cart'}>Cart</Link></Nav.Link>
            <Nav.Link href="#" id='navlinks' style={{color:"black"}} className='fs-5'><Link style={{color:"black", textDecoration:"none"}} to={'/userorders'} >Orders</Link></Nav.Link>
            <Nav.Link href="#footer" id='navlinks' style={{color:"black"}} className='fs-5'>Contacts</Nav.Link>
          </Nav>
          {
            dark ?
            <Button variant="light" onClick={handleClick}>Light</Button>
            :
            <Button variant="dark" onClick={handleClick}>Dark</Button>
          }
          {
            token ?
            <>
               <Profile/>
            </>
            :
            <button className='btn btn-light'><Link style={{color:"black", textDecoration:"none"}} to={'/login'}>Login</Link></button>
          }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
export default Header
