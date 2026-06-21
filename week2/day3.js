//closure-function rememebers its outer variables even it complete its execution 
function counter(){
    let count=0;
    return function(){
        count++
        console.log(count)
    }
}
let z=counter()
z()
z()
z()
//setTimeout with Closure
function greetAfterDelay(name){
    setTimeout(function(){
        console.log("Hello "+ name)
    },3000)
    console.log("JavaScipt")
}
greetAfterDelay("John")
//Classic Closure + loop problem- it always prints 6 because  everything function refered to  a same copy of i  and it stored it  in memory and for loop keeps on running and when i becomes 6 then they function runs
function getValue(){
    for(var i=1;i<=5;i++){
        setTimeout(function(){
            console.log(i)
        },i*1000)
    }
}
getValue()
//Solution of  above problem
function getValue(){
    for(var i=1;i<=5;i++){
        function close(i){
            setTimeout(function(){
                console.log(i)
            },i*1000)
        }
        close(i)
    }
}
getValue()
//what prints
function outer(){
    let x=10
    return function inner(){
        console.log(x)
    }
}
outer()()
// Conter increment/decrement with closure
function makeCounter(){
    let count=0
    return{
        increment:()=> ++count,
        decrement:()=> --count,
        getCount: ()=>count
    }
}
const Counter=makeCounter()
console.log(Counter.increment())
console.log(Counter.increment())
console.log(Counter.decrement())
console.log(Counter.getCount())

//Overlapping lexical Environment
function createSecret(secret){
    return {
        get: ()=>secret,
        set: (newSecret)=> secret=newSecret
    }
}
const obj1=createSecret("A")
const obj2=createSecret("B")
obj1.set("C")
console.log(obj1.get())
console.log(obj2.get())

//Functions as values(Function Expression)
const greet=function(){
    console.log("Hello")
}
greet()
//Functions as arguement
function runFunction(fn){
    fn()
}
runFunction(greet)
//Function returning function
function multiplier(x){
    return function(y){
        return x*y
    }
}
const double= multiplier(2)
console.log(double(5))
console.log(double(8))

//Basic callback
function doTask(task,callback){
    console.log("Doing: "+ task)
    callback()
}
doTask("coding",function() {
    console.log("Task done!")
})
//callback with setTimeout
function fetchData(callback){
    console.log("Fetching data...")
    setTimeout(function(){
        const data ={name:"John",age:20}
        callback(data)
    },3000)
}
fetchData(function(data){
    console.log("Got data:",data.name,data.age)
})

