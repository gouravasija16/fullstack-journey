//JSON.stringify
let student={
    name:"John",
    age:30,
    isAdmin:false,
    courses:["html","css","js"],
    spouse:null
}
let json=JSON.stringify(student)
console.log(typeof json)
console.log(json)
let user={
    sayHi(){
        console.log("Hello")
    },
    [Symbol("id")]:123,
     something:undefined
}
console.log(JSON.stringify(user))
let meetup={
    title:"Conference",
    room:{
        number:23,
        participants:["John","Anna"]
    }
}
console.log(JSON.stringify(meetup))
// let meetup1={
//     title:"Conference",
//         participants:["John","Anna"]
//     }

// let room={
//     number:23
// }
// meetup1.place=room,
// room.occupiedBy=meetup1
// console.log(JSON.stringify(meetup1))
let room={
    number:23,
    toJSON(){
        return this.number
    }
}
let meetup1={
    title:"Conference",
    room
}
console.log(JSON.stringify(room))
console.log(JSON.stringify(meetup1))
//JSON.parse
let numbers="[0,1,2,3]"
numbers=JSON.parse(numbers)
console.log(numbers[1])

let userData='{"name":"John","age":35,"isAdmin":false,"friends":[0,1,2,3,4]}'
let user1=JSON.parse(userData)
console.log(user1.friends[3])
 let str='{"title2":"Conference","date":"2017-11-30T12:00:00.0007"}'
 let meet=JSON.parse(str,function(key,value){
    if(key=="date") return new Date(value)
     return value
 })
console.log(meet.date.getDate())

try {
   JSON.parse("{name:Gourav}")
}catch (err){
    console.log(err.message)
}