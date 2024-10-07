import React, { useEffect, useState } from 'react'
import { getOrderAdminAPI } from '../../services/allAPI'

function TotalEarning() {
  const [orders,setOrders] = useState([])
  const [length,setLength] = useState()
  const [amount,setAmount] = useState()

  useEffect(()=>{
      getOrderDetails()
  },[])

  useEffect(()=>{
    totalorders()
  },[])

  const getOrderDetails = async()=>{
      const token = sessionStorage.getItem('token')
      if(token){
      var reqHeader = {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
      }
      }else{
      alert("Unauthorized User")
      }

      const result = await getOrderAdminAPI(reqHeader)
      console.log(result.data);
      
      if(result.status == 200){
          setOrders(result.data)
      }
  }

  const totalorders = ()=>{
    const products = orders.map((item)=>item.products)
    console.log(orders.map((item)=>item.products));
    console.log(products.map((item)=>item.productid));
  }

  return (
    <div className='m-5'>
      <h2 className='fs-2 fw-bolder'>Total Earnings</h2>
      <h4>Number of Product Selled : 4</h4>
      <h4>Total Earning : 1,12,094</h4>
    </div>
  )
}

export default TotalEarning
