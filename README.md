# Full-Stack To-Do Web App

A production-grade, full-stack To-Do application built with the MERN stack (MongoDB, Express, React, Node.js) and TailwindCSS.

## Features

- **Authentication**: Secure JWT-based login and registration.
- **Board Management**: Create, view, and delete boards.
- **Todo Management**: Add, toggle status, and delete todos within boards.
- **Responsive Design**: Modern UI built with TailwindCSS.

## Tech Stack

- **Frontend**: React.js, TailwindCSS, Vite, Axios, React Router DOM, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS.

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Backend Setup**

    ```bash
    cd server
    npm install
    ```

    Create a `.env` file in the `server` directory:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/todo-app
    JWT_SECRET=your_super_secret_key
    ```

    Start the server:

    ```bash
    npm run dev
    ```

3.  **Frontend Setup**

    ```bash
    cd client
    npm install
    ```

    Start the development server:

    ```bash
    npm run dev
    ```

4.  **Access the App**

    Open your browser and navigate to `http://localhost:5173`.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Boards
- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Todos
- `GET /api/todos/board/:boardId` - Get todos for a board
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## License

MIT
