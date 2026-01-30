let tasks = [];

const addTask = ()=>{
    let taskIntput = document.getElementById("inputBox");
    let task = taskIntput.value.trim();
    if(task){
        tasks.push({text:task,completed:false}); 
    }
    taskIntput.value = "";
    updateTaskList();
    updateStats();
}

const updateTaskList = ()=>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task ,index)=>{
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed?'completed':''}" >
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <p>${task.text}</p>
            </div>

            <div class="icons">
                <img src="./img/edit.png" alt="remove" onclick=editTask(${index})>
                <img src="./img/bin.png" alt="Edit" onclick=deleteTask(${index})>
            </div>
        </div>`;
        listItem.addEventListener("change",()=>toggleTask(index));
        taskList.appendChild(listItem);
    })
    
}

const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    
}

const editTask = (index)=>{
    const taskInput = document.getElementById("inputBox");
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
}

const toggleTask = (index)=>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
}

const updateStats = ()=>{
    const completed = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length;

    const progress = totalTask === 0 ? 0 : (completed / totalTask) * 100;

    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("number").innerText = `${completed}/${totalTask}`;
}
document.getElementById("submitBtn").addEventListener("click",(e)=>{
    e.preventDefault();
    addTask();
})