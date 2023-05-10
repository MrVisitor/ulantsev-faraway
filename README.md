# Faraway - test task

### How to run it

- Open a terminal in the root of the project
- Run `npm install`
- Run `npm start`
- The Application should be running on [http://localhost:8081](http://localhost:8081)

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
- The Application should be running on [http://localhost:3000](http://localhost:3000)

#### Stop Docker container

- Open a terminal in the root of the project
- Run `make docker-stop`

### Run deploy Docker image to AWS-ECR

- Open a terminal in the root of the project
- Run `make docker-build`
- Run `make docker-tag`
- Run `make docker-push`

Note that you need to set environment variables AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_REGION

### ENV file (.env.production) or (.env.development)

- `API_ROOT='https://swapi.dev/api'`

### ENV file for the terraform has path /terraform/.env

- `AWS_ACCESS_KEY_ID=your_key_value`
- `AWS_SECRET_ACCESS_KEY=your_key_value`
- `region=us-east-1`
