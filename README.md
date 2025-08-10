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


# 📍 API Endpoints Summary

## 🔐 Auth Routes
| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| **POST** | `/api/v1/auth/login` | login a  user|
| **POST** | `/api/v1/auth/set-password`    | set password for who sign in with google |
| **GET**  | `/api/v1/auth/google`       | google login |
| **GET**  | `/api/v1/auth/google`       | google callback api |

---

### 📦 User Routes

| Method  | Endpoint                  | Access Roles        | Description |
|---------|---------------------------|--------------------|-------------|
| **POST**    | `/api/v1/user/register`          | **anyone** | register a new user|
| **GET**    | `/api/v1/user/all-user`         | **Admin**           | Get all users |
| **PATCH**  | `/api/v1/user/delete/:id`         | **Admin**           | delete a user |
| **DELETE** | `/api/v1/user/block/:id`         | **Admin**           |block or unblock a user|

---


### 📦 Parcel Routes

| Method  | Endpoint                  | Access Roles        | Description |
|---------|---------------------------|--------------------|-------------|
| **GET**    | `/api/v1/parcel/my-parcel`          | **Sender, Receiver** | Get parcels related to the logged-in user |
| **GET**    | `/api/v1/parcel/all-parcel`         | **Admin**           | Get all parcels |
| **POST**   | `/api/v1/parcel/create-parcel`      | **Sender**          | Create a new parcel |
| **GET**    | `/api/v1/parcel/filterByStatus`     | **Admin**           | Filter parcels by their status |
| **GET**    | `/api/v1/parcel/track/:trackingId`  | **All Roles**       | Track a parcel by its tracking ID |
| **PATCH**  | `/api/v1/parcel/cancel/:id`         | **Sender**          | Cancel a parcel (if not yet delivered) |
| **PATCH**  | `/api/v1/parcel/confirm/:id`        | **Receiver**        | Confirm parcel delivery |
| **PATCH**  | `/api/v1/parcel/status/:id`         | **Admin**           | Update parcel status (adds to `statusLog`) |
| **DELETE** | `/api/v1/parcel/delete/:id`         | **Admin**           | Delete a parcel from the system |

---

### 📦 Status Log Example
Each parcel contains a `statusLog` array to record every stage in its journey.

```json
"statusLog": [
  { "status": "REQUESTED", "timestamp": "2025-08-09T14:30:00Z", "updatedBy": "senderId" },
  { "status": "ACCEPTED", "timestamp": "2025-08-09T16:00:00Z", "updatedBy": "adminId" },
  { "status": "DISPATCHED", "timestamp": "2025-08-09T20:00:00Z", "updatedBy": "adminId" },
  { "status": "IN_TRANSIT", "timestamp": "2025-08-09T20:00:00Z", "updatedBy": "adminId" },
  { "status": "DELIVERED", "timestamp": "2025-08-10T12:00:00Z", "updatedBy": "recieverId" }
]
```

###  Technologies Used

- Node.js - JavaScript runtime
  
- Typescript- language

- Express.js - Backend framework

- MongoDB - NoSQL database

- Mongoose - ODM for MongoDB

- JWT - Authentication

- Bcrypt - Password hashing


### Author
Developed by Anower Hossen
📧 Email: mdanowerhossen727@gmail.com
🔗 LinkedIn: www.linkedin.com/in/anowerhossen








