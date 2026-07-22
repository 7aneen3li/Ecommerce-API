<div align="center">

# 🛍️ E-Commerce REST API

### A scalable RESTful backend API for managing categories, products, shopping carts, and orders using Node.js, Express.js, MongoDB, and Mongoose.

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
</p>

</div>

---

# 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)

---

# 📖 About

**E-Commerce REST API** is a scalable backend application built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. It provides a complete RESTful API for managing product categories, products, shopping carts, and customer orders while following clean architecture principles and centralized error handling.

This project includes the following REST APIs:

- Categories API
- Products API
- Shopping Cart API
- Orders API

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |

---

# ✨ Features

- 🗂️ **Categories API** — Manage product categories with full CRUD operations.
- 📦 **Products API** — Create, retrieve, update, and delete products.
- 🛒 **Shopping Cart API** — Add, update, remove, and clear cart items.
- 🧾 **Orders API** — Create, manage, and update customer orders.
- 🛡️ Centralized error handling with consistent API responses.
- 🧼 Protection against MongoDB NoSQL injection using `express-mongo-sanitize`.
- 🌱 Database seeding for quick local development.

---

# ✅ Prerequisites

Before running this project, ensure you have the following installed:

| Requirement | Notes |
|-------------|-------|
| **Node.js** | Version 18 or later |
| **MongoDB** | Local installation or MongoDB Atlas |
| **npm** | Included with Node.js |

---

# 🚀 Installation

Follow the steps below to run the project locally.

## 1. Clone the repository

```bash
git clone https://github.com/7aneen3li/Ecommerce-API.git
cd Ecommerce-API
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then update the values as described in the Environment Variables section.

## 4. Seed the database (Recommended)

```bash
npm run seed
```

## 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:5000
```

You can also run:

```bash
npm start
```

to start the server without Nodemon.


---

# 🔐 Environment Variables

Create a `.env` file in the project root and configure the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | The port on which the Express server will run. | `5000` |
| `NODE_ENV` | Specifies the current application environment. | `development` |
| `MONGO_URI` | MongoDB connection string for a local database or MongoDB Atlas. | `mongodb://127.0.0.1:27017/ecommerce-api` |

---

# 📡 API Endpoints

All API routes are prefixed with:

```text
/api
```

---

## 🗂️ Categories API

Base URL:

```text
/api/categories
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | Retrieve all categories. |
| `POST` | `/api/categories` | Create a new category. |
| `GET` | `/api/categories/:id` | Retrieve a category by its ID. |
| `PATCH` | `/api/categories/:id` | Update an existing category. |
| `DELETE` | `/api/categories/:id` | Delete a category. |

---

## 📦 Products API

Base URL:

```text
/api/products
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Retrieve all products. |
| `POST` | `/api/products` | Create a new product. |
| `GET` | `/api/products/:id` | Retrieve a product by its ID. |
| `PATCH` | `/api/products/:id` | Update an existing product. |
| `DELETE` | `/api/products/:id` | Delete a product. |

---

## 🛒 Shopping Cart API

Base URL:

```text
/api/cart
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Retrieve the current shopping cart. |
| `DELETE` | `/api/cart` | Remove all items from the shopping cart. |
| `POST` | `/api/cart/items` | Add a product to the shopping cart. |
| `PATCH` | `/api/cart/items/:productId` | Update the quantity of a cart item. |
| `DELETE` | `/api/cart/items/:productId` | Remove a specific item from the shopping cart. |

---

## 🧾 Orders API

Base URL:

```text
/api/orders
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Retrieve all orders. |
| `POST` | `/api/orders` | Create a new order by checking out the current shopping cart. |
| `DELETE` | `/api/orders` | Delete all orders. |
| `GET` | `/api/orders/:id` | Retrieve an order by its ID. |
| `PATCH` | `/api/orders/:id/status` | Update the status of an existing order. |
| `DELETE` | `/api/orders/:id` | Delete a specific order. |

---

# 🗄️ Project Structure

```text
ECOMMERCE-API/
├── config/
│   └── app.config.js           # Application configuration
├── controllers/
│   ├── cart.controller.js
│   ├── category.controller.js
│   ├── order.controller.js
│   └── product.controller.js
├── db/
│   └── connectDB.js            # MongoDB connection
├── middleware/
│   └── errorHandler.js         # Global error handling middleware
├── models/
│   ├── cart.model.js
│   ├── category.model.js
│   ├── order.model.js
│   └── product.model.js
├── postman/
│   ├── E-Commerce API.postman_collection.json
│   └── E-Commerce API Dev.postman_environment.json
├── routes/
│   ├── cart.routes.js
│   ├── category.routes.js
│   ├── order.routes.js
│   └── product.routes.js
├── utils/
│   ├── AppError.js
│   └── asyncHandler.js
├── .env.example
├── app.js
├── seed.js
└── package.json
```

### Folder Overview

| Folder | Purpose |
|---------|---------|
| **config/** | Stores application configuration files. |
| **controllers/** | Contains the business logic for each API endpoint. |
| **db/** | Handles the MongoDB database connection. |
| **middleware/** | Contains custom middleware such as global error handling. |
| **models/** | Defines all Mongoose schemas and models. |
| **postman/** | Includes the Postman collection and environment for API testing. |
| **routes/** | Defines all Express routes and maps them to controllers. |
| **utils/** | Provides reusable utility classes and helper functions. |

---

# ▶️ Available Scripts

The following npm scripts are available for development and maintenance:

| Command | Description |
|---------|-------------|
| `npm install` | Install all project dependencies. |
| `npm run dev` | Start the development server with Nodemon. |
| `npm start` | Start the application in production mode. |
| `npm run seed` | Populate the database with sample data. |

---

# 🔒 Security Features

This project follows backend development best practices and includes several security features:

- 🛡️ MongoDB NoSQL injection protection using **express-mongo-sanitize**
- 🌍 Environment-based configuration using **dotenv**
- ⚠️ Centralized global error handling
- ✅ Mongoose schema validation
- 🏗️ Modular project architecture
- 🔄 Consistent RESTful API design

---

# 🧪 Testing

The API can be tested using any REST API client, including:

- **Postman**
- **Thunder Client**
- **Insomnia**

A Postman collection and environment are included in the project for easier testing.

---

# 🚀 Future Improvements

Potential enhancements for future versions include:

- 🔐 JWT Authentication & Authorization
- 👤 User Accounts
- ❤️ Wishlist Functionality
- ⭐ Product Reviews & Ratings
- 🖼️ Product Image Uploads
- 💳 Payment Gateway Integration
- 📄 Swagger / OpenAPI Documentation
- 🧪 Unit & Integration Testing
- 🐳 Docker Support

---

# 👩‍💻 Author

**Haneen Ali**

Developed as part of the **Digital Egypt Cubs Initiative (DECI) – Web Development Program**.

This project demonstrates backend development skills using modern JavaScript technologies and follows industry best practices for building scalable RESTful APIs.

---

# 📄 License

This project was developed for educational purposes as part of the **Digital Egypt Cubs Initiative (DECI)** Web Development Program.

---

<div align="center">

### ⭐ Thank you for reviewing this project!

If you found this project helpful or interesting, consider giving it a ⭐ on GitHub.

**Happy Coding! 🚀**

</div>