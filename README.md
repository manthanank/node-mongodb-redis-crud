# Node.js CRUD API with MongoDB and Redis

This project is a simple CRUD API built using Node.js, Express, MongoDB, and Redis. It demonstrates how to integrate MongoDB for data storage and Redis for caching to enhance performance.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful CRUD operations for users
- MongoDB as the primary database
- Redis caching for faster read operations
- Express for building API routes
- Modular structure for better scalability and maintainability

## Project Structure

```text
node-mongodb-redis-crud/
│
├── config/
│   └── redisClient.js              # Redis client configuration
├── controllers/
│   └── userController.js  # User controller logic
├── models/
│   └── User.js            # Mongoose User model
├── routes/
│   └── userRoutes.js      # Express route definitions
├── index.js               # Main entry point of the application and mongoose connection
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation

```

## Getting Started

Follow these steps to get a local copy of the project running:

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running
- [Redis](https://redis.io/) installed and running

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/manthanank/node-mongodb-redis-crud.git
    cd node-mongodb-redis-crud
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Ensure MongoDB and Redis are running on your machine.

4. Start the server:

    ```bash
    node index.js
    ```

The server should now be running on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/users`        | Get all users (cached)    |
| POST   | `/api/users`        | Create a new user         |
| GET    | `/api/users/:id`    | Get a single user by ID (cached) |
| PUT    | `/api/users/:id`    | Update a user by ID       |
| DELETE | `/api/users/:id`    | Delete a user by ID       |

### Example Request and Response

#### 1. Get All Users

**GET** `/api/users`

_Response:_

```json
[
  {
    "_id": "64e8e334f2936f0e62c89a2b",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 28,
    "createdAt": "2023-08-20T12:00:00Z",
    "updatedAt": "2023-08-20T12:00:00Z"
  }
]
```

#### 2. Create a New User

**POST** `/api/users`

_Request Body:_

```json
{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "age": 30
}
```

_Response:_

```json
{
  "_id": "64e8e334f2936f0e62c89a2b",
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "age": 30,
  "createdAt": "2023-08-20T12:00:00Z",
  "updatedAt": "2023-08-20T12:00:00Z"
}
```

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **Redis**: In-memory data store for caching.
- **Body-parser**: Middleware for parsing incoming request bodies.
- **Dotenv**: Module for loading environment variables from a `.env` file.
- **Nodemon**: Utility for auto-restarting the server during development.

## Contributing

Feel free to contribute to this project. Any contributions you make are **greatly appreciated**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://nodemon.io/)
