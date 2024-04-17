# ExpressTS boilerplate

an simple REST API boilerplate with ACL and JWT Auth feature to build backend with Express framework using TypeScript language.

## Pre-requisite

- ### Node.js `v21.6.1`
    
    to run application

- ### Docker `v4.27.2 (137060)`

    to run database PostgreSQL

- ### postgrator-cli `v7.0.0`

    to migrating the `.sql` file in `/migrations` directory

- ### nodemon `v3.1.0`

    to run the `yarn start:dev` or `npm run start:dev` with hot reload

## Directory Explanation

### all these directory saved in `/src`

- ### `/migrations`

    here to put your database blueprint for your application in `.sql` filetype for run with `yarn start:docker-db` or `npm run start:docker-db`, please write the patern of file like this `[seq].[action].sql` for complete guide see in [here](https://www.npmjs.com/package/postgrator-cli)

- ### `/model`

    an every response and request interface DTOs

- ### `/routes`

    group of every endpoint APIs

- ### `/types`

    general interface should in here

- ### `/handlers`

    all of endpoint handler function to handle `/routes` response or request getted

- ### `/queries`

    all of CRUD to process data or gathering from database

- ### `/misc`

    all of miscellaneous function such as utility function can be re-used in anywhere

- ### `/__test__`

    where unit test file in here for running the `yarn test` or `npm run test` using jest

- ### `/database`

    connection to database function and the root of database function interface


## How to Run

- copy file named `env-sample` and rename it to `.env`.
- edit the `.env` file value as your desired such as DB_USERNAME, DB_PASSWORD, DB_DATABASE, and etc.
- make sure `.postgratorrc.json` config is same with `.env`
- run `yarn start:init-db` or `npm run start:init-db`
- run `yarn start:dev` or `npm run start:dev`