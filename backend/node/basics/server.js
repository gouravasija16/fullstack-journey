import http from "http"
import {products}from "./data/data.js"
import {sendJSONResponse} from "./utils/sendJSONResponse.js"
import {filterByQueryParams} from "./utils/filterByQueryParams.js"
const PORT=8000
const server=http.createServer(async (req,res)=>{
    console.log(req.url,req.method)
    const data=await products
    console.log(req.headers)
    const urlObj=new URL(req.url, `http://${req.headers.host}`)
    console.log(urlObj)
    const queryObj= Object.fromEntries(urlObj.searchParams)
    console.log(queryObj)
    if(urlObj.pathname==='/api/products' && req.method==='GET'){
        let filteredData=filterByQueryParams(data,queryObj)
        sendJSONResponse(res,200,filteredData)
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