const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementsByTagName("form")[0];
const login = document.getElementsByClassName("login")[0];
const signup = document.getElementsByClassName("signup")[0];
let heading = document.getElementsByClassName("form_heading")[0];


// local storage
const tasklist = JSON.parse(localStorage.getItem("tasks")) || []
let currentUser = null;
let currentpassword = null;
const userdata = JSON.parse(localStorage.getItem("userlist")) || []


// remove input from the form
function removeinput() {
    const input = document.querySelectorAll("input");
    input.forEach((item) => {
        item.value = "";
    })
}

// check user existence
function exist() {
    return userdata.some(user => user.username === username.value && user.password === password.value);

}
signup.addEventListener("click", (e) => {
    e.preventDefault()
    if (heading.innerText.trim() === "Login Here") {
        heading.innerHTML = `<h3>Sign Up Here</h3>`
    } else {
        if (exist() == true) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User already exist",

            });
            removeinput();

        } else {
            userdata.push({
                "username": username.value,
                "password": password.value
            })

            localStorage.setItem("userlist", JSON.stringify(userdata));
            Swal.fire({
                title: "User register successfully",
                icon: "success",
                draggable: true
            });

            login.click();



        }
        removeinput();
    }

})
login.addEventListener("click", (e) => {
    e.preventDefault()
    if (heading.innerText.trim() === "Sign Up Here") {
        heading.innerHTML = `<h3>Login Here</h3>`
    } else {
        if (exist() == true) {
            Swal.fire({
                title: "User Logged In successfully",
                icon: "success",
                draggable: true
            });
            removeinput();
            form.style.display = "none";
            tododisplay.style.display = "block";


        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User does not exist, SignUp",

            });
            removeinput();
            signup.click();


        }
    }
})
// todolist selection
const task = document.getElementById("input-box");
const tododisplay = document.getElementById("todo-container");
const add_btn = document.getElementById("input-button");
const list = document.getElementById("list-container");

// add old task if any 
if (tasklist.length > 0) {
    tasklist.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox">
            <span>${task}</span>
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Delete</span>`;
        list.appendChild(li);
    })
}
function countCheckedTask(){
    const checkboxes = document.querySelectorAll('#list-container input[type ="checkbox"]');
    let count = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            count +=1;
        }
    })
    return count;
}
// display complete and uncomplete
const completecounts = document.getElementById("completed-counter");
const uncompletecounts = document.getElementById("uncompleted-counter");
completecounts.innerText = countCheckedTask();
uncompletecounts.innerText = tasklist.length - countCheckedTask();

function updateTaskCounts() {

    const totalTasks = tasklist.length;
    const checked = countCheckedTask();
    const unchecked = totalTasks - checked;
    if(unchecked == -1){
        uncompletecounts.innerText = 0;
    }else{
        uncompletecounts.innerText = unchecked;
    }

    completecounts.innerText = checked;
    
}

list.addEventListener("click", (e) => {
    // delete task
    if (e.target.classList.contains("delete-btn")) {
        const li = e.target.closest("li");
        const taskText = li.querySelector("span").innerText;
        li.remove();
        const updatedTasklist = tasklist.filter((task) => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasklist));
        tasklist.length = 0;
        tasklist.push(...updatedTasklist);
        updateTaskCounts();
    }
    // edit task
    else if (e.target.classList.contains("edit-btn")) {
        const li = e.target.closest("li");
        const span = li.querySelector("span");
        const taskText = span.innerText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = taskText;
        li.innerHTML = ""; // Clear the li
        li.appendChild(input);
        input.focus();

        input.addEventListener("blur", () => {
            const newTaskText = input.value.trim();

            if (newTaskText !== "") {
                const index = tasklist.indexOf(taskText);
                if (index !== -1) {
                    tasklist[index] = newTaskText;
                    localStorage.setItem("tasks", JSON.stringify(tasklist));
                }

                li.innerHTML = `
                    <input type="checkbox">
                    <span>${newTaskText}</span>
                    <span class="edit-btn">Edit</span>
                    <span class="delete-btn">Delete</span>`;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Task cannot be empty!",
                });

                li.innerHTML = `
                    <input type="checkbox">
                    <span>${taskText}</span>
                    <span class="edit-btn">Edit</span>
                    <span class="delete-btn">Delete</span>`;
            }
        });
    }
    else if(e.target.type === "checkbox"){
        const li = e.target.closest("li");
        const index = tasklist.indexOf(li.querySelector("span").innerText);
        if (e.target.checked) {
            countCheckedTask();
            tasklist.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasklist));
        }else{
            tasklist.splice(index, 0, li.querySelector("span").innerText);
            localStorage.setItem("tasks", JSON.stringify(tasklist));

        }
        updateTaskCounts();
    }
})
window.addEventListener("keypress",(e)=>{
    if(e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type === "text"){
        e.target.blur();
    }
    
})

//add task
add_btn.addEventListener("click", () => {
    let tasktext = task.value.trim();
    if (tasktext === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a task",

        });
    } else {
        const isDuplicate = tasklist.includes(tasktext);
        if (!isDuplicate) {
            let newtask = document.createElement("li");
            newtask.innerHTML = `
            <input type="checkbox">
            <span>${tasktext}</span>
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Delete</span>`;

            list.appendChild(newtask);
            tasklist.push(task.value);
            localStorage.setItem("tasks", JSON.stringify(tasklist));

            task.value = "";
            updateTaskCounts();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Task already exist, enter a new task",

            });
            task.value = "";
        }
    }


})

