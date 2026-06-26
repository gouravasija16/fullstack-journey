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
let currentScore=0
const index=document.getElementById("current")
const scored=document.getElementById("score")
const nextbtn=document.getElementById("nextBtn")
let i=0
const currentOne=questions.map(s=>s.question)
   const para= document.getElementById("question-text")
   console.log(currentOne[i])
   function loadQues(i){
   para.textContent= currentOne[i]
  const divBtn=document.getElementById("options")
   const optionsBtn=questions.map(s=>s.options)
    divBtn.innerHTML=""
   for(let j=0;j<4;j++){
   const btn= document.createElement("button")
   btn.textContent=optionsBtn[i][j]
   divBtn.appendChild(btn)
   }
}
loadQues(i)
const ans= questions.map(s=>s.answer)
document.getElementById("options").addEventListener("click",function( e) {
   if(e.target.tagName==="BUTTON"){
    const allButtons=e.target.parentNode.querySelectorAll("button")
    allButtons.forEach(btn => {
        if(btn===e.target){
            btn.disabled=false 
        if(ans[i]===e.target.textContent){
        e.target.style.backgroundColor="green"
        currentScore++
        scored.textContent="Score: "+ currentScore
        }else{
          e.target.style.backgroundColor='red'
        }
        }else{
            btn.disabled=true
        }
        nextbtn.disabled=false
    })
  }
})

 function showResult()
 {
  document.getElementById("quiz-container").style.display="none"
        document.getElementById("result").style.display="block"
        document.getElementById("final-score").textContent=`You scored ${currentScore} out of ${questions.length}`
 }
 nextbtn.addEventListener("click",getIndex)
 function getIndex(){
    i++
    if(i>=questions.length){
       showResult()
    }else{
    loadQues(i)
    index.textContent= i+1 
    nextbtn.disabled=true
    if(i===questions.length-1){
      nextbtn.textContent="Submit"
    }
  }
}
 document.getElementById("restartBtn").addEventListener("click",function(){
    nextbtn.textContent="Next->"
     currentScore=0
     i=0;
     index.textContent=i+1
     scored.textContent="Score: "+ currentScore
     document.getElementById("result"). style.display="none"
     document.getElementById("quiz-container").style.display="block"
     loadQues(i)
 })
 
 
