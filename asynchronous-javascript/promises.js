// Promise
//executor(producing code)
const myPromise=new Promise((resolve,reject)=> {
    let success=true
    if(success){
        resolve("Task completed!")
    }else{
        reject("Task failed!")
    }
})
//consuming functions
myPromise
.then(result=> console.log(result))
.catch(error=>console.log(error))

// Promise with setTimeout
function fetchUserData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const user={name:"Gourav",age:21}
            resolve(user)
        },1000)
    })
}
fetchUserData()
.then(user=> console.log("Got user:",user.name))
.catch(err=> console.log("Error:",err))
// Promise chaining
function getUser(){
    return new Promise((resolve)=>{
        setTimeout(()=>
          resolve({id:1,name:"Gourav"}),1000)   
    })
}
function getPosts(userId){
    return new Promise((resolve)=>{
        setTimeout(()=>
            resolve(["Post 1","Post 2","Post 3"]),1000)
    })
}
getUser()
.then(user=>{
    console.log("User:",user.name)
    return getPosts(user.id)
})
.then (posts=> console.log("Posts:",posts))
.catch(err=> console.log("Error:".err))
// error handling with promise
// new Promise((resolve,reject)=>{
//     resolve("Ok")
// }).then((result)=>{
//     throw new Error("Whoops!")
// }).catch(alert)
//Rethrowing 
new Promise((resolve,reject)=>{
    throw new Error("Whoops!")
}).catch(function(error){
    if(error instanceof URIError){

    }else{
        console.log("can't handle such error")
        throw error
    }
}).then(function(){

}).catch(error=>{
    console.log(`The Unknown error has occurred: ${error}`)
})