//----Array Practice----
const students=[
   { name: "John", marks:85},
   { name:"Max",marks:95 },
   { name:"Anaya",marks:67},
   { name:"Logan",marks:96},
   { name:"Dean",marks:90}
]
console.log(students.length)
console.log(students[1])
console.log(students.at(-1))

//pop and unshift in array
console.log(students.pop())
console.log(students.unshift({ name:"Dean",marks:90}))
console.log(students[0])
//loops in array
for (let i=0;i<students.length;i++){
    console.log(students[i])
}
for(let student of students){
    console.log(student)
}
// splice in array
const fruits=["Apple","Peach","Orange","Litchi","Mango"]
fruits.splice(0,1,"Pineapple","Watermelon")
console.log(fruits)
fruits.splice(2,0)
console.log(fruits)
// slice-gives an array copying elements witgin a range
const arr=[1,9,7,3,4,5]
console.log(arr.slice(1,3))
console.log(arr.slice(-2))
// concat-gives a new array 
console.log(arr.concat([8,6]))
console.log(arr.concat([12,4],[11,13,15]))
let arraylike={
    0:"something",
    1:"Else",
    [Symbol.isConcatSpreadable]:true,
    length:2
}
console.log(arr.concat(arraylike))
//iterate: for Each-allows us to run function for every elemenet of an array
const skills=["Java","Python","JavaScipt"]
skills.forEach(function(skill){
    console.log(skill)
})
// Searching in an array
console.log(arr.includes(11))
console.log(arr.includes(1))
console.log(arr.indexOf(9))
console.log(arr.indexOf(19))
const numbers=[2,4,8,9,2,7,9,6]
console.log(numbers.lastIndexOf(2))
const studentsRecord=[
   { name: "John", marks:85},
   { name:"Max",marks:95 },
   { name:"Anaya",marks:67},
   { name:"Logan",marks:96},
   { name:"Dean",marks:90},
   { name:"Anaya",marks:67},
   { name:"Sadie Sanik",marks:97},
]
//map-get all names
const names=studentsRecord.map(s=>s.name)
console.log("Names",names)
const marks=studentsRecord.map(s=>s.marks)
console.log("Marks",marks)
//filter-students with marks above 90
const toppers=studentsRecord.filter(s=>s.marks >90)
console.log("Toppers",toppers)
//reduce-total marks
const total=studentsRecord.reduce((acc,s)=> acc+s.marks,0)
console.log("Total Marks",total)
// find- first student with marks above 96
const topper=studentsRecord.find(s=>s.marks >96)
console.log("First topper :", topper.name)
// sort(fn)-by marks descending
const sorted=studentsRecord.sort((a,b)=>b.marks - a.marks )
console.log("Sorted :",sorted.map(s=>s.name))

// some- any student failed(below 50) ?
const anyFailed=studentsRecord.some(s=>s.marks< 50)
console.log("Anyone Failed?",anyFailed)
// every-all students passed (above 40)?
const anyPassed=studentsRecord.every(s=>s.marks> 60)
console.log("Anyone Passed?",anyPassed)
// for Each- print every student
studentsRecord.forEach(s=>{
console.log(s.name +" scored "+ s.marks)})
//flat array
const nested=[[1,2],[3,4],[5,6],[7,8]]
const flat= nested.flat()
console.log("Flat",flat)
// spread operator
const arr1=[1,2,3]
const arr2=[4,5,6]
const arr3=[7,8,9]
const combined=[...arr1,...arr2, ...arr3]
console.log("Combined:",combined)
 function add(a,b,c){
    return a+b+c
 }
 console.log(add(...arr2))

// Creating an object
const student={
    name:"John",
    college:"TITS",
    year:2026,
    Skills:["Java","Python","JavaScipt"],
    isPlaced:false,
   "likes birds":true

}
// Access values
console.log(student.name)
console.log(student["college"])
console.log(student["likes birds"])
// Add new property
student.city="Bhiwani"
console.log(student.city)
// Update property
student.isplaced=true
console.log(student.isplaced)
// Delete property
delete student["isplaced"]
console.log(student.isplaced)
// Compound Properties
// const fruit=prompt("Which fruit to buy ?","apple")
// let bag={
//     [fruit]:5
// }
// console.log(bag.apple)
// In operator
console.log("age" in student)
//Loop through object
for(let key in student){
    console.log(key+":"+ student[key])
}
// Object methods
const keys= Object.keys(student)
const value= Object.values(student)
const entries= Object.entries(student)
console.log(keys)
console.log(value)
console.log(entries)
// Clonning and merging 
let user={
    name:"Logan",
    age:24
}
let clone={}
for(let key in user){
    clone[key]=user[key]
}
clone.name="Den"
console.log(user.name)

// Object.assign 
let user1={name:"John"}
let permisson1={canView:true}
let permisson2={canEdit:true}
Object.assign(user1,permisson1,permisson2)
console.log(user1.name)
console.log(user1.canView)
console.log(user1.canEdit)
user2={
    name:"Garrett",
    age: 21
}
let clone1= Object.assign({},user2)
console.log(clone1.name)
console.log(clone1.age)
// Structural Clone
let user3={
    name:"hannah",
    sizes:{
        height:160,
        width:35
    }
}
let clone2=structuredClone(user3)
console.log(user3.sizes==clone2.sizes)
user3.sizes.width=36
console.log(clone2.sizes.width)
// Object methods
let user4={
    name:"Tucker",
    age:26
}
user4.sayHi=function(){
    console.log("Hello")
}
user4.sayHi()
// "this" in methods
let user5={
    name:"Eren",
    age:20,
    sayHi(){
        console.log(this.name)
    }
}
user5.sayHi()

let users={
    name:"Levi"
}
let admin={
    name:"Armein"
}
function sayHi(){
    console.log(this.name)
}
users.f=sayHi
admin.f=sayHi
users.f()
admin.f()
 // Arrow functions have no "this"
 let user6={
    firstname:"Mikasa",
    sayHi(){
        let arrow=()=> console.log(this.firstname)
        arrow()
    }
 }
 user6.sayHi()
 
 const phone={
    brand:"Apple",
    model:"Iphone16",
    price: 70000,
    colors:["white","black","blue"],
    isAvailable:true
 }
 console.log(phone.brand, phone.price)
 phone["discount"]=5000
 console.log("After discount:",phone.price - phone.discount)
 
 const Calculator={
    num1:10,
    num2:5,
    add:function(){
        return this.num1 + this.num2 
    },
    subtract:function(){
        return this.num1 - this.num2 
    },
    multiply:function(){
        return this.num1 * this.num2 
    }
 }
 console.log(Calculator.add())
 console.log(Calculator.subtract())
 console.log(Calculator.multiply())
 // Array of objects
 const products=[
    {name:"Laptop",price:50000},
    {name:"Phone",price:30000},
    {name:"Tablet",price:20000}
]
 const productNames=products.map(p=> p.name)
 console.log(productNames)
  const expensive=products.filter(p=> p.price >25000)
 console.log(expensive)
  const Total=products.reduce((acc,p)=> acc + p.price,0)
 console.log("Total:",Total)
 
 const basic ={ name:"Michael",age:30}
const details={...basic,city:"Bhiwani",skill:"JavaScipt"}
console.log(details)
// Constructor
function User(name){
    this.name=name,
    this.isAdmin=false
}
let User1=new User("Jack")
console.log(User1.name)
console.log(User1.isAdmin)
  
const {name,college,year}={
    name:"Gourav",
    college:"TITS Bhiwani",
    year:2027
}
console.log(name,college,year)
