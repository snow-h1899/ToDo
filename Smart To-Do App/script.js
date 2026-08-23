const mainTitle = document.getElementById('mainTitle');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const importantBtn = document.getElementById('importantBtn');
const themeBtn = document.getElementById('themeBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskList = document.getElementById('taskList');
const container = document.querySelector('.container');

taskInput.setAttribute('maxlength','30');

mainTitle.textContent = "Smart To-Do App";
mainTitle.style.fontSize = '40px';

function updateCounts(){
    const totalTasks = taskList.children.length;
    taskCount.textContent=`Total Tasks : ${totalTasks}`;
    const completedTasks = document.querySelectorAll('.completed').length;
    completedCount.textContent = `Completed Tasks : ${completedTasks}`;
}

function createTask(taskText,isImportant=false){
    console.log('enter',taskText);
    const li=document.createElement('li');
    li.innerHTML=`
    <span class='task-text'>${taskText}</span>
    <div class='action-buttons'>
        <button class='complete-btn'>Completed</button>
        <button class='edit-btn'>Edit</button>
        <button class='delete-btn'>Delete</button>
    </div>
    `
    if(isImportant){
        li.style.borderLeft='6px solid blue'
    }

    const taskTextSpan = li.querySelector('.task-text');
    const completeBtn = li.querySelector('.complete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    completeBtn.addEventListener('click',function(){
        li.classList.toggle('completed');
        updateCounts();
    })

    editBtn.addEventListener('click',function(){
        const newTaskText = prompt('Edit your task:',taskTextSpan.textContent);
        if(newTaskText!== null && newTaskText.trim()!==''){
            taskTextSpan.textContent=newTaskText.trim();
        }
    })

    deleteBtn.addEventListener('click',function(){
        const confirmDelete=confirm('Are you sure you want to delete this task?');
        if(confirmDelete){
            li.remove();
        updateCounts();
        } 
    })
    return li;
}

addBtn.addEventListener('click',function(){
    const taskText = taskInput.value.trim();

    if(taskText==''){
        alert('Please enter a task');
        return;
    }
     const newTask= createTask(taskText);
     taskList.append(newTask);
     taskInput.value='';
     updateCounts();
})

importantBtn.addEventListener('click',function(){
    const taskText = taskInput.value.trim();

    if(taskText==''){
        alert('Please enter a task');
        return;
    }
    const newTask= createTask(taskText,true);
    taskList.prepend(newTask);
    taskInput.value='';
    updateCounts();
})

clearAllBtn.addEventListener('click',function(){
    const confirmClear=confirm("Do you want to remove all tasks?");
    if(confirmClear){
        taskList.innerHTML='';
        updateCounts();
        alert("All Tasks cleared");
    }
})

themeBtn.addEventListener('click',function(){
    document.body.classList.toggle('dark-mode');
})