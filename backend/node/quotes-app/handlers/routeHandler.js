import {getData} from "../utils/getData.js"
import {sendResponse} from "../utils/sendResponse.js"
import {getDataByQueryParams} from "../utils/getDataByQueryParams.js"
export async function handleGet(res,queryObj){
    const data=await getData()
    const content=getDataQueryParams(JSON.stringify(data),queryObj)
    sendResponse(res,200,"/application/json",content)
}