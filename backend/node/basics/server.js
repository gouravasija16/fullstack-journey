import http from "http"
import {products}from "./data/data.js"
import {sendJSONResponse} from "./utils/sendJSONResponse.js"
const PORT=8080
const server=http.createServer(async (req,res)=>{
    console.log(req.url,req.method)
    const data=await products
    if(req.url==='/api/products' && req.method==='GET'){
        sendJSONResponse(res,400,data)

    }else if(req.url.startsWith('/api/products/category') && req.method==='GET'){
        const category=req.url.split("/").pop()
         const filteredData=data.filter(item => item.category.toLowerCase() === category.toLowerCase());
         sendJSONResponse(res,200,filteredData)
    }
    else{
        sendJSONResponse(res,404, {message:'Page not found, please check the URL'})
    }
   
})
server.listen(PORT,()=>console.log(`server running on port: ${PORT}`))