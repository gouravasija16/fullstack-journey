import {recipes} from "../data/data.js"
export const getRecipesByField = (req,res)=>{
    const allowedFields=['id','name']
    const {field,term}=req.params

    if(!allowedFields.includes(field)){
        return res.status(400).json({
            message: `Not allowed field. Allowed fields are: ${allowedFields.join(', ')}`
        })
    }
    let filteredRecipe = null

    if(field==='id'){
        const id = parseInt(term)
        filteredRecipe = recipes.find(r => r[field] === id)
    } else {
        filteredRecipe = recipes.find(r =>r[field].toLowerCase().includes(term.toLowerCase()))
    }

    if(filteredRecipe){
        return res.status(200).json(filteredRecipe)
    }

    return res.status(404).json({message: 'Recipe not found'})
}