# 📌 Login & Todo List Web Application

A modern and responsive **Login + Signup + Todo List** web application built using **HTML, CSS, and JavaScript**.  
This project combines authentication UI design with a fully functional task management system using **Local Storage**.

Perfect for beginners learning:
- DOM Manipulation
- Event Handling
- Local Storage
- CRUD Operations
- Authentication Logic
- Responsive UI Design

---

# 🚀 Features

## 🔐 Authentication System
- User Signup
- User Login
- Form Switching (Login ↔ Signup)
- User Validation
- Local Storage Authentication
- SweetAlert Popup Notifications

## 📝 Todo List Features
- Add Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Task Counter
- Duplicate Task Prevention
- Persistent Data Storage

## 🎨 UI Features
- Glassmorphism Design
- Gradient Background Effects
- Responsive Layout
- Smooth Hover Animations
- Mobile Friendly Interface

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Functionality |
| SweetAlert2 | Alerts & Notifications |
| Font Awesome | Icons |
| Local Storage API | Data Persistence |

---

# 📂 Project Structure

```bash
project-folder/
│
├── index.html
├── index.css
├── index.js
└── README.md
```

---

# ⚙️ How It Works

## 1️⃣ User Authentication

Users can:
- Create an account
- Login using saved credentials
- Store user data in browser Local Storage

```javascript
localStorage.setItem("userlist", JSON.stringify(userdata));
```

---

## 2️⃣ Todo List Management

After successful login, users can:
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Track completed/uncompleted tasks

---

## 3️⃣ Data Persistence

Tasks remain saved even after refreshing the page.

```javascript
localStorage.setItem("tasks", JSON.stringify(tasklist));
```

---

# 🎨 UI Preview

## Login Page
- Glassmorphism effect
- Gradient circular background
- Social login buttons
- Responsive authentication form

## Todo Dashboard
- Interactive task list
- Task completion tracker
- Editable tasks
- Scrollable task section

---

# 🧠 Concepts Practiced

This project helps understand:
- DOM Manipulation
- Event Delegation
- Local Storage API
- Dynamic Element Creation
- Array Methods
- Form Validation
- Conditional Rendering

---

# 🔥 Key JavaScript Features Used

## Event Listeners

```javascript
add_btn.addEventListener("click", () => {
```

## Dynamic Task Creation

```javascript
let newtask = document.createElement("li");
```

## Local Storage

```javascript
localStorage.setItem("tasks", JSON.stringify(tasklist));
```

---

# 📱 Responsive Design

Optimized for:
- Desktop
- Tablet
- Mobile Devices

```css
@media screen and (max-width: 500px)
```

---

# 🚀 Future Improvements

- Password Encryption
- Backend Authentication
- Database Integration
- User-specific Todo Lists
- Drag & Drop Tasks
- Dark/Light Theme Toggle
- Task Categories & Priorities

---

# 🧪 How to Run

## Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

## Open Project

Simply open:

```bash
index.html
```

in your browser.

---

# 📚 Learning Outcome

By building this project, you will learn:
- Real-world JavaScript project structure
- Managing application state
- Browser storage handling
- Interactive UI development
- CRUD functionality implementation

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push changes
5. Open a Pull Request

---

# ⭐ Support

If you liked this project:

⭐ Star the repository  
🍴 Fork the project  
📢 Share with others

---

## 📌 Repository Description

> Responsive Login & Signup System with Todo List using HTML, CSS, JavaScript & Local Storage.

---

Built with ❤️ using JavaScript.
