# 💡 Random Ideas  
A backend API designed for managing and sharing random ideas with CRUD operations.  

---

## 📌 Project Overview  
**Random Ideas** is a RESTful API built using Node.js, Express.js, and MongoDB Atlas. The API facilitates the management of ideas and user data with endpoints for creating, reading, updating, and deleting resources.

---

## 🔧 Technologies Used  
- **Node.js**: Runtime environment for building the backend.  
- **Express.js**: Framework for API development.  
- **MongoDB Atlas**: Cloud-based NoSQL database for storing ideas and user data.  

---

## ⚙️ REST API Information  

### **Base URL**:  
`http://your-api-domain/api`  

### **Endpoints**  

#### 1️⃣ **Ideas Resource**  
- **Endpoint**: `/api/ideas`  
- **CRUD Operations**:  
  - **GET** `/api/ideas`: Retrieve all ideas.  
  - **POST** `/api/ideas`: Create a new idea.  
  - **PUT** `/api/ideas/:id`: Update an existing idea by ID.  
  - **DELETE** `/api/ideas/:id`: Delete an idea by ID.  

#### 2️⃣ **Users Resource**  
- **Endpoint**: `/api/users`  
- **CRUD Operations**:  
  - **GET** `/api/users`: Retrieve all users.  
  - **POST** `/api/users`: Register a new user.  
  - **PUT** `/api/users/:id`: Update user details by ID.  
  - **DELETE** `/api/users/:id`: Delete a user by ID.  

---

## 🛠️ Methodology  
The project is built on the **CRUD** (Create, Read, Update, Delete) methodology to handle the following resources:  
1. **Ideas**  
2. **Users**  

---
## 🚀 Running the Backend  

Follow these steps to set up and run the backend server:  

1. **Install Dependencies**  
   Navigate to the project directory and run:  
   ```bash
   npm install

