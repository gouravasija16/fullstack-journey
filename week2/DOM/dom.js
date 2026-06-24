//---- Change Text and color------
const changetext=document.getElementById("ChangeText")
changetext.addEventListener('click',changeText)
function changeText(){
    document.getElementById("para").textContent="This text has been Changed !"
}
const changecolor=document.getElementById("ChangeColor")
changecolor.addEventListener('click',changeColor)
function changeColor(){
   const para = document.getElementById("para")
   para.style.color="#e040fb"
   para.fontsize="1.2rem"
}
//----Show/hide-----
const hide1=document.getElementById("toggleBtn")
hide1.addEventListener('click',hide)
function hide(){
    const secret=document.getElementById('secret')
   if(secret.style.display==="none"){
    secret.style.display= "block" 
   } else{
    secret.style.display= "none" 
   }
}
//----Input & Output----
const greet=document.getElementById("greetBtn")
greet.addEventListener('click',greets)
function greets(){
    const name= document.getElementById("nameInput").value.trim()
    if(name===""){
        document.getElementById("greetOutput").textContent="Please enter your name !"
        return
    }
     document.getElementById("greetOutput").textContent="Hello," + name + " ! Welcome to DOM practice 🔥 "
}
//----Counter----
  let count=0
const counter=document.getElementById("count")
document.getElementById("increment").addEventListener('click',function incrementValue(){
    count++
    counter.textContent=count
    count>0 ? counter.style.color=("#00e676"):counter.style.color= ("#e040fb")
})
document.getElementById("decrement").addEventListener('click',function decrementValue(){
    count--
    counter.textContent=count
    count<0 ? counter.style.color=("#ff1744"):counter.style.color= ("#e040fb")
})
document.getElementById("reset").addEventListener('click',function resetValue(){
    count=0
    counter.textContent=count
     counter.style.color= ("#e040fb")
})
//---- Create and remove----
let paraCount=0
document.getElementById("addPara").addEventListener('click',function(){
    paraCount++
    const container =document.getElementById("paraContainer")
    const newPara= document.createElement("p")
    newPara.textContent="Paragraph "+ paraCount +"- Created with JavaScript"
    newPara.id="para"+ paraCount
    container.appendChild(newPara)
    newPara.classList.add("custom-paragraph-color")

})
document.getElementById("removePara").addEventListener('click',function(){
    const container =document.getElementById("paraContainer")
    if(container.lastElementChild){
        container.lastElementChild.remove()
        para--
    }
})
//----Background Changer----
document.getElementById("redBtn").addEventListener('click',function(){
    document.body.style.backgroundColor="#1a0000"

})
document.getElementById("blueBtn").addEventListener('click',function(){
     document.body.style.backgroundColor="#00001a"

})
document.getElementById("greenBtn").addEventListener('click',function(){
     document.body.style.backgroundColor="#001a00"

 })
document.getElementById("resetBg").addEventListener('click',function(){
     document.body.style.backgroundColor="#0d0d0d"
})

