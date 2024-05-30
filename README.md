# Online Bidding System

## Overview

This project is an online bidding system built using Node.js, Express and Prisma ORM with a Supabase (PostgreSQL) database. It features user authentication, role-based access control, real-time bidding, and notifications.

## Features

1. **User Registration and Authentication**
   - Register a new user.
   - Login to receive a JWT token for authentication.

2. **Role-Based Access Control**
   - Users have roles: 'user' and 'admin'.
   - Role-based access for creating, updating, and deleting auction items.

3. **Auction Items Management**
   - Fetch all auction items with pagination.
   - Retrieve a single auction item by ID.
   - Create, update, and delete auction items (authenticated users, only item owners or admins).

4. **Bidding System**
   - Place bids on auction items (authenticated users).
   - Retrieve all bids for a specific item.

5. **Real-Time Notifications**
   - Notify all bidders about new bids and outbid notifications in real-time.
   - Retrieve notifications for the logged-in user.
   - Mark notifications as read.

## Project Structure


.
- ├── controllers
- │   ├── authController.js
- │   ├── bidController.js
- │   ├── itemController.js
- │   └── notificationController.js
- ├── middlewares
- │   └── authMiddleware.js
- ├── prisma
- │       └── schema.prisma
- ├── routes
- │   ├── authRoutes.js
- │   ├── bidRoutes.js
- │   ├── itemRoutes.js
- │   └── notificationRoutes.js
- ├── services
- │   ├── authService.js
- │   ├── bidService.js
- │   ├── itemService.js
- │   └── notificationService.js
- ├── config
- │   └── database.js
- ├── uploads/
- ├── .env
- ├── package.json
- └── server.js

## Setup and Installation

- Node.js
- Supabase (PostgreSQL)
- npm (Node Package Manager)

## Installation 

1. Clone repository
- git clone https://github.com/jaydeep203/online-bidding.git
- cd online-bidding-system

2. Install Dependancies
npm install

3. Setup Environment (.env)
- DATABASE_URL="postgres://postgres.[name]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
- JWT_SECRET="[secret key]"

4. Setup Supabase
npx prisma migrate dev

5. Start Server
nodemon server.js

# Api Endpoints

## Authentication
- Register: POST /auth/register
- Login: POST /auth/login
## Users
- Get Profile: GET /users/profile
## Items
- Get All Items (with pagination): GET /items
- Get Item by ID: GET /items/:id
- Create Item: POST /items (Authenticated users, image upload)
- Update Item: PUT /items/:id (Authenticated users, only item owners or admins)
- Delete Item: DELETE /items/:id (Authenticated users, only item owners or admins)
## Bids
- Get Bids for an Item: GET /items/:itemId/bids
- Place a Bid: POST /items/:itemId/bids (Authenticated users)
## Notifications
- Get Notifications: GET /notifications (Authenticated users)
- Mark Notifications as Read: POST /notifications/mark-read (Authenticated users)
