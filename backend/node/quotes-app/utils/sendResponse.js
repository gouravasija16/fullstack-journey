export function sendResponse(res,statusCode,contentType,payload){
    res.writeHead(statusCode,{"Content-Type":contentType})
    res.end(payload)
}