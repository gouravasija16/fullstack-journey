// 1. Even/odd checker
let num=prompt("Enter a number:")
if(num%2==0){
    console.log("Even Number")
}
else{
    console.log("Odd Number")
}
// 2.Grade checker
let marks=prompt("Enter your marks")
if(marks>=90){
    console.log("grade:A")
}
else if(marks>=80){
    console.log("grade:B")
}
else if(marks>=70){
    console.log("grade:C")
}
else if(marks>=60){
    console.log("grade:D")
}else{
    console.log("Fail!")
}
// 3.Biggest of three numbers
let a=prompt("Enter number1 :")
let b=prompt("Enter number2 :")
let c=prompt("Enter number3 :")
let max=a
if(b>max)max=b
if(c>max)max=c
console.log(max)
//Sum of numbers
let number=prompt("Enter a number")
let sum=0;
for(let i=1;i<=number;i++){
    sum+=i
}
console.log("Sum :",sum)
// Multiplication table of n
let n=prompt("Enter a number")
let i=1
while(i<11){
    console.log(`${n} x ${i} = ${n*i}`)
}

let num= prompt("Enter a number:")
for(let i=0;i<=num;i++){
    if(i==5) break
    console.log(i)
}
//Reverse a number
let n=prompt("Enter a number:")
let reverse=0;
while(n>0){
    reverse=reverse*10+n%10
     n=Math.floor(n/10)
}
console.log(reverse)




