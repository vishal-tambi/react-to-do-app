# 🚀 TaskFlow - Modern Full-Stack Task Management

> **TaskFlow** is a beautiful, high-performance task management application designed to help you organize your life and boost productivity. Built with the latest web technologies, it offers a seamless and interactive user experience.

![TaskFlow Banner](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3)

## ✨ Detailed Features

### 🎯 Productivity & Organization
*   **Smart Dashboard**: The central hub of your workflow. It provides a quick summary of your boards and quick access to essential tools.
*   **Kanban-style Boards**: Create unlimited boards to categorize your work (e.g., "Work", "Personal", "Shopping"). Inside each board, manage tasks with ease.
*   **Task Scheduling**:
    *   **Due Dates & Times**: Assign specific deadlines to tasks.
    *   **Visual Indicators**: Tasks display their due dates, and overdue items are highlighted in red to grab your attention immediately.
*   **Global Calendar View**: A dedicated Calendar page that aggregates **all** your tasks from **all** boards into a single monthly view. See your entire schedule at a glance.
*   **Focus Timer Widget**: A built-in productivity tool right on the dashboard.
    *   **Stopwatch**: Track how long you spend on a task.
    *   **Pomodoro Timer**: Set preset intervals (e.g., 25m) to work in focused bursts.

### 🎨 User Experience (UX)
*   **Modern Aesthetic**: A clean, white-space-dominant design with soft shadows and rounded corners, inspired by modern SaaS applications.
*   **Interactive Elements**:
    *   **Hover Effects**: Buttons and cards react to your cursor.
    *   **Micro-animations**: Tasks slide in when added, and fade out when deleted, powered by `framer-motion`.
*   **Smooth Scrolling**: Integrated `Lenis` library ensures that scrolling feels weighty and premium, unlike standard browser scrolling.
*   **Responsive Design**: The sidebar collapses or adapts on smaller screens, ensuring you can manage tasks from your phone or tablet.

### 🔒 Security & Performance
*   **JWT Authentication**: Stateless authentication keeps your session secure without server-side storage.
*   **Password Encryption**: User passwords are never stored in plain text; they are hashed using `bcryptjs`.
*   **Protected Routes**: Middleware ensures that unauthorized users cannot access private data.

---

## 📡 API Reference

The backend exposes a RESTful API. All endpoints (except auth) require a valid Bearer Token in the `Authorization` header.

### 🔐 Authentication
| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | `name`, `email`, `password` |
| `POST` | `/api/auth/login` | Login user & get token | `email`, `password` |
| `GET` | `/api/auth/me` | Get current user profile | _None_ |

### 📋 Boards
| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/boards` | Get all boards for user | _None_ |
| `POST` | `/api/boards` | Create a new board | `title` |
| `PUT` | `/api/boards/:id` | Update a board | `title` |
| `DELETE` | `/api/boards/:id` | Delete a board | _None_ |

### ✅ Todos (Tasks)
| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos/user` | **Get ALL user tasks** (for Calendar) | _None_ |
| `GET` | `/api/todos/board/:boardId` | Get tasks for a specific board | _None_ |
| `POST` | `/api/todos` | Create a new task | `boardId`, `title`, `dueDate` (optional) |
| `PUT` | `/api/todos/:id` | Update task (status, title, etc.) | `status`, `title`, `description` |
| `DELETE` | `/api/todos/:id` | Delete a task | _None_ |

---

## 🛠️ Tech Stack

### **Frontend (Client)**
*   **React.js (v18)**: Component-based UI library.
*   **Vite**: Next-generation frontend tooling.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
*   **Framer Motion**: Production-ready motion library for React.
*   **Lucide React**: Beautiful & consistent icon set.
*   **Axios**: Promise-based HTTP client.
*   **Lenis**: Smooth scrolling library.

### **Backend (Server)**
*   **Node.js & Express**: Fast, unopinionated web framework.
*   **MongoDB & Mongoose**: NoSQL database and object modeling.
*   **JWT (JSON Web Tokens)**: Securely transmitting information between parties.
*   **Bcryptjs**: Library to help you hash passwords.
*   **Cors**: Middleware to enable Cross-Origin Resource Sharing.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   MongoDB (Local or Atlas)

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/taskflow.git
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    # Create .env file with: PORT, MONGO_URI, JWT_SECRET, FRONTEND_URL
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Enjoy!** Visit `http://localhost:5173`

---

## 📄 License

This project is licensed under the MIT License.
