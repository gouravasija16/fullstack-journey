import http from "node:http"
import path from "node:path"
import {sendResponse} from "./utils/sendResponse.js"
import {getContentType} from "./utils/getContentType.js"
import {handleGet} from "./handlers/routeHandler.js"
const PORT=8001
const __dirname=import.meta.dirname
const publicDir=path.join(__dirname,"public")
const pathToResource=path.join(publicDir,req.url==="/" ?index.html : req.url)
const ext=path.extname(pathToResource)
const server=http.createServer(async (req,res)=>{
    const urlObj=new URL(req.url,`http://${req.headers.host}`)
    const queryObj=Object.fromEntries(urlObj.searchParams)
    console.log(queryObj)
    const contentType=getContentType(ext)
    if(url.obj.pathname==="/api"){
        if(url.obj.method==='GET'){
            return await handleGet(res,queryObj)
            
        }
    }
})else-if (!req.url.startsWith('/api')) {
    return await ser
    
} else {
    sendResponse(res,404,".application/json",{message:Not found})
    
}
server.listen(PORT,()=>console.log(`The server is running on Port:${PORT}`))