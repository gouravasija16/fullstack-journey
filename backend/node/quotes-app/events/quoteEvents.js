import {EventEmitter} from "node:events"
export const quoteEvents =new EventEmitter()
quoteEvents.on('quote-added', (q)=> console.log(`New quote by ${q.author}`))