# Makefile

.PHONY: build-frontend prod dev

prod: clean build-frontend build-backend

dev:
	docker compose -f docker-compose.dev.yml up --build

build-frontend:
	docker compose build frontend-build
	docker compose run --rm frontend-build

build-backend:
	docker compose build backend
	docker compose up -d backend nginx

clean:
	docker compose down -v --remove-orphans
	docker run --rm -v $(PWD)/frontend/build:/app/build alpine sh -c "rm -rf /app/build/*"