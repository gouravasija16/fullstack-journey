import {getData} from "../utils/getData.js"
import {sendResponse} from "../utils/sendResponse.js"
import {getDataQueryParams} from "../utils/getDataQueryParams.js"
import {parseJSONBody} from "../utils/parseJSONBody.js"
import {addNewQuotes} from "../utils/addNewQuotes.js"
export async function handleGet(res,queryObj){
    const data=await getData()
   const filtered= getDataQueryParams(data,queryObj)
    const content=JSON.stringify(filtered)
    sendResponse(res,200,"application/json",content)
}
export async function  handlePost(req,res){
    try{
        const parsedBody=await parseJSONBody(req)
        await addNewQuotes(parsedData)
        sendResponse(res,201,'application/json',JSON.stringify(parsedData))

    }catch(err){
       sendResponse(res,400,"application/json",JSON.stringify(`error:${err}`))
    }
}