//1. Even/odd checker
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
//sum of numbers 
let number1=prompt("Enter a number")
for (let i=0;i<number1;i++){
    console.log(i)
// }
//Square of a function
let getSquare=n =>n*n
let n=prompt("Enter a number:")
console.log(getSquare(n))
//Check if a number is even or odd
function findEvenOdd(n){
    if(n%2==0) return "Even"
    else return "Odd";
}
let num=prompt("Enter a number:")
console.log(findEvenOdd(num))
//find greater of two numbers
function greater(a,b){
    if(a>b) return `${a} is greater`
    else return `${b} is greater`
}
let a= prompt("Enter number1:")
let b= prompt("Enter number2:")
console.log(greater(a,b))
//Temperature converter 
const celsiusToFahrenheit=(C)=>(C*(9/5))+32
const fahrenheitToCelsius=(F)=>((F-32)*(5/9))
console.log(celsiusToFahrenheit(70))
console.log(fahrenheitToCelsius(250))
//Find Factorial using recurssion
function findFactorial(n){
    if (n===0) return 1
    return n * findFactorial(n-1) 
}
let n=prompt("Enter a number:")
console.log(`Factorial of ${n} is ${findFactorial(n)}`)
//Sum of digits of a number
function sumOfdigits(n){
    let sumofdigits=0
    while(n>0){
        sumofdigits+=n%10
        n=Math.floor(n/10)
    }
    return sumofdigits
}
let n=prompt("Enter a number:")
console.log(`sum of digits of ${n} is ${sumOfdigits(n)}`)
//Check if number is palindrome
function isPalindrome(n){
    let ispalindrome=false
    let original=n
    if(original == Reverse(original)) ispalindrome=true
    return ispalindrome
}
function Reverse(num){
let reverse=0;
while(num>0){
    reverse=reverse*10+num%10
     num=Math.floor(num/10)
}
return reverse
}
let n=prompt("Enter a number:")
console.log(isPalindrome(n))
// Count vowels in a string 
function countVowels(str){
    let count=0
    let Vowels="aeiouAEIOU"
    for(let i=0;i<str.length;i++){
        if(Vowels.includes(str[i])){
            count++
        }
    }
    return count
}
console.log(countVowels("hello world"))
// Find maximum in an array
function findMax(arr){
    let max=arr[0]
    for(let i=0;i<arr.length;i++){
        if(arr[i]>max) max=arr[i]
    }
    return max
}
console.log(findMax([1,5,9,10,32,9,7]))