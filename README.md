# Todo List

This project includes a React frontend and a simple Express backend. Docker Compose can be used to run both services for development.

## Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed

## Running with Docker Compose

```
docker-compose up --build
```

The frontend will be available on [http://localhost:3000](http://localhost:3000) and the backend API on [http://localhost:4000/api/todos](http://localhost:4000/api/todos).

## Development without Docker

Install dependencies for both the frontend and backend:

```
# Frontend
npm install

# Backend
cd server
npm install
```

Start the backend:

```
cd server
npm start
```

In a separate terminal, start the frontend:

```
cd ..
npm start
```
