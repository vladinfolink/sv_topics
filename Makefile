### DEV

build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build
	cd ws-live-chat-system && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

### RUN ON LOVAL WITH PROD CONFIG

build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up



