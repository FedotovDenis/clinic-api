
# Clinic API

This repository contains the backend implementation for a **clinic management API**, developed as part of a coursework assignment.  
The API allows managing clinics, doctors, and services with filtering and sorting capabilities.  

Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, the project includes:
- User authentication via **JWT**
- API documentation using **Swagger**
- Full CRUD operations with query filters

The API supports a system with 5 clinics, where doctors can work in multiple clinics and provide various services (e.g., vertebrology, therapy).  
An administrator manages all entities.

---

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Database](#database)
- [Submission](#submission)

---

## Technologies

- **Node.js** – JavaScript runtime for server-side development  
- **Express** – Web framework for RESTful APIs  
- **TypeScript** – JavaScript with type safety  
- **MongoDB** – NoSQL database (hosted on MongoDB Atlas)  
- **Mongoose** – ODM for MongoDB  
- **JWT** – JSON Web Token for authentication  
- **Swagger** – API documentation interface  

---

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

> Requires Node.js (latest version recommended). Ensure Git is installed.

---

## Running the Application

Start the server:
```bash
npm start
```

The server will run at: [http://localhost:7000](http://localhost:7000)  
> Output: `Server listening on 7000 and Database available!!!`

 **Note**:  
The MongoDB connection URI is hardcoded in `src/main.ts`:
```
mongodb+srv://nodeuser:MyPass123@cluster0.szq158j.mongodb.net/clinic-api
```

- Ensure your IP address is whitelisted in MongoDB Atlas (use `0.0.0.0/0` for public access during development).
- Update URI if credentials change.
- If the server fails to start, verify MongoDB Atlas connection and check server logs in the terminal.

Access Swagger docs here:  
[http://localhost:7000/api-docs](http://localhost:7000/api-docs)

---

## API Endpoints

All endpoints are available in Swagger at `/api-docs`. Summary below:

### Authentication
- `POST /auth/register` – Register a new user (requires email, password)
- `POST /auth/login` – Login and receive JWT token (requires email, password)

### Clinics
- `POST /clinics` – Create a clinic (name, address, city, rating)
- `GET /clinics` – Get clinics (filters: city, name partial match, service, doctor, sortByName asc/desc)
- `GET /clinics/:id` – Get clinic by ID
- `PUT /clinics/:id` – Update clinic
- `DELETE /clinics/:id` – Delete clinic

### Doctors
- `POST /doctors` – Create a doctor (name, surname, phone, email, specialty, clinics, services)
- `GET /doctors` – Get doctors (filters: name, surname, phone, email, specialty, sortByName asc/desc)
- `GET /doctors/:id` – Get doctor by ID
- `PUT /doctors/:id` – Update doctor
- `DELETE /doctors/:id` – Delete doctor

### Services
- `POST /services` – Create a service (name)
- `GET /services` – Get services (filters: name partial match, sortByName asc/desc)
- `GET /services/:id` – Get service by ID
- `PUT /services/:id` – Update service
- `DELETE /services/:id` – Delete service

> Some endpoints (e.g., POST/PUT/DELETE) may require admin access (currently bypassed for testing).

---

## Testing

### Postman Collection

1. Import the file `Clinic API Updated.postman_collection.json` into Postman.
2. Use the collection to test key endpoints.

Examples:

- **Register a user**  
  `POST /auth/register`  
  Body:
  ```json
  {
    "email": "testuser@example.com",
    "password": "user123"
  }
  ```

- **Login as user**  
  `POST /auth/login`  
  Body:
  ```json
  {
    "email": "newuser@example.com",
    "password": "user123"
  }
  ```

- **Create a clinic**  
  `POST /clinics`  
  Body:
  ```json
  {
    "name": "Kyiv Vertebrology Clinic",
    "address": "Vertebrol St 1",
    "city": "Kyiv",
    "rating": 4.5
  }
  ```

- **Get clinics by city**  
  `GET /clinics?city=Kyiv`

- **Create a doctor**  
  `POST /doctors`  
  Body:
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "phone": "123456789",
    "email": "john@example.com",
    "specialty": "Vertebrologist",
    "clinics": ["<clinic_id>"]
  }
  ```

- **Get doctors by specialty**  
  `GET /doctors?specialty=Vertebrologist`

- **Create a service**  
  `POST /services`  
  Body:
  ```json
  {
    "name": "Vertebrology"
  }
  ```

- **Get services by name**  
  `GET /services?name=Vertebrology`

> Token from `/auth/login` can be used for authenticated endpoints if auth is re-enabled.

---

## Database

- **Hosted on MongoDB Atlas**
- **Database name**: `clinic-api`
- **Collections**: `clinics`, `doctors`, `services`, `users`

### Restore from Dump

Use the provided `dump.zip` file:

```bash
mongorestore --uri mongodb+srv://nodeuser:MyPass123@cluster0.szq158j.mongodb.net/clinic-api --archive=dump.zip
```

> Make sure you have [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools) installed.

The dump includes 5 clinics, doctors, and services as per the assignment requirements.

---

## Submission

- **Repository**:  
  [https://github.com/FedotovDenis/clinic-api](https://github.com/FedotovDenis/clinic-api)

- **Submitted files**:
  - `Clinic API Updated.postman_collection.json` – Postman collection for testing
  - `dump.zip` – MongoDB database dump

> Please verify the repository and submitted files contain all required components.
