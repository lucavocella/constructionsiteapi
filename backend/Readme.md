# Expressjs + MongoDB boilerplate with docker-compose

This example contains everything needed to get a REST API backend development environment up and running with Docker Compose.

## Benefits of Docker

- You don't need to run/install Nodejs mongodb locally ✨
- The environment will be the same accross any OS
- You can run multiple environments with different configuration

## Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

## How to use

Copy the file .env.sample to .env and set the variables if needed.
Execute the commands below

Create the network
```bash
docker network create my_network
```

Run the Docker container
```bash
docker-compose up -d
```

Enter the container
```bash
docker-compose exec app sh
```


Open [http://localhost:6868](http://localhost:3000).

## Important

Remember that everytime you update the code a docker container restart is needed. If you know how to use nodemon you could get advantage of this tool to avoid the container restart.


