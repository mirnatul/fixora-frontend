# Fixora - Home Service Marketplace

Fixora is a full-stack home service marketplace platform where customers can find professional technicians, book services, make payments, and leave reviews. Technicians can manage their services, availability, and bookings, while admins can monitor the entire platform.

## Live Links

| Platform | Link |
| --- | --- |
| Frontend | https://fixora-frontend-xi.vercel.app/ |
| Backend API | https://fixora-backend-updated.vercel.app/ |

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Server Actions
- React 19
- Stripe Checkout Integration

## Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Stripe Payment Gateway

---

# Project Architecture

```
Fixora

Frontend (Next.js)
        |
        | REST API
        |
Backend (Express + TypeScript)
        |
        |
PostgreSQL Database
        |
        |
Prisma ORM
```

---

# Features

## Authentication

| Frontend Route | API Endpoint | Description |
| --- | --- | --- |
| `/login` | `/api/auth/login` | Login existing users |
| `/register` | `/api/users/register` | Register new users |

Supported Roles:

- Customer
- Technician
- Admin

---

# Public Pages

## Home Page

| Frontend Route | API | Description |
| --- | --- | --- |
| `/` | - | Navbar, Banner, Features, Top Rated Services, Top Technicians, Footer |

The homepage dynamically displays:

- Top rated services
- Top rated technicians

---

## Technicians

| Frontend Route | API Endpoint | Description |
| --- | --- | --- |
| `/technicians` | `/api/technician` | Display all available technicians |
| `/technicians/:technicianId` | `/api/technician/:technicianId` | Technician details, services and reviews |

Users can:

- Browse technicians
- View technician profiles
- See available services
- Check customer reviews

---

## Services

| Frontend Route | API Endpoint | Description |
| --- | --- | --- |
| `/services` | `/api/services` | Service listing with search, filters and pagination |

Features:

- Search by service name
- Filter services
- Pagination
- Service grid view

---

# Customer Dashboard

Customer dashboard allows customers to manage their profile, bookings, payments and reviews.

| Frontend Route | API Endpoint | Method | Description |
| --- | --- | --- | --- |
| `/customer-dashboard/profile` | `/api/auth/me` | GET | View profile information |
| `/customer-dashboard/profile` | `/api/auth/me/update` | PATCH | Update profile |
| `/customer-dashboard/my-bookings` | `/api/bookings/user/:userId` | GET | View all bookings |
| `/customer-dashboard/payment-history` | `/api/payment` | GET | Payment history |

## Customer Actions

| Method | API Endpoint | Description |
| --- | --- | --- |
| PATCH | `/api/bookings/cancel-booking/:bookingId` | Cancel booking |
| POST | `/api/payment/checkout/:bookingId` | Create Stripe checkout session |
| POST | `/api/review/:bookingId` | Submit service review |

---

# Technician Dashboard

Technicians can manage their services, availability and customer bookings.

| Frontend Route | API Endpoint | Description |
| --- | --- | --- |
| `/technician-dashboard` | `/api/technician/dashboard` | Dashboard statistics |
| `/technician-dashboard/profile` | `/api/auth/me` | Manage technician profile |
| `/technician-dashboard/bookings-i-get` | `/api/bookings/technician/:userId` | View received bookings |
| `/technician-dashboard/my-services` | `/api/services/technician` | Manage services |
| `/technician-dashboard/availability` | `/api/technician/availability` | Manage working slots |

Dashboard Statistics:

- Total bookings
- Earnings
- Completed booking rate
- Booking status information

## Technician Actions

| Method | API Endpoint | Description |
| --- | --- | --- |
| PATCH | `/api/bookings/update-status/:bookingId` | Update booking status |

Booking status flow:

```
PENDING
   |
ACCEPTED
   |
IN_PROGRESS
   |
COMPLETED
```

---

# Admin Dashboard

Admins can manage users, categories and monitor platform statistics.

| Frontend Route | API Endpoint | Description |
| --- | --- | --- |
| `/admin-dashboard` | `/api/users/admin/stats` | Platform statistics |
| `/admin-dashboard/profile` | `/api/auth/me` | Manage admin profile |
| `/admin-dashboard/all-users` | `/api/users/admin/users` | Manage users |
| `/admin-dashboard/all-categories` | `/api/category` | Manage categories |

Admin Features:

- View total users
- View total technicians
- View total bookings
- View revenue
- Ban/unban users
- Create and update categories

---

# Payment System

Fixora uses Stripe Checkout for secure online payments.

Payment Flow:

```
Customer books service

        ↓

Booking created

        ↓

Stripe checkout session created

        ↓

Payment completed

        ↓

Booking status updated
```

---

# Booking System

Customers can:

- Select service
- Choose available date
- Select available time slots
- Provide address and notes
- Complete payment
- Review completed services


Technicians can:

- Accept bookings
- Start service
- Complete service


---

# Environment Variables

## Backend

```env
DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
APP_URL=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# Installation Guide

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Future Improvements

- Customer dashboard analytics
- Real-time chat between customer and technician
- Push notifications
- Technician verification system
- Advanced search with location support
- Mobile application

---

# Author

**Lipon**

Computer Science and Engineering Student  
Full Stack Web Developer
