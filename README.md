# ExpressTS boilerplate

an simple REST API boilerplate with ACL and JWT Auth feature to build backend with Express framework using TypeScript language.

## Pre-requisite

- ### Node.js
    
    to run application

- ### Docker

    to run database PostgreSQL

- ### postgrator-cli

    to migrating the `.sql` file in `/migrations` directory

## Directory Explanation

### all these directory saved in `/src`

- ### `/migrations`

    here to put your database blueprint for your application in `.sql` filetype please write the patern of file like this `[seq].[action].sql` for complete guide see in [here](https://www.npmjs.com/package/postgrator-cli)

- ### `/model`

    an every response and request interface DTOs

- ### `/routes`

    group of every endpoint APIs

- ### `/types`

    general interface should in here

- ### `/handlers`

    all of endpoint handler function to handle `/routes` response or request getted


## How to Run

- copy file named `env-sample` and rename it to `.env`.
- edit the `.env` file value as your desired such as DB_USERNAME, DB_PASSWORD, DB_DATABASE, and etc.
- make sure `.postgratorrc.json` config is same with `.env`
- run `yarn start:db` or `npm run start:db`
- run `yarn start:dev` or `npm run start:dev`