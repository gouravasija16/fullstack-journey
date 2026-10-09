import {getData} from "./getData.js"
import {sendResponse} from "./sendResponse.js"
export const getQuotesById = async (res,id) => {
    try{
        if(!Number.isInteger(id)) {
            return sendResponse(res, 400, 'application/json', JSON.stringify({ message: 'Invalid ID format. ID must be an integer.' }));
        }
        const quotes= await getData()
        const quote=quotes.find(q => q.id === id)
        if(!quote) {
            return sendResponse(res, 404, 'application/json', JSON.stringify({ message: 'Quote not found.' }));
        }
        return sendResponse(res, 200, 'application/json', JSON.stringify(quote));
    } catch (error) {
        console.error('Error fetching quote by ID:', error)
        throw error
    }
}