export const sendJSONResponse=(res,statusCode,payload)=>{
    res.writeHead(statusCode,{'Content-Type':'application/json'},{'Access-Control-Allow-Origin':'*'},{'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE'},{'Access-Control-Allow-Headers':'Content-Type'})
    res.end(JSON.stringify(payload))
}