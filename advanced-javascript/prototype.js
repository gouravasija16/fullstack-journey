//Prototype
let arr=["Akshay","Aditya"]
console.log(arr.__proto__)
console.log(arr.__proto__.__proto__) //object
let object={
    name:"Gourav",
    state:"Haryana",
    getIntro:function(){
        console.log(this.name+" "+"from"+ this.state)
    }
}
console.log(object)
console.log(object.__proto__)
console.log(object.__proto__.__proto__)
//prototype inheritance
let object2={
    name:"Rahul"
}
//Never do this
object2.__proto__=object
console.log(object2.name)
console.log(object2.state)
  
let animal={
    eats:true,
    walk(){
        console.log("Animal walks")
    }
}
let rabbit={
    jumps:true,
    __proto__:animal
}
rabbit.walk()

// Add a method using prototype
function Person(name){
    this.name=name
}
Person.prototype.sayHello=function(){
    console.log(`Hello ${this.name}`)
}
const p1=new Person("Gourav")
const p2=new Person("Rahul")
p1.sayHello()
p2.sayHello()
// Add a  new property 
Person.prototype.country="India"
console.log(p1.country)
console.log(p1.hasOwnProperty("country"))
console.log(p2.country)
// overriden prototype property
p1.country="USA"
console.log(p1.country)
console.log(p2.country)
// Check property ownership
console.log(p1.hasOwnProperty("name"))
console.log(p1.hasOwnProperty("country"))
// Prototype chain 
console.log(Object.getPrototypeOf(p1))
console.log(Object.getPrototypeOf(Person.prototype))
// inheritance
function Animal(name){
    this.name=this.name
}
Animal.prototype.sound=function(){
    console.log("Some sound")
}
function Dog(name){
    Animal.call(this,name)
}
Dog.prototype=Object.create(Animal.prototype)
Dog.prototype.bark=function(){
    console.log("Woof!")
}
const d=new Dog("Tommy")
d.sound()
d.bark()

