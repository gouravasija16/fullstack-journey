import {getData} from "../utils/getData.js"
import {sendResponse} from "../utils/sendResponse.js"
import {getDataQueryParams} from "../utils/getDataQueryParams.js"
import {parseJSONBody} from "../utils/parseJSONBody.js"
import {addNewQuotes} from "../utils/addNewQuotes.js"
import { quoteEvents } from "../events/quoteEvents.js"
import { sanitizeInput } from "../utils/sanitizeInput.js"
export async function handleGet(res,queryObj){
    const data=await getData()
   const filtered= getDataQueryParams(data,queryObj)
    const content=JSON.stringify(filtered)
    sendResponse(res,200,"application/json",content)
}
export async function  handlePost(req,res){
    try{
        const parsedData=await parseJSONBody(req)
        const sanitizedData = sanitizeInput(parsedData);
        if(!sanitizedData.author || !sanitizedData.text){
            throw new Error("Missing required fields: author and text")
        }
        await addNewQuotes(sanitizedData)
        quoteEvents.emit('quote-added',sanitizedData)
        sendResponse(res,201,'application/json',JSON.stringify(sanitizedData))
    }catch(err){
       sendResponse(res,400,"application/json",JSON.stringify(`error:${err}`))
    }
}

export async function handleLive(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    res.write(':connected\n\n');

   const send=(quote) =>res.write(`data: ${JSON.stringify(quote)}\n\n`)
    quoteEvents().on('quote-added', send)
    req.on('close', () => {
        quoteEvents().off('quote-added', send)
    })
}
 