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




