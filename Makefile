start:
	docker-compose up

stop:
	docker-compose down --rmi all

clean:
	docker-compose down --rmi all
	docker volume rm $$(docker volume ls -q)