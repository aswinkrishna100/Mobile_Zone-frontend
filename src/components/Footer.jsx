import React from 'react'

function Footer() {
  return (
    <div id='footer'>
      <footer style={{background:"black", color:"white", width:"100%"}} className=' mt-5'>
        <div className="row pt-3">
            <div className="col">
                <h3 className='fw-bold'>Services</h3>
                <ul style={{listStyle:"none"}}>
                    <li>Payments</li>
                    <li>Shipping</li>
                    <li>Cancellation&Returns</li>
                    <li>FAQ</li>
                    <li>Report Infringement</li>
                </ul>
            </div>
            <div className="col">
                <h3>About</h3>
                <ul style={{listStyle:"none"}}>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Mobile Zone Stories</li>
                    <li>Coporate Information</li>
                </ul>
            </div>
            <div className="col">
            <h3>Company</h3>
                <ul style={{listStyle:"none"}}>
                    <li>Terms & Conditions</li>
                    <li>Privacy & Policy</li>
                </ul>
            </div>
            <div className="col">
                <h3>Downloads</h3>
                <ul style={{listStyle:"none"}}>
                    <li>Android</li>
                    <li>Iphone</li>
                    <li>Windows App</li>
                    <li>Mac App</li>
                    <li>linux App</li>
                    <li>Desktop App</li>
                </ul>
            </div>
            <div className="col">
                <h3>Contact Us</h3>
                <div className='d-flex'>
                    <input type="email" className='form-control w-75' placeholder='Enter Email ID'/>
                </div>                
                <button className='btn btn-primary mt-3'>Subscribe</button>
                <div className='mt-3'>
                <ul style={{listStyle:"none"}}>
                  <li><i class="fa-brands fa-facebook"></i></li>
                  <li><i class="fa-brands fa-square-instagram"></i></li>
                  <li><i class="fa-brands fa-twitter"></i></li>
                  <li><i class="fa-brands fa-youtube"></i></li>
                </ul>
                </div>
            </div>
        </div>
        <p className='text-center fs-4'>Copyright © 2023 Mobile Zone. Built with React.</p>
        </footer>
        </div>
  )
}

export default Footer
