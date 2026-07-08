let user1={}
//console.log(user1.address.city)
console.log(user1?.address?.city)
const user={
    firstname:"gourav",
    lastname:"asija",
    age:20,
    address:{}
    }
console.log(user?.address?.street)
//short circuiting
let name=null
let x=0
name?.sayHi(x++) // no "user",so execution doesn't reach sayHi call
console.log(x) 
let userAdmin={
    admin(){
        console.log("I am admin")
    }
}
let userGuest={}
userAdmin.admin ?.()
userGuest.admin ?.()
let key="firstName"
let user2={firstName:"John"}
user3=null
console.log(user2?.[key])
console.log(user3?.[key])


