# 📦 Parcel Delivery API

A secure, modular, and role-based backend API for managing **parcel delivery services**.  
It allows **senders** and **receivers** to create, track, update, and manage parcel deliveries, with **status logs** to track the full delivery journey.

---

## 🚀 Project Overview

This backend service is built with **Node.js**, **Express.js**, and **MongoDB** (Mongoose ODM).  
It supports **role-based access control (RBAC)** for Admin, Delivery Staff, and Regular Users.

---

## ⚙️ Setup & Environment Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Anowervaiya/L2A5_percel_delivary_system.git
cd L2A5_percel_delivary_system

```
### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create .env file

```bash
PORT=5000
DB_URL=mongodb+srv://username:password@cluster0.zsn3kat.mongodb.net/collection-name?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV="development"


# BCRYPT
BCRYPT_SALT_ROUND=10

# JWT
JWT_ACCESS_SECRET=your secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your secret
JWT_REFRESH_EXPIRES=30d


#Google 
GOOGLE_CLIENT_SECRET=GOCSPX-GOOGLE_CLIENT_SECRET
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CALLBACK_URL=GOOGLE_CALLBACK_URL

#Express_Session
EXPRESS_SESSION_SECRET=express-session
# Frontend URL
FRONTEND_URL=http://localhost:5173

```

### 4️⃣ Run the development server
```bash
npm run dev
```

### 5️⃣ Build for production

```bash
npm run build
npm start
```

### 🛠 Technologies Used

-Node.js - JavaScript runtime

-Express.js - Backend framework

-MongoDB - NoSQL database

-Mongoose - ODM for MongoDB

-JWT - Authentication

-Bcrypt - Password hashing











