const inputBox = document.getElementById("input-box");
const listWork = document.getElementById("list-work");
const listPersonal = document.getElementById("list-personal");
const listShopping = document.getElementById("list-shopping");
const deadlineAdd = document.getElementById("deadline-input");
const categorySelect = document.querySelector('select[name="Categorie"]');
const searchTextBox = document.getElementById("searchTextBox"); 

let tasks = {
    Work: [],
    Personal: [],
    Shopping: [],
};


// add task function which is called by clicking on add task
function addTask() {
    const taskCategory = categorySelect.value;
    const taskInput = inputBox.value.trim(); // taskText
    const taskDeadline = deadlineAdd.value; // deadlineInpiut

    if (taskInput === '') {
        alert("Enter the Data");
        return;
    } 
    if (taskCategory === "Add Category") {
        alert("Firstly add your Category");
        return;
    }
    const task = { 
         text: taskInput,
         deadline: taskDeadline,
         deleted: false
         };

    tasks[taskCategory].push(task);
    
    // array for sorting
    tasks[taskCategory].sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
     });
        
       updateTask(taskCategory);
       saveData();

        inputBox.value = "";
        deadlineAdd.value = "";
        
    }



//update taskList function to update for sorting
function updateTask(category) {
    const list = category === "Work" ? listWork :
                 category === "Personal" ? listPersonal :
                 category === "Shopping" ? listShopping : null;

    if (!list) {
        return;
    }

    list.innerHTML = "";

    // console.log(tasks)
    
        tasks[category].forEach(task => {
            if (!task.deleted) {
                const li = document.createElement("li");
                li.classList.add(`task-${category.toLowerCase()}`);
                li.innerHTML = `${task.text} ${task.deadline}`;
                const span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);

                list.appendChild(li);
            }
        });
    }



//search function
searchTextBox.addEventListener("input", function () {
    const searchedText = searchTextBox.value.trim().toLowerCase();

    [listWork, listPersonal, listShopping].forEach((list) => {
        Array.from(list.children).forEach((taskElement) => {
            const taskText = taskElement.textContent.toLowerCase();
            if (taskText.includes(searchedText)) {
                taskElement.style.display = "block";
            } else {
                taskElement.style.display = "none";
            }
        });
    });
});





// Event listener for selecting a category
categorySelect.addEventListener("change", function () {
    const selectedCategory = categorySelect.value;

    // Hide all lists
    listWork.style.display = "none";
    listPersonal.style.display = "none";
    listShopping.style.display = "none";
    
    // listWork.innerHTML = "";
    // listPersonal.innerHTML = "";
    // listShopping.innerHTML = "";


    // Show the selected category's list
    if (selectedCategory === "Work") {
        listWork.style.display = "block";
        updateTask("Work");
    } else if (selectedCategory === "Personal") {
        listPersonal.style.display = "block";
        updateTask("Personal");
    } else if (selectedCategory === "Shopping") {
        listShopping.style.display = "block";
        updateTask("Shopping");
    }
    
    // Clear search bar when any other category is selected
    document.getElementById("searchTextBox").value = "";
});

 // to remove or underline the task
addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        const taskText = event.target.parentElement.textContent.split(" ")[0];
        markTaskAsDeleted(taskText);
        saveData();
    }
}, false);

// save tasks to localStorage..
function saveData(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

// Get tasks from localStorage and remove deleted tasks
function showData() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
    console.log(parsedTasks);
    // Filter out deleted tasks from each category
    for (const category in parsedTasks) {
        parsedTasks[category] = parsedTasks[category].filter(task => !task.deleted);
    }
    // tasks = parsedTasks; 

    return parsedTasks;
}
    return {
        Work: [],
        Personal: [],
        Shopping: [],
    };
}
Object.assign(tasks, showData());
updateTask(categorySelect.value);


// When you delete a task, mark it as deleted
function markTaskAsDeleted(taskText) {
    for (const category in tasks) {
        tasks[category] = tasks[category].filter(task => task.text !== taskText);
    }
    saveData();
}






// showData();
     // const li = document.createElement("li");
        // // li.innerHTML = inputBox.value;
        // li.innerHTML = `${taskInput} (Deadline: ${taskDeadline})`;

        // const span = document.createElement("span");
        // span.innerHTML = "\u00d7";
        // li.appendChild(span);

        // // adding tasks to the list 
        
        //  if (taskCategory === "Work") {
        //     listWork.appendChild(li);
        //     tasks.Work.push({ text: taskInput, deadline: taskDeadline });
        // }
        // else if (taskCategory === "Personal") {
        //     listPersonal.appendChild(li);
        //     tasks.Personal.push({ text: taskInput, deadline: taskDeadline });
        // } 
        // else if (taskCategory === "Shopping") {
        //     listShopping.appendChild(li);
        //     tasks.Shopping.push({ text: taskInput, deadline: taskDeadline });
        // } 
