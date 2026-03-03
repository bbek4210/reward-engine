.PHONY: dev start build test lint format docker-build docker-run clean

dev:
	npm run dev

start:
	npm start

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint src/

format:
	npx prettier --write src/

docker-build:
	docker build -t janamat-backend:latest .

docker-run:
	docker run -p 3000:3000 --env-file .env janamat-backend:latest

docker-compose-up:
	docker compose up --build

clean:
	rm -rf node_modules dist coverage
