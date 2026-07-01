const tasks=[]
let editIndex=null
let currentSearch=""
const taskInput=document.getElementById("added-tasks")
const addBtn=document.getElementById("add")
const prioritySelect=document.getElementById("priority")
const dueDateInput=document.getElementById("dueDate")
const display=document.getElementById("display")
//display tasks
function renderTasks(){
    display.innerHTML=""
    const  filteredTask=tasks
        .filter(filterTask)
        .filter(task=>
      task.task.toLowerCase().includes(currentSearch))
       filteredTask.forEach((task,index)=> {
        const taskCard=document.createElement("div")
        taskCard.classList.add("task-card")
        taskCard.innerHTML=
        `<input type="checkbox" ${task.complete ? "checked" : ""} onchange="toggleTask(${index})" name="taskdone" value="completed" >
        <span class="task-text">${task.task}</span>
        <span class="priority- ${task.priority.toLowerCase()}
        ">${task.priority}</span>
        <span class="dueDate">📅 ${task.dueDate}</span>
         <button id="edit-Btn" onclick="editTask(${index})">✏️</button>
        <button id="delete-Btn" onclick="deleteTask(${index})">🗑️</button>  
         `
         display.appendChild   (taskCard)
    })
    if(filteredTask.length===0){
        display.innerHTML="<p>No tasks found</p>"
    }
}
//add button

addBtn.addEventListener("click",function(){
        
     if(editIndex !==null){
        
         tasks[editIndex]={
            task:taskInput.value.trim(),
            priority:prioritySelect.value,
            dueDate:dueDateInput.value,
            complete:tasks[editIndex].complete
        } 
        tasks.splice(editIndex,1,tasks[editIndex])
         editIndex=null
          taskInput.value=""
        addBtn.textContent="Add"    
    }else{
         const priority=prioritySelect.value
    const dueDate=dueDateInput.value
     const input=taskInput.value.trim();
     if(input===""){
        alert("Enter a valid value")
        return
     }
      let taskObject={
            task:input,
            priority:priority,
            dueDate:dueDate,
            complete:false
        }
        tasks.push(taskObject)
     }
     taskInput.value=""
     renderTasks()
})
//delete button
 function deleteTask(index){
    tasks.splice(index,1)
    renderTasks()
 }
 //edit button 
 function editTask(index){
    taskInput.value=tasks[index].task
    prioritySelect.value=tasks[index].priority
    dueDateInput.value=tasks[index].dueDate
    editIndex=index
    document.getElementById("add").textContent="Update"
 }
 const mode=document.getElementById("mode")
 mode.addEventListener("click",function(){
   document.body.classList.toggle("dark")
   if(document.body.className==="dark"){
   mode.textContent="☀️ Light Mode"
   }else{
     mode.textContent="🌙 Dark Mode"
   }
 })
 let currentFilter="all" 
 document.querySelectorAll("#filterBtn button").forEach((Btn)=>{
    Btn.addEventListener("click",function(){
       currentFilter= Btn.dataset.filter
         document.querySelectorAll("#filterBtn button").forEach((btn)=>{
            btn.style.backgroundColor="white"
            btn.style.color="black"
         })

       Btn.style.backgroundColor="#0EA5E9"
       Btn.style.color="white"
       console.log(currentFilter)
       renderTasks()
        
    })
 })
//  Filter Buttons
 function filterTask (task){
    switch(currentFilter){
        case "completed":
         return task.complete===true
        case "active":
         return task.complete===false
       
        case "high":
            return  task.priority.toLowerCase()===currentFilter
        case "medium":
              return task.priority.toLowerCase()===currentFilter
        case "low":
             return  task.priority.toLowerCase()===currentFilter
        default :
              return true
           
    }
 }
//  SearchText
 const search=document.getElementById("searchtext")
 search.addEventListener("input",function(){
   const searched=search.value
    currentSearch=searched.toLowerCase()
    renderTasks()
 })
// toggle of checkbox complete
function toggleTask(index){
   task[index].complete=! task[index].complete
   renderTasks()
}
// status
// let countCompleted=0
// let countRemaining=0
// function tasksStatus(){
// document.getElementById("total").textContent=tasks.length
// tasks.filter(task=>{
//    if(task.completed===true){
//       countCompleted++
//    document.getElementById("completed").textContent=countCompleted
//    }if(task.completed===false){
//       countRemaining++
//    document.getElementById("remaining").textContent=countRemaining
//    }
// })
// }






 