import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"

export const addUserAPI = async(user)=>{
    return await commonAPI ("POST",`${BASE_URL}/adduser`,user,"")
}

export const verifiedUser = async(users)=>{
    return await commonAPI ("POST",`${BASE_URL}/verifieduser`,users,"")
}

export const ResendOtpUser = async(user)=>{
    return await commonAPI ("POST",`${BASE_URL}/resendotp`,user,"")
}

export const UserLogin = async(user)=>{
    return await commonAPI ("POST",`${BASE_URL}/loginuser`,user,"")
}

export const getUserAPI = async(reqHeader)=>{
    return await commonAPI ("GET",`${BASE_URL}/getuser`,"",reqHeader)
}

export const AddProductAPI = async(product,reqHeader)=>{
    return await commonAPI ("POST",`${BASE_URL}/admin/add-product`,product,reqHeader)
}

export const getProductAPI = async(reqHeader)=>{
    return await commonAPI ("GET",`${BASE_URL}/admin/get-product`,"",reqHeader)
}

export const editProductAPI = async(id,product,reqHeader)=>{
    return await commonAPI ("PUT",`${BASE_URL}/admin/edit-product/${id}`,product,reqHeader)
}

export const deleteProductAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/admin/delete-product/${id}`,{},reqHeader)
}

export const MobilePhoneAPI = async(reqBody)=>{
    return await commonAPI("GET",`${BASE_URL}/get-mobile`,reqBody,"")   
}

export const addCartAPI = async(reqBody,id)=>{
    return await commonAPI ("POST",`${BASE_URL}/add-cart/${id}`,reqBody,"")
}

export const getCartAPI = async(reqHeader,id)=>{
    return await commonAPI("GET",`${BASE_URL}/get-cart/${id}`,"",reqHeader)
}

export const deleteCartAPI = async(productid,id,reqHeader)=>{
    return await commonAPI ("POST",`${BASE_URL}/delete-cart/${id}`,{productid},reqHeader)
}
