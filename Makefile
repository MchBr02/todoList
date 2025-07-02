# Makefile

.PHONY: build-frontend prod dev

build-frontend:
	docker compose build frontend-build
	docker compose run --rm frontend-build

prod: build-frontend
	docker compose up -d backend nginx

dev:
	docker compose -f docker-compose.dev.yml up --build

clean:
	docker compose down -v --remove-orphans
