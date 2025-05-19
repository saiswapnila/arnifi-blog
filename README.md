# Arnifi Blog - MERN Stack Blogging Application

This is a full-stack blog platform built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to sign up, log in, and create, edit, filter, and view blogs with categories and optional images.

## 🌐 Live Demo

- **Frontend (Vercel)**: [arnifi-blog.vercel.app](https://arnifi-blog-rho.vercel.app)
- **Backend (Render)**: [arnifi-blog API](https://arnifi-blog-dgls.onrender.com)

---

## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 📝 Create and Edit Blogs
- 🔍 Filter by Category and Author
- 🖼️ Optional Image Upload for Blogs
- 👤 "My Blogs" Page
- 🧪 Toast messages for Success/Error
- 🌈 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- React Router
- Tailwind CSS
- Vercel (for deployment)

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Multer (for image uploads)
- Render (for deployment)

---

## 📁 Project Structure
The project is structured as follows:

arnifi-blog/
│
├── backend/ # Express backend with API routes
│ ├── controllers/ # Route controllers
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── uploads/ # Uploaded blog images
│ ├── .env # Backend environment variables
│ ├── server.js # Entry point
│ └── ...
│
└── backend/frontend/ # React frontend
├── src/
│ ├── components/ # Pages and UI components
│ ├── api.js # Axios instance with baseURL
│ ├── App.jsx
│ └── ...
├── .env # Frontend environment file
└── ...

👩‍💻 Author
Sai Swapnila Naik
GitHub: @saiswapnila

📄 License
This project is licensed for educational and portfolio purposes.
Feel free to explore and learn!
