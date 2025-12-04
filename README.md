# 🚀 TaskFlow - Modern Full-Stack Task Management

> **TaskFlow** is a beautiful, high-performance task management application designed to help you organize your life and boost productivity. Built with the latest web technologies, it offers a seamless and interactive user experience.

![TaskFlow Banner](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3)

## ✨ Key Features

### 🎯 Productivity & Organization
- **Smart Dashboard**: Get a bird's-eye view of your projects with a clean, clutter-free interface.
- **Kanban-style Boards**: Create dedicated boards for different projects or categories to keep tasks organized.
- **Task Scheduling**: Set specific **due dates and times** for your tasks. Never miss a deadline again.
- **Interactive Calendar**: Visualize your schedule with a global **Calendar View** that aggregates tasks from all your boards.
- **Focus Timer**: Built-in **Pomodoro & Stopwatch** widget to help you stay focused during work sessions.

### 🎨 User Experience
- **Modern UI**: A polished interface featuring glassmorphism, smooth gradients, and a carefully curated color palette.
- **Smooth Animations**: Powered by **Framer Motion** for delightful interactions and page transitions.
- **Butter-Smooth Scrolling**: Integrated **Lenis** for a premium scrolling experience.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

### 🔒 Security
- **Secure Authentication**: Robust user registration and login system using **JWT (JSON Web Tokens)**.
- **Data Protection**: Passwords are hashed and salted using **Bcrypt**.

---

## 🛠️ Tech Stack

This project utilizes a modern MERN stack architecture with additional libraries for enhanced UI/UX.

### **Frontend (Client)**
- **Framework**: [React.js](https://react.dev/) (v18) with [Vite](https://vitejs.dev/) for lightning-fast tooling.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive design.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for complex animations and gestures.
- **Icons**: [Lucide React](https://lucide.dev/) for clean and consistent iconography.
- **Routing**: [React Router DOM](https://reactrouter.com/) for client-side routing.
- **HTTP Client**: [Axios](https://axios-http.com/) for API requests.
- **Scrolling**: [Lenis](https://lenis.studio/) for smooth scroll normalization.

### **Backend (Server)**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) for robust API routing.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM.
- **Authentication**: `jsonwebtoken` for auth and `bcryptjs` for password hashing.
- **Security**: `helmet` for HTTP headers and `cors` for Cross-Origin Resource Sharing.
- **Logging**: `morgan` for HTTP request logging.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (Local instance or Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

### 4. Access the App
Open your browser and visit:
```
http://localhost:5173
```

---

## 📂 Project Structure

```
taskflow/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (TimerWidget, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # Application Pages (Dashboard, Board, Calendar)
│   │   ├── services/       # API service configuration
│   │   └── ...
│   └── ...
├── server/                 # Backend Node.js/Express Application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth and error handling middleware
│   │   ├── models/         # Mongoose database models
│   │   ├── routes/         # API route definitions
│   │   └── app.js          # App entry point
│   └── ...
└── README.md               # Project Documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
