const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementsByTagName("form")[0];
const login = document.getElementsByClassName("login")[0];
const signup = document.getElementsByClassName("signup")[0];
let heading = document.getElementsByClassName("form_heading")[0];

// ================= USER DATA =================

let loggedInUser = null;

const userdata = JSON.parse(localStorage.getItem("userlist")) || [];

const tasklist = [];

// ================= USER TASK FUNCTIONS =================

// save current logged in user
function setCurrentUser() {
    loggedInUser = username.value;
    localStorage.setItem("currentUser", loggedInUser);
}

// get tasks of current user
function getUserTasks() {
    if (!loggedInUser) return [];

    return JSON.parse(
        localStorage.getItem(`tasks_${loggedInUser}`)
    ) || [];
}

// save tasks of current user
function saveUserTasks(tasks) {
    if (!loggedInUser) return;

    localStorage.setItem(
        `tasks_${loggedInUser}`,
        JSON.stringify(tasks)
    );
}

// ================= REMOVE INPUTS =================

function removeinput() {
    const input = document.querySelectorAll("input");

    input.forEach((item) => {
        item.value = "";
    });
}

// ================= CHECK USER =================

function exist() {
    return userdata.some(
        (user) =>
            user.username === username.value &&
            user.password === password.value
    );
}

// ================= SIGNUP =================

signup.addEventListener("click", (e) => {
    e.preventDefault();

    if (heading.innerText.trim() === "Login Here") {
        heading.innerHTML = `<h3>Sign Up Here</h3>`;
    } else {

        // validation
        if (
            username.value.trim() === "" ||
            password.value.trim() === ""
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all fields",
            });

            return;
        }

        if (exist() === true) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User already exists",
            });

            removeinput();

        } else {

            userdata.push({
                username: username.value,
                password: password.value,
            });

            localStorage.setItem(
                "userlist",
                JSON.stringify(userdata)
            );

            Swal.fire({
                title: "User registered successfully",
                icon: "success",
                draggable: true,
            });

            login.click();
        }

        removeinput();
    }
});

// ================= LOGIN =================

login.addEventListener("click", (e) => {
    e.preventDefault();

    if (heading.innerText.trim() === "Sign Up Here") {

        heading.innerHTML = `<h3>Login Here</h3>`;

    } else {

        if (
            username.value.trim() === "" ||
            password.value.trim() === ""
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all fields",
            });

            return;
        }

        if (exist() === true) {

            Swal.fire({
                title: "User Logged In Successfully",
                icon: "success",
                draggable: true,
            });

            // set current user
            setCurrentUser();

            removeinput();

            form.style.display = "none";
            tododisplay.style.display = "block";

            // load user tasks
            tasklist.length = 0;
            tasklist.push(...getUserTasks());

            list.innerHTML = "";

            tasklist.forEach((task) => {

                const li = document.createElement("li");

                li.innerHTML = `
                    <input type="checkbox">
                    <span>${task}</span>
                    <span class="edit-btn">Edit</span>
                    <span class="delete-btn">Delete</span>
                `;

                list.appendChild(li);
            });

            updateTaskCounts();

        } else {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User does not exist, please Sign Up",
            });

            removeinput();

            signup.click();
        }
    }
});

// ================= TODO ELEMENTS =================

const task = document.getElementById("input-box");
const tododisplay = document.getElementById("todo-container");
const add_btn = document.getElementById("input-button");
const list = document.getElementById("list-container");

// ================= TASK COUNTERS =================

function countCheckedTask() {

    const checkboxes = document.querySelectorAll(
        '#list-container input[type="checkbox"]'
    );

    let count = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            count += 1;
        }
    });

    return count;
}

const completecounts = document.getElementById("completed-counter");
const uncompletecounts = document.getElementById("uncompleted-counter");

completecounts.innerText = 0;
uncompletecounts.innerText = 0;

function updateTaskCounts() {

    const totalTasks = list.children.length;

    const checked = countCheckedTask();

    const unchecked = totalTasks - checked;

    completecounts.innerText = checked;

    uncompletecounts.innerText =
        unchecked < 0 ? 0 : unchecked;
}

// ================= TASK EVENTS =================

list.addEventListener("click", (e) => {

    // ================= DELETE TASK =================

    if (e.target.classList.contains("delete-btn")) {

        const li = e.target.closest("li");

        const taskText =
            li.querySelector("span").innerText;

        li.remove();

        const updatedTasklist = tasklist.filter(
            (task) => task !== taskText
        );

        tasklist.length = 0;

        tasklist.push(...updatedTasklist);

        saveUserTasks(tasklist);

        updateTaskCounts();
    }

    // ================= EDIT TASK =================

    else if (e.target.classList.contains("edit-btn")) {

        const li = e.target.closest("li");

        const span = li.querySelector("span");

        const taskText = span.innerText;

        const input = document.createElement("input");

        input.type = "text";

        input.value = taskText;

        li.innerHTML = "";

        li.appendChild(input);

        input.focus();

        input.addEventListener("blur", () => {

            const newTaskText = input.value.trim();

            if (newTaskText !== "") {

                const index = tasklist.indexOf(taskText);

                if (index !== -1) {

                    tasklist[index] = newTaskText;

                    saveUserTasks(tasklist);
                }

                li.innerHTML = `
                    <input type="checkbox">
                    <span>${newTaskText}</span>
                    <span class="edit-btn">Edit</span>
                    <span class="delete-btn">Delete</span>
                `;

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
                    <span class="delete-btn">Delete</span>
                `;
            }
        });
    }

    // ================= CHECKBOX =================

    else if (e.target.type === "checkbox") {

        updateTaskCounts();
    }
});

// ================= ENTER KEY =================

window.addEventListener("keypress", (e) => {

    if (
        e.key === "Enter" &&
        e.target.tagName === "INPUT" &&
        e.target.type === "text"
    ) {
        e.target.blur();
    }
});

// ================= ADD TASK =================

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
                <span class="delete-btn">Delete</span>
            `;

            list.appendChild(newtask);

            tasklist.push(tasktext);

            saveUserTasks(tasklist);

            task.value = "";

            updateTaskCounts();

        } else {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Task already exists",
            });

            task.value = "";
        }
    }
});
