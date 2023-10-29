## Description

Server tailored for serving REST requests, built using the NestJS framework & Prisma.

Postman workspace link available [here](https://app.getpostman.com/join-team?invite_code=d5f8d4ae1d56d1205294cf1479ad9bb9&target_code=61059c2998591986828582d29d3fe20e).

## Prerequisites

[Docker Engine](https://docs.docker.com/engine/install/) & [Node.js](https://nodejs.org/en) are required for the project to run.

## Installation

```bash
$ npm ci
```

## Configuration

Create a `.env.prod` file for using production.

Example configuration:

```text
DATABASE_URL="postgresql://<USR>:<PASS>@localhost:5433/<DB>?schema=public"
DATABASE_USER=USR
DATABASE_PASSWORD=PASS
DATABASE_DB=DB
JWT_AT_SECRET=secret
```

_Note: Port no. 5433 is used for production, 5434 for dev and 5435 for testing._

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```
