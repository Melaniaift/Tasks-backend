# Tasks Management Dashboard

A simple tasks management dashboard backend built with Node.js and MongoDB.
Deployed on [Render](https://dashboard.render.com/) [here](https://tasks-backend-vqth.onrender.com/api/tasks)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Starting the Database

To start the MongoDB database, run:

```bash
mongod
```

### Running the Application

```bash
node index.js 
```
OR 

```bash
nodemon index.js
```

## Tools Used

- **MongoDB**: A NoSQL database for storing and managing tasks data.

## Packages Installed

- **mongoose**  
  Install with: `npm install mongoose`  
  Library that creates a connection between MongoDB and Node.js.

- **express**  
  Install with: `npm install express`  
  A web framework for building web applications in Node.js.

- **joi**  
  Install with: `npm install joi`  
  A schema description and data validation library for JavaScript.

## Postman testing 

Created the file Tasks.postman_collection.json to test the API locally.

## Task Management API Endpoints

### `GET /api/tasks`
- **Description:** Retrieves all tasks.
- **Error:** 500 if fetching fails.

### `GET /api/tasks/:id`
- **Description:** Retrieves a task by ID.
- **Error:** 404 if not found, 500 for server errors.

### `POST /api/tasks`
- **Description:** Creates a new task with `name` and `description`.
- **Error:** 400 if validation fails, 500 for server errors.

### `PUT /api/tasks/:id`
- **Description:** Updates a task's `name` and `description`.
- **Error:** 400 if validation fails, 404 if not found, 500 for server errors.

### `PUT /api/tasks/:id/status`
- **Description:** Updates a task's status.
- **Error:** 400 if validation fails, 404 if not found, 500 for server errors.

### `DELETE /api/tasks/:id`
- **Description:** Deletes a task by ID.
- **Error:** 400 if ID is missing, 404 if not found, 500 for server errors.

