//nullish coalescing operator
let user=null
console.log(user ?? "Anonymous")
let user1="John"
console.log(user1 ?? "Anonymous")
// rest Parameters
function showName(firstname,lastname,...titles){
    console.log(firstname+ " "+ lastname)
    console.log(titles)
    console.log(titles[0])
    console.log(titles[1])
    console.log(titles.length)
}
showName("Julius","Caeser","Consul","Imperator")

function sum(...numbers){
    return numbers.reduce((a,b)=>a+b,0)
}
console.log(sum(1,2,3,4))
// spread Operator
let arr=[1,2,5,3]
console.log(Math.max(...arr))

let arr1=[1,-2,4,6]
let arr2=[8,5,-9,7]
console.log(Math.max(...arr1,...arr2))

let arr3=[3,5,7]
let arr4=[8,9,15]
let merged=[0,...arr3,2,...arr4]
console.log(merged)

let str="Hello"
console.log([...str])
//copy an array/object
let arr5=[1,2,3]
let arrcopy=[...arr5]
console.log(JSON.stringify(arr5)===JSON.stringify(arrcopy))
console.log(arr5==arrcopy)
arr5.push(4)
console.log(arr5)
console.log(arrcopy)
//Destructing
//Array Destructing
let arr6=["John","Smith"]
let[firstName,lastName]=arr6
console.log(firstName)
console.log(lastName)
let[firstname,lastname]="John Smith".split(" ")
console.log(firstname)
console.log(lastname)
let[first,last]=[]
console.log(first)
console.log(last)
//Object Destructing
let option={
    title:"Menu",
    width:100,
    height:200
}
let{title,width:w,height:h}=option
console.log(title)
console.log(w)
console.log(h)
let options=[]
let{titles="JS",width=50,height=100}=options
arr7={titled:"Hello",heighted:200,widthed:100}
let {titled,...rest}=arr7
console.log(rest.heighted)
console.log(rest.widthed)
//Nested Destructuring
let values={
    size:{breadth:100,length:200},
    items:["Cake","Donut"],
    extra:true
}
let {size:{breadth,length},
items:[item1,item2],
heading="JS Basics"}=values
console.log(heading)
console.log(breadth)
console.log(length)
console.log(item1)
console.log(item2)




