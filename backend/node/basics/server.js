import http from "http"
import {products}from "./data/data.js"
const PORT=8080
const server=http.createServer(async (req,res)=>{
    console.log(req.url,req.method)
    const data=await products
    if(req.url==='/api/products' && req.method==='GET'){
         res.setHeader('Content-Type','application/json')
         res.statusCode=200
         res.end(JSON.stringify(data ))

    }else if(req.url.startsWith('/api/products/category') && req.method==='GET'){
        const category=req.url.split("/").pop()
        const filteredData=data.filter(item=>item.category.toLowerCase()===category.toLowerCase())
        res.setHeader('Content-Type','application/json')
         res.statusCode=200
         res.end(JSON.stringify(filteredData ))
    }
    else{
         res.setHeader('Content-Type','text/plain')
         res.statusCode=404
         res.end('Page not found, please check the URL')
    }
   
})
server.listen(PORT,()=>console.log(`server running on port: ${PORT}`))