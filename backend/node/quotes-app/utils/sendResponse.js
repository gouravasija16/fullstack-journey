export function sendResponse(res,statusCode,contentType,payload){
    res.writeHeade(statusCode,{"Content-Type":contentType})
    res.end(payload)
}