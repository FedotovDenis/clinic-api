# Clinic API

A RESTful API for managing clinics, doctors, and services in a medical system. Built with Node.js, Express, TypeScript, and MongoDB, it provides endpoints for user authentication, clinic management, doctor management, and service management. The API includes JWT-based authentication, role-based access control (admin/user), and Swagger documentation.

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Database](#database)
- [Submission](#submission)

## Technologies
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **TypeScript**: Superset of JavaScript for type safety.
- **MongoDB**: NoSQL database for storing clinic, doctor, and user data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Swagger**: API documentation.
- **Nodemailer**: For sending password reset emails.
- **Express-Validator**: Middleware for request validation.
- **Dotenv**: For environment variable management.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/FedotovDenis/clinic-api.git
   cd clinic-api
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

## Running the Application
1. **Start the server**:
   ```bash
   npm start
   ```
   - The server runs on `http://localhost:7000`.
   - Output: `Server listening on 7000` and `Database available!!!`.
2. **Access Swagger documentation**:
   - Open `http://localhost:7000/api-docs` in your browser.

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=7000
MONGO_URI=mongodb+srv://nodeuser:MyPass123@cluster0.szq158j.mongodb.net/clinic-api
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

- **PORT**: Port for the server (default: 7000).
- **MONGO_URI**: MongoDB Atlas connection string.
- **JWT_SECRET**: Secret key for JWT signing.
- **EMAIL_USER**: Gmail address for sending emails (e.g., password reset).
- **EMAIL_PASS**: Gmail app password (generate in Google Account settings).

## API Endpoints
All endpoints are documented in Swagger at `http://localhost:7000/api-docs`. Below is a summary:

### Authentication
- **POST /auth/register**: Register a new user (`email`, `password`).
- **POST /auth/login**: Login and receive JWT token (`email`, `password`).
- **POST /auth/reset-password**: Request password reset (`email`).

### Clinics (Admin only for POST/PUT/DELETE)
- **POST /clinics**: Create a clinic (`name`, `address`, `city`, `rating`).
- **GET /clinics**: Get clinics (supports query params: `city`, `name`, `service`, `doctor`, `sortByName`).
- **GET /clinics/:id**: Get clinic by ID.
- **PUT /clinics/:id**: Update clinic.
- **DELETE /clinics/:id**: Delete clinic.

### Doctors (Admin only for POST/PUT/DELETE)
- **POST /doctors**: Create a doctor (`name`, `surname`, `phone`, `email`, `specialty`, `clinics`, `services`).
- **GET /doctors**: Get doctors (supports query params: `name`, `surname`, `phone`, `email`, `specialty`, `sortByName`).
- **GET /doctors/:id**: Get doctor by ID.
- **PUT /doctors/:id**: Update doctor.
- **DELETE /doctors/:id**: Delete doctor.

### Services (Admin only for POST/PUT/DELETE)
- **POST /services**: Create a service (`name`).
- **GET /services**: Get services (supports query params: `name`, `sortByName`).
- **GET /services/:id**: Get service by ID.
- **PUT /services/:id**: Update service.
- **DELETE /services/:id**: Delete service.

## Testing
1. **Import Postman collection**:
   - Import `Clinic API.postman_collection.json` into Postman.
   - Contains key endpoints: `POST /auth/login`, `POST /doctors`, `PUT /clinics/:id`.
2. **Test key endpoints**:
   - Login: `POST /auth/login` with `email: admin@example.com`, `password: admin123`.
   - Create doctor: `POST /doctors` with clinic ID `684228a929fe3e808bc5d4f7` and service ID `68428fb025a99a2cea1750d7`.
   - Update clinic: `PUT /clinics/684228a929fe3e808bc5d4f7` to add services.

## Database
- **MongoDB Atlas**: Database `clinic-api` with collections: `clinics`, `doctors`, `services`, `users`.
- **Dump**: Restore the database using the provided `dump.zip`:
  ```bash
  mongorestore --uri mongodb+srv://nodeuser:MyPass123@cluster0.szq158j.mongodb.net/clinic-api --archive=dump.zip
  ```

## Submission
- **Repository**: https://github.com/FedotovDenis/clinic-api
- **Submitted files**:
   - `Clinic API.postman_collection.json`: Postman collection for testing.
   - `dump.zip`: MongoDB database dump.
- **Submission form**: https://forms.gle/CMnjbz4TPzw89JoR6