import http from "http"
const PORT=8000
const server=http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/plain')
    res.statusCode=200
    res.end('This is my Server!')
})
server.listen(PORT,()=>console.log(`server running on port: ${PORT}`))