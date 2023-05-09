# Faraway - test task

### How to run it

- Open a terminal in the root of the project
- Run `npm install`
- Run `npm start`
- The Application should be running on [http://localhost:8080](http://localhost:8080)

### Run Tests

- Open a terminal in the root of the project
- Run `npm test`

#### If you have a problem with Watchman when you run `npm test`, do this for MacOS:

- Open a terminal in the root of the project
- Run `brew uninstall watchman`
- Run `brew link pcre`
- Run `brew install --HEAD watchman`

### Build Docker image and run container

- Open a terminal in the root of the project
- Run `make docker-build`
- Run `make docker-run`

#### Stop Docker container

- Open a terminal in the root of the project
- Run `make docker-stop`

### Run deploy Docker image to AWS-ECR

- Open a terminal in the root of the project
- Run `make docker-build`
- Run `make docker-tag`
- Run `make docker-push`


