import {getData} from "./getData.js"
import path from "node:path"
import fs from "node:fs/promises"
export async function addNewQuotes(newQuotes){
try{
    const quotes= await getData()
    const maxId= quotes.reduce((max,q)=> Math.max(max,q.id), 0)
    const quoteWithId={  ...newQuotes, id: maxId + 1 }
    quotes.push(quoteWithId)
    const pathJSON= path.join(import.meta.dirname,"..","data","data.json")
    await fs.writeFile(pathJSON,JSON.stringify(quotes,null,2),'utf-8')
    return quoteWithId
}catch(err){
    throw new Error(err)
}
}