export function getDataQueryParams(data,queryObj){
    const {id,author}=queryObj
    if(id){
        data.filter(item=>item.id===Number(id))
    }
    if(author){
        data.filter(item=>item.author.toLowerCase()===author.toLowerCase())
    }
    return data
}