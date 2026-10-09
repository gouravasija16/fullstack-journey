import sanitizeHtml from 'sanitize-html';
export const sanitizeInput = (data) => {
    const clean={}
    for(const [key,value] of Object.entries(data)){
        clean[key]= typeof value==='string' ? sanitizeHtml(value,{allowedTags:[],allowedAttributes:{}}).trim() : value
    }
    return clean
}