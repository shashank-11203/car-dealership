# 🚗 Car Dealership Inventory Management System

A full-stack web application built as part of the **Incubyte Software Craftsmanship Assessment**.

The application enables authenticated users to browse and purchase vehicles while allowing administrators to manage vehicle inventory through a modern dashboard.

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-based Authorization (Admin/User)

---

### Vehicle Inventory

- View all vehicles
- Search vehicles
- Purchase vehicles
- Add new vehicles (Admin)
- Edit vehicle details (Admin)
- Delete vehicles (Admin)
- Restock vehicle quantity (Admin)

---

### Dashboard

- Responsive Dashboard
- Inventory Statistics
    - Total Vehicles
    - Total Stock
    - Inventory Value
- Modern Vehicle Cards
- Add/Edit Vehicle Modal
- Mobile Friendly UI

---

### Testing

Backend is tested using

- Jest
- Supertest
- MongoDB Memory Server

Tests include:

- User Registration
- User Login
- Vehicle CRUD
- Purchase Vehicle
- Restock Vehicle

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- React Toastify
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Testing

- Jest
- Supertest
- MongoDB Memory Server

---

# Project Structure

```
car-dealership/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tests/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Admin Account

For testing admin functionality:

```
Email:
admin@mail.com

Password:
admin@123
```

---



# Author

Shashank Solanki

Master of Engineering'27 (Software Engineering) - LDCE