# Food Delivery System

The Food Delivery System is a full-stack web application developed using React.js for the frontend and Django REST Framework (DRF) for the backend. The application allows customers to order food online, restaurants to manage food items and orders, delivery partners to handle deliveries, and admins to manage the overall platform.

The project is designed with JWT Authentication, Redux Toolkit for state management, Bootstrap for responsive UI design, and Role-Based Access Control for secure access management.

---

# Technologies Used

## Frontend
- React.js
- Redux Toolkit
- Bootstrap
- Axios
- React Router DOM

## Backend
- Django
- Django REST Framework (DRF)
- Simple JWT Authentication

## Database
- MySQL

---

# User Roles

The system supports four different user roles:

## Admin
- Manages the entire platform
- Monitors users, restaurants, and delivery partners
- Controls overall system operations

## Customer/User
- Registers and logs into the system
- Browses restaurants and food items
- Adds food items to cart
- Places food orders
- Tracks order status

## Restaurant
- Manages restaurant profile
- Adds, updates, and removes food items
- Accepts or rejects customer orders
- Updates food preparation status

## Delivery Partner
- Views assigned delivery orders
- Updates delivery status
- Marks orders as delivered

---

# Main Features

- Secure JWT Authentication
- Role-Based Access Control
- Restaurant and Food Management
- Cart and Order Management
- Order Tracking System
- Responsive User Interface
- RESTful API Integration
- Redux State Management

---

# Authentication & Authorization

The project uses JWT (JSON Web Token) authentication for secure login and access management. Protected routes are implemented for different user roles to ensure authorized access only.

Access control is handled using:
- DRF Permission Classes
- React Protected Routes
- Role-Based Authorization

---

# System Workflow

1. Users register and log into the system.
2. Customers browse restaurants and food items.
3. Customers place food orders.
4. Restaurants receive and process orders.
5. Delivery partners deliver the orders.
6. Admin monitors and manages all activities.

---

# Database

MySQL is used as the relational database for storing:
- User Information
- Restaurant Details
- Food Items
- Orders
- Delivery Information

---

# State Management

Redux Toolkit is used for managing:
- Authentication State
- Cart Data
- Order Information
- User Sessions

---

# Frontend

The frontend is developed using React.js with Bootstrap for creating a responsive and user-friendly interface.

---

# Backend

The backend is developed using Django REST Framework (DRF), which provides RESTful APIs for frontend communication and handles authentication, authorization, and business logic.

---

# Future Enhancements

- Online Payment Integration
- Live Delivery Tracking
- Push Notifications
- Rating & Review System
- Cloud Deployment
- Docker Support

---

# Conclusion

The Food Delivery System provides a complete online food ordering platform with secure authentication, multiple user roles, order management, and delivery tracking. The project demonstrates full-stack development using modern web technologies and follows scalable architecture practices.