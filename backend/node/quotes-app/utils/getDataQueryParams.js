export function getDataQueryParams(data,queryObj){
    const {id,author}=queryObj
    let filteredData=data
    if(id){
       filteredData= filteredData.filter(item=>item.id===Number(id))
    }
    if(author){
       filteredData= filteredData.filter(item=>item.author.toLowerCase()===author.toLowerCase())
    }
    return filteredData
}