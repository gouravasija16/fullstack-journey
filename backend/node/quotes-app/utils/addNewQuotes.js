import {getData} from "./getData.js"
import path from "node:path"
import fs from "node:fs/promises"
export async function addNewQuotes(newQuotes){
try{
    const quotes= await getData()
    quotes.push(newQuotes)
    const pathJSON= path.join('data',"data.json")
    await fs.writeFile(pathJSON,JSON.stringify(quotes,null,2),'utf-8')
}catch(err){
    throw new Error(err)
}
}