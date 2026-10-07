import {getData} from "../utils/getData.js"
import {sendResponse} from "../utils/sendResponse.js"
import {getDataQueryParams} from "../utils/getDataQueryParams.js"
export async function handleGet(res,queryObj){
    const data=await getData()
   const filtered= getDataQueryParams(data,queryObj)
    const content=JSON.stringify(filtered)
    sendResponse(res,200,"application/json",content)
}