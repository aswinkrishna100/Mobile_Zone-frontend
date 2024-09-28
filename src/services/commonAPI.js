import axios from "axios"

export const commonAPI = async(httpRequest,url,reqBody,reqHeader)=>{
   const reqconfig={
    method: httpRequest,
    url,
    data:reqBody,
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
   }
   return await axios(reqconfig).then((response)=>{
    return response
   }).catch((error)=>{
    return error
   })
}
