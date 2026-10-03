export const sendJSONResponse=(res,statusCode,payload)=>{
    res.writeHead(statusCode,{'Content-Type':'application/json'})
    res.end(JSON.stringify(payload))
}