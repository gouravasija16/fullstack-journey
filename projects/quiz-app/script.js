const questions = [
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Markup", "Display Object Model"],
    answer: "Document Object Model"
  },
  {
    question: "Which method is used to select an element by its ID?",
    options: ["querySelector()", "getElementById()", "getElementByClass()", "selectById()"],
    answer: "getElementById()"
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "fixed"],
    answer: "const"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which array method creates a new array with filtered elements?",
    options: ["map()", "reduce()", "filter()", "forEach()"],
    answer: "filter()"
  },
  {
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: "<h1>"
  },
  {
    question: "What does the 'typeof' operator return for an array?",
    options: ["array", "object", "list", "undefined"],
    answer: "object"
  },
  {
    question: "Which CSS property is used to make elements sit side by side?",
    options: ["position", "float", "display: flex", "margin"],
    answer: "display: flex"
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has access to its outer scope variables",
      "A way to close the browser",
      "A loop that runs forever",
      "A method to close an array"
    ],
    answer: "A function that has access to its outer scope variables"
  }
]
const index=document.getElementById("current").textContent
const scored=document.getElementById("score").textContent
let i=0
const currentOne=questions.map(s=>s.question)
   const para= document.getElementById("question-text")
   para.append(index,currentOne[i])
  const divBtn=document.getElementById("options")
   const optionsBtn=questions.map(s=>s.options)
   for(let j=0;j<4;j++){
   const btn= document.createElement("button")
   btn.textContent=optionsBtn[i][j]
   divBtn.appendChild(btn)
   }



    
// document.getElementById("nextBtn")
// let currentIndex=1
// document.getElementById("nextBtn").addEventListener("click", nextQues)
// // function nextQues(){
//     currentIndex++
//     index=currentIndex
// }
 
