//try...catch 
try{
    console.log("Hello")
}catch(err){
    console.log(err.message)
}
// try {
//     setTimeout(function(){
//         noSuchVariable
//     },1000)
// }catch(err){
//     console.log("won't work")
// }
setTimeout(function(){
     try {
        noSuchVariable
    }catch(err){
        console.log("error is being caught")
    }
 },1000)
 // using try...catch with JSON.parse
 let json="{bad json}"
 try{
    let user=JSON.parse(json)
    console.log(user.name)
 }catch(err){
    console.log("the data has errors,we'll try to request it one more time")
    console.log(err.name)
    console.log(err.message)
 }
//throwing of error
let Json='{"age":30}'
try{
    let user1=JSON.parse(Json)
    if(!user1.name){
        throw new SyntaxError("Incomplete data:no name")
    }
    console.log(user1.name)
}catch(err){
    console.log("JSON Error: " + err.message)
}
//Rethrowing of error
let json1='{"age":25}'
try{
     let user2=JSON.parse(json1)
    if(!user2.name){
        throw new SyntaxError("Incomplete data:no name")
}
blabla()
 console.log(user2.name)
}catch(err){
    if(err instanceof SyntaxError){
        console.log("JSON Error: " + err.message)
    }else{
        throw err
    }
}
function readData(){
    let json2='{"age":20}'
    try{
        blabla()
    }catch(err){
        if(!(err instanceof SyntaxError)){
            throw err
        }
    }
}
try{
    readData()
}catch(err){
    console.log("External catch got: " +err)
}
//try...catch...finally
try{
    console.log("Running...")
}catch(err){
    console,log(err.message)
}finally{
    console.log("Always executes")
}

