import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { deleteCartAPI, getCartAPI } from '../../services/allAPI'
import { BASE_URL } from '../../services/baseURL'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { EditContext } from '../../context/EditContext'
import Checkout from './Checkout'


function Cart() {

  const {darkMode} = useContext(ThemeContext)
  const {editResponse,setEditResponse} = useContext(EditContext)
  const [cart,setCart] = useState([])
  const [total,setTotal] = useState()

  const getCartProducts = async()=>{
    const token = sessionStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem("user"))
    if(token){
      var reqHeader = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    }else{
      alert("Unauthorized User")
    }
    const result = await getCartAPI(reqHeader,user._id)
    console.log(result.data.products);
    
    if(result.status  == 200){
      setCart(result.data.products)      
    }
  }
  

  useEffect(()=>{
    getCartProducts()
  },[setEditResponse])

  useEffect(()=>{
    displaytotal()
  },[cart])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem("user"))
    if(token){
      var reqHeader = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    }else{
      alert("Unauthorized User")
    }
    const result = await deleteCartAPI (id,user._id,reqHeader)
    if(result.status == 200){
      toast.success("Product Deleted")
      getCartProducts()
    }else{
      toast.error("Error")
      console.log(result);
    }
  }

  const displaytotal = ()=>{
    if(cart.length >0){
      setTotal(cart?.map(item=>item.productid.price).reduce((n1,n2)=>n1+n2))
    }
  }

  
  
  console.log(total);
  
  return (
    <div className={darkMode ? `bg-dark text-light`:`bg-light text-dark`}>

      <table className='m-5 shadow' style={{width:"80%"}}>
          <thead className='text-center mb-3'>
              <tr >
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Price</th>
                <th>Operation</th>
              </tr>
          </thead>
          <tbody>

        {
          cart?.length >0 ?
          cart?.map((item,index)=>(
            <>
               <tr key={index} className='text-center'>
                  <td>{item.productid.name}</td>
                  <td>{item.productid.category}</td>
                  <td>{item.productid.description}</td>
                  <td><img src={item?`${BASE_URL}/uploads/${item.productid.image}`:""} alt="" style={{width:'200px', height:"200px"}} /></td>
                  <td>{item.productid.price}</td>
                  <td>
                    <button className='btn btn-danger ms-4 me-2' onClick={()=>handleDelete(item.productid._id)}>Remove</button>
                  </td>
              </tr>
            </>
          )):"Nothing to display"
        }
      </tbody>
      </table>

       <div className='m-5'>
          <h2>Cart Summary</h2>
          <h5>Total Products :{cart.length}</h5>
          <h5>Total : {total}</h5>
          <Checkout orders ={cart} total ={total}/>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Cart

