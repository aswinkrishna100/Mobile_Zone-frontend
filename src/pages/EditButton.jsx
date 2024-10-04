import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProductAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseURL';
import { EditContext } from '../context/EditContext';

function EditButton({product}) {

const {setEditResponse} = useContext(EditContext) 

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const [editProduct,setEditProduct] = useState({
  image :"",
  name:product?.name,
  category:product?.category,
  brand:product?.brand,
  description:product?.description,
  price:product?.price
})

const [preview, setPreview] = useState()

useEffect(()=>{
  if(editProduct.image){
    setPreview(URL.createObjectURL(editProduct.image))
  }
},[editProduct.image])

const handleUpdate = async()=>{  
  const {image,name,category,brand,description,price} = editProduct
  if( !name || !category || !brand || !description || !price){
    toast.warning('Please fill the form Completely')
  }else{
    const reqBody = new FormData()
    reqBody.append("name",name)
    reqBody.append("category",category)
    reqBody.append("brand",brand)
    reqBody.append("description",description)
    reqBody.append("price",price)
    editProduct.image? reqBody.append("productImage",editProduct.image)
    : reqBody.append("productImage",product.image)
    const token = sessionStorage.getItem('token')
    if(token){
      var reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }      
    }else{
      alert("Unauthorized User")
    }
    const result = await editProductAPI(product._id,reqBody,reqHeader)
    if(result.status == 200){
      handleClose()
      alert('Product Updated')
      setEditResponse(result)
    }else{
      alert('Error')
      console.log(result);
      handleClose()
    }
  }
}

  return (
    <div>
      <Button variant="warning" onClick={handleShow}><i class="fa-solid fa-pen-to-square"></i></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form>
              <input type="text" className='form-control mb-3' placeholder='Product Name' value={editProduct.name} onChange={(e)=>setEditProduct({...editProduct,name:e.target.value})}/>
              <select class="form-select mb-3" aria-label="Default select example"  onChange={(e)=>setEditProduct({...editProduct,category:e.target.value})}>
                  <option hidden selected>{editProduct.category}</option>
                  <option value="Mobile Phone">Mobile Phone</option>
                  <option value="Accessories">Accessories</option>
              </select>
              <input type="text" className='form-control mb-3' placeholder='Product Brand' value={editProduct.brand} onChange={(e)=>setEditProduct({...editProduct,brand:e.target.value})}/>
              <textarea type="text" className='form-control mb-3' placeholder='Product Description' value={editProduct.description} onChange={(e)=>setEditProduct({...editProduct,description:e.target.value})}/>
              <input type="text" className='form-control mb-3' placeholder='Product Price' value={editProduct.price} onChange={(e)=>setEditProduct({...editProduct,price:e.target.value})}/>
              <label>
              <input style={{display:"none"}} type="file" className='form-control mb-3' placeholder='Product Image'  onChange={(e)=>setEditProduct({...editProduct,image:e.target.files[0]})}/>
              <img style={{height:"100px"}} src={preview?preview:`${BASE_URL}/uploads/${product.image}`} alt="" />
              </label>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  )
}

export default EditButton
