import React, { useContext, useEffect, useState } from 'react'
import EditButton from '../EditButton'
import { Link } from 'react-router-dom'
import { deleteProductAPI, getProductAPI } from '../../services/allAPI'
import { BASE_URL } from '../../services/baseURL'
import { EditContext } from '../../context/EditContext'
import { toast } from 'react-toastify'

function AvailableProduct() {

  const [product,setProduct] = useState([])
  const {editResponse,setEditResponse} = useContext(EditContext)

  const getProductDetails = async()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      var reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }else{
      alert("Unauthorized User")
    }
    const result = await getProductAPI(reqHeader)
    if(result.status  == 200){
      setProduct(result.data)
    }
  }

  useEffect(()=>{
    getProductDetails()
  },[editResponse])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem('token')
        if(token){
          var reqHeader = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
          }
        }else{
          alert("Unauthorized User")
        }
        const result = await deleteProductAPI(id,reqHeader)
        console.log(result);
    if(result.status==200){
      setEditResponse(result)
      toast.success("Product Deleted")
      
    }else{
      toast.error("Error")
      console.log(result);
    }
  }

  return (
    <div id='divtable'>
      <h1 className='text-center mb-5 mt-5'>Available Products</h1>
      <button className='btn btn-primary m-3'><Link to={'/add'} style={{color:"white", textDecoration:"none"}}>Add Product</Link></button>
      <table className='shadow table table-bordered m-2' style={{width:'90%'}} id='table'>
        <thead className='mb-3 text-center'>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Image</th>
                <th>Operations</th>
            </tr>
        </thead>

        <tbody>
          {
            product?.length > 0 ?
            product?.map((item,index)=>(
              <tr className='text-center' key={index}>
              <td>{item?.name}</td>
              <td>{item?.description}</td>
              <td>{item?.category}</td>
              <td>{item?.brand}</td>
              <td>{item?.price}</td>
              <td><img style={{height:"80px"}} src={item?`${BASE_URL}/uploads/${item.image}`:""} alt="" /></td>
              <td>
              <div className='d-flex'>
                <EditButton product = {item}/>
                <button className='btn btn-danger ms-1' onClick={()=>handleDelete(item._id)} ><i class="fa-solid fa-trash"></i></button>
              </div>
              </td>
            </tr>
            )):"Nothing to Display"
          }
        </tbody>
      </table>
    </div>
  )
}

export default AvailableProduct
