import {recipes} from "../data/data.js"
export const getRecipes =(req,res)=>{
    
    let filteredRecipes=recipes
    const {cuisine,category,difficulty,vegetarian,maxPrep,ingredient,spiceLevel,minRating}=req.query
    if(cuisine){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.cuisine.toLowerCase()===cuisine.toLowerCase())
    }
     if(category){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.category.toLowerCase()===category.toLowerCase())
    }
     if(difficulty){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.difficulty.toLowerCase()===difficulty.toLowerCase())
    }
     if(vegetarian){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.vegetarian===JSON.parse(vegetarian.toLowerCase()))
    }
     if(spiceLevel){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.spiceLevel===parseInt(spiceLevel))
    }
     if(maxPrep){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.prepMinutes <= parseInt(maxPrep))
    }
     if(ingredient){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.ingredients.some(i=>i.toLowerCase().includes(ingredient.toLowerCase())))
    }
    if(minRating){
        filteredRecipes=filteredRecipes.filter(recipe=>recipe.rating >= parseFloat(minRating))

    }
    res.status(200).json(filteredRecipes)
}