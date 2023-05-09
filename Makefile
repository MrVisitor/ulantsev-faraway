docker-build:
	docker build -t aws-ecr-ulantsev .
docker-run:
	docker run -d -p 3000:80 --name container-aws-ecr-ulantsev aws-ecr-ulantsev
docker-stop:
	docker stop container-aws-ecr-ulantsev && docker rm container-aws-ecr-ulantsev
docker-tag:
	docker tag aws-ecr-ulantsev:latest 822234696265.dkr.ecr.us-east-1.amazonaws.com/aws-ecr-ulantsev:latest
docker-push:
	docker push 822234696265.dkr.ecr.us-east-1.amazonaws.com/aws-ecr-ulantsev:latest