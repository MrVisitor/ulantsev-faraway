build:
	num run build && docker build -t ulantsev/app .
run:
	docker run -d -p 80:80 ulantsev/app