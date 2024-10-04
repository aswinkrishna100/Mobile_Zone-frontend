import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddProductAPI } from '../../services/allAPI';
import { Link, useNavigate } from 'react-router-dom';

function AddProduct() {

  const [product,setProduct] = useState({
    productImage:"",
    name:"",
    category:"",
    brand:"",
    description:"",
    price:""
  })
  const [preview, setPreview] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    if(product.productImage){
      setPreview(URL.createObjectURL(product.productImage))
    }
  },[product.productImage])


  const addProduct = async(e)=>{
    e.preventDefault()
    const {productImage,name,category,brand,description,price} = product
    if(!productImage || !name || !category || !brand || !description || !price){
      toast.warning("Please Fill the Form Completely")
    }else{
      const token = sessionStorage.getItem('token')
          if(token){
            var reqHeader = {
              "Content-Type":"multipart/form-data",
              "Authorization": `Bearer ${token}`
            }
          }

      const result = await AddProductAPI(product,reqHeader)
      if(result.status == 200){
        toast.success("New Product Added")
        navigate('/available')
      }else{
        toast.error("Not Added")
        console.log(result);
      }
    }
  }
  

  return (
    <div>
        <div className="row m-3">
            <div className="col"></div>
            <div className="col">
                <h3 className='text-center mb-3'>Add Product</h3>
                <label>
                  <input type="file" style={{display:'none'}}  onChange={(e)=>setProduct({...product,productImage:e.target.files[0]})}/>
                  <img style={{height:"200px"}} src={preview?preview:"https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg"} alt="image" />
                </label>
                <input type="text" className='form-control mb-3 mt-3' placeholder='Product Name' value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
                <select class="form-select mb-3" aria-label="Default select example" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
                  <option selected hidden>Category</option>
                  <option value="Mobile Phone">Mobile Phone</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <input type="text" className='form-control mb-3' placeholder='Brand Name' value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value})}/>
                <textarea type="text" className='form-control mb-3' placeholder='Product Description' value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}/>
                <input type="text" className='form-control mb-3' placeholder='Product Price' value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                <button className='btn btn-primary' onClick={(e)=>addProduct(e)}>Add Product</button>
            </div>
            <div className="col"></div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AddProduct
