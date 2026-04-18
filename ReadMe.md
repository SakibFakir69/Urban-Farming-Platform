<div align="center">

# 🌾 MakTech Farming Backend API

**A full-featured backend system for a modern farming marketplace**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

*Multi-role marketplace backend powering vendors, customers, and admins — with products, rentals, orders, certifications, and community features.*

</div>

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Authentication](#-authentication)
- [User Roles](#-user-roles)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Tokens) |
| Access Control | Role-Based Access Control (RBAC) |
| Security | Express Rate Limiter |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure token-based auth for all roles
- 🧑‍🌾 **Vendor Management** — Full vendor lifecycle including applications and approvals
- 🥕 **Product (Produce) System** — Create, manage, and browse farm products
- 🏡 **Rental Space Management** — List and manage farmland or equipment rentals
- 🧾 **Order System** — Place and track orders with pagination support
- 📜 **Sustainability Certifications** — Admin-managed certification workflow
- 💬 **Community Posts** — Farming community discussion board
- 👑 **Admin Control Panel** — Full oversight of users, vendors, and orders
- ⚡ **Rate Limiting** — Brute-force protection on auth endpoints
- 🧠 **RBAC** — Fine-grained role-based access across all routes

---

## 📁 Project Structure

```
server/
│
├── prisma/                    # Database schema & migrations
│
├── src/
│   ├── modules/
│   │   ├── user/              # Registration & login
│   │   ├── vendor/            # Vendor CRUD & applications
│   │   ├── product/           # Produce listings
│   │   ├── rental/            # Rental space management
│   │   ├── order/             # Order placement & tracking
│   │   ├── community/         # Community posts
│   │   └── admin/             # Admin control panel
│   │
│   ├── middleware/            # Auth, RBAC, rate limiting
│   ├── utils/                 # Helpers & shared utilities
│   ├── app.js
│   └── server.js
│
├── package.json
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/maktech-farming-api.git
cd maktech-farming-api/server

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_super_secret_key"
PORT=5000
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`

---

## 🔐 Authentication

All protected routes require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

Tokens are issued upon successful login and must be included in all subsequent requests to protected endpoints.

> ⚡ Rate limiting is applied to `/register` and `/login` endpoints to prevent brute-force attacks.

---

## 👥 User Roles

| Role | Badge | Permissions |
|------|-------|-------------|
| `CUSTOMER` | 👤 | Browse products, place orders, view rentals |
| `VENDOR` | 🏪 | Manage own products, rentals & certifications |
| `ADMIN` | 👑 | Full system control — users, vendors, orders, certs |

---

## 🌐 API Reference

### Base URL
```
/api/v1
```

---

### 👤 Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/users/register` | Register a new user | ❌ |
| `POST` | `/users/login` | Login and receive JWT | ❌ |

---

### 🏪 Vendors

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/vendors/vendor` | Create vendor profile | ✅ |
| `GET` | `/vendors/vendor` | Get vendor profile | ✅ |
| `PATCH` | `/vendors/vendor` | Update vendor profile | ✅ Vendor |
| `DELETE` | `/vendors/vendor` | Delete vendor profile | ✅ Vendor |
| `POST` | `/vendors/apply` | Apply for certification | ✅ Vendor |

---

### 🥕 Products (Produce)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/products` | Create a new product | ✅ Vendor |
| `GET` | `/products` | List all products | ❌ |
| `GET` | `/products/:id` | Get product by ID | ❌ |
| `PATCH` | `/products/:id` | Update product | ✅ Vendor |
| `DELETE` | `/products/:id` | Delete product | ✅ Vendor |

---

### 🏡 Rentals

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/rentals` | Create a rental listing | ✅ Vendor |
| `GET` | `/rentals` | List all rentals | ❌ |
| `GET` | `/rentals/:id` | Get rental by ID | ❌ |
| `PATCH` | `/rentals/rentals/:id` | Update rental | ✅ Vendor |
| `DELETE` | `/rentals/rentals/:id` | Delete rental | ✅ Vendor |

---

### 🛒 Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/orders` | Place a new order | ✅ Customer |
| `GET` | `/orders` | Get order history (paginated) | ✅ |

---

### 💬 Community

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/communitys/posts` | Create a post | ✅ |
| `GET` | `/communitys/posts` | List all posts | ❌ |
| `GET` | `/communitys/posts/:id` | Get post by ID | ❌ |
| `PATCH` | `/communitys/posts/:id` | Update post | ✅ Owner |
| `DELETE` | `/communitys/posts/:id` | Delete post | ✅ Owner |

---

### 👑 Admin Panel

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/users` | List all users |
| `GET` | `/admin/vendors` | List all vendors |
| `GET` | `/admin/certificates` | List all certifications |
| `GET` | `/admin/orders` | List all orders |
| `PATCH` | `/admin/certificates/approve/:vendorId` | Approve vendor certification |
| `PATCH` | `/admin/certificates/reject/:vendorId` | Reject vendor certification |

> All admin routes require `ADMIN` role.

---

## 🗄️ Database Schema

Built with **Prisma ORM** on **PostgreSQL** — fully relational:

```
Users ──────────────► Orders
  │
  └──► Vendors ──────► Products
            │
            ├────────► Rentals
            │
            └────────► Certifications
```

Key relationships:
- A **User** can be a **Vendor** and place **Orders**
- A **Vendor** manages **Products**, **Rentals**, and **Certifications**
- **Admins** approve or reject vendor **Certifications**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---