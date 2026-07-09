//Promise.all
const p1=new Promise(resolve=>setTimeout(()=>resolve("User data"),3000))
const p2=new Promise(resolve=>setTimeout(()=>resolve("Posts data"),1000))
const p3=new Promise(resolve=>setTimeout(()=>resolve("Comments data"),2000))
Promise.all([p1,p2,p3])
.then(results=>console.log("All done:",results))
.catch(err=> console.log("One failed:",err))

//Promise.all with one failure
const p4=new Promise((resolve,reject)=> setTimeout(()=>reject("Failed!"),3000))
const p5=new Promise(resolve=>setTimeout(()=>resolve("Posts data"),1000))
const p6=new Promise(resolve=>setTimeout(()=>resolve("Comments data"),2000))
Promise.all([p4,p5,p6])
.then(results=>console.log("All done:",results))
.catch(err=> console.log("One failed:",err))
//Promise.allSettled
const p7=new Promise((resolve,reject)=> setTimeout(()=>reject("Failed!"),3000))
const p8=new Promise(resolve=>setTimeout(()=>resolve("Success 1"),1000))
const p9=new Promise(resolve=>setTimeout(()=>resolve("Success 2"),2000))
Promise.allSettled([p7,p8,p9])
.then(results=>{
    results.forEach(result=>{
        if(result.status==="fulfilled"){
            console.log("✅ Success:",result.value)
        }else{
             console.log("❌ Failed:",result.reason)
        }
    })
})
//Promise.race
const fast=new Promise(resolve=>setTimeout(()=>resolve("Fast wins!"),4000))
const slow=new Promise(resolve=>setTimeout(()=>resolve("Slow lose!"),5000))
Promise.race([fast,slow])
.then(result=>console.log("Winner:",result))
// Promise.any
const p10=new Promise((resolve,reject)=>setTimeout(()=>reject("Failed"),1000))
const p11=new Promise((resolve,reject)=>setTimeout(()=>reject("Also Failed"),2000))
const p12=new Promise((resolve,reject)=>setTimeout(()=>reject("All Failed"),3000))
Promise.any([p10,p11,p12])
.then(results=>console.log("First Success:",results))
.catch(err=> {
   console.log("All failed:",err)
   console.log(err.errors)
})



