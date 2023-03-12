rebuild-docker-images:
	docker-compose down
	docker-compose build
	docker image prune -f
