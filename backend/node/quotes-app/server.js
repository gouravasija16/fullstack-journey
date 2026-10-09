const __dirname=import.meta.dirname
import http from "node:http"
import {handleGet} from "./handlers/routeHandler.js"
import {handlePost} from "./handlers/routeHandler.js"
import {serveStatic} from "./utils/serveStatic.js"
import {handleLive} from "./handlers/routeHandler.js"
import {getQuotesById} from "./utils/getQuotesByID.js"
const PORT=8002

const server=http.createServer(async (req,res)=>{
    const urlObj=new URL(req.url,`http://${req.headers.host}`)
    const queryObj=Object.fromEntries(urlObj.searchParams)
    if(urlObj.pathname==="/api/live" && req.method==='GET'){
        return await handleLive(req,res)
    }
    if(urlObj.pathname==="/api"){
        if(req.method==='GET'){
            return await handleGet(res,queryObj)
        }else if (req.method==='POST') {
            return  await handlePost(req,res) 
        }
    }else if(urlObj.pathname.startsWith('/api/quotes/') && req.method==='GET'){
        const id=Number(urlObj.pathname.split("/").pop())
        await getQuotesById(res,id)
        
    }
    else {
    return await serveStatic(req,res,__dirname)
    }
})
server.listen(PORT,()=>console.log(`The server is running on Port:${PORT}`))