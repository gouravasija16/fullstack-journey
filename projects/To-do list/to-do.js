const tasks=[]
const taskInput=document.getElementById("added-tasks")
const addBtn=document.getElementById("add")
const prioritySelect=document.getElementById("priority")
const dueDateInput=document.getElementById("dueDate")
const display=document.getElementById("display")

function renderTasks(){
    display.innerHTML=""
    tasks.forEach((task,index)=> {
        const taskCard=document.createElement("div")
        taskCard.classList.add("task-card")
        taskCard.innerHTML=
        `<input type="checkbox" name="taskdone" value="completed" >
        <span class="task-text">${task.task}</span>
        <span class="priority- ${task.priority.toLowerCase()}
        ">${task.priority}</span>
        <span class="dueDate">📅 ${task.dueDate}</span>
         <button id="edit-Btn" onclick="editTask(${index})">✏️</button>
        <button id="delete-Btn" onclick="deleteTask(${index})">🗑️</button>  
         `
    })
}
addBtn.addEventListener("click",function(){
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
     taskInput.value=""
      renderTasks()
})
 function deleteTask(index){
    tasks.splice(index,1)
    renderTasks()
 }
 
