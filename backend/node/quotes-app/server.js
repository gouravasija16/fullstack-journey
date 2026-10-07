import http from "node:http"
import path from "node:path"
import {handleGet} from "./handlers/routeHandler.js"
import {serveStatic} from "./utils/serveStatic.js"
const PORT=8001
const __dirname=import.meta.dirname
const server=http.createServer(async (req,res)=>{
    const urlObj=new URL(req.url,`http://${req.headers.host}`)
    const queryObj=Object.fromEntries(urlObj.searchParams)
    console.log(queryObj)
    if(urlObj.pathname==="/api"){
        if(urlObj.method==='GET'){
            return await handleGet(res,queryObj)
        }
    }else if (!req.url.startsWith('/api')) {
    return await serveStatic(req,res,__dirname)  
    }
})
server.listen(PORT,()=>console.log(`The server is running on Port:${PORT}`))