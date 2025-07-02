# Todo List

This project includes a React frontend and a simple Express backend. The code is organised into separate `frontend` and `backend` folders. Docker Compose can be used to run both services for development.

## Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed

## Running with Docker Compose

```
docker-compose up --build
```

The frontend will be available on [http://localhost:3000](http://localhost:3000) and the backend API on [http://localhost:4000/api/todos](http://localhost:4000/api/todos).

To run only one of the services, use the dedicated compose files:

```bash
# Frontend only
docker compose -f docker-compose.yml up frontend

# Backend only
docker compose -f docker-compose.yml up backend
```

`docker-compose.yml` continues to start both services together.

## Development without Docker

Install dependencies for both the frontend and backend:

```
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

Start the backend:

```
cd backend
npm start
```

In a separate terminal, start the frontend:

```
cd frontend
npm start
```