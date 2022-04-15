# Table tenis players ranking

## Description

Simplified version of table tenis players ranking inspired by <https://www.ittf.com/rankings/>

Ranking algorithm is based on Elo rating system (<https://en.wikipedia.org/wiki/Elo_rating_system>)

## Functionality

Homepage (/):

- List players ranks

Adminpanel (/admin):

- Add new player
- Register match score

Others:

- Ranking has pooling interval 1000ms by default
- Both form buttons have loader and server side validation.

## Tech stack

### Frontend libs

- React
- Apollo client & graphql
- Typescript
- Tailwind CSS - to quickly provide some styling
- Testing: Jest

### Backend libs

- Node.js
- Apollo server & graphql
- Typescript
- Storage: mongodb
- Testing: Jest

## How to run

### Single command setup

To setup whole app with one command, please use `docker-compose up` in project root directory.

It can take even 5-10 minutes for the first time to pull deps, build backend and frontend.

Navigate to <http://localhost:3000/> and <http://localhost:3000/admin>

If you are missing docker-compose, go to <https://docs.docker.com/compose/install/> or use manual steps below.

### Database

Use docker with mongodb `docker run --rm -p 27017:27017 --name mongodb mongo:5.0.7`

### Frontend

- Go to `/frontend`
- Install dependencies with `yarn` or `npm install`
- Run dev server with `yarn start` or `npm run start`

### Backend

- Go to `/backend`
- Install dependencies with `yarn` or `npm install`
- Run dev server with `yarn start` or `npm run start`
