import pgPromise from "pg-promise";
import env from 'dotenv';

env.config();
const pgp = pgPromise({});

const dbUsername = process.env.DB_USERNAME ? process.env.DB_USERNAME : "username";
const dbPassword = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "password";
const dbHost = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
const dbPort = process.env.DB_PORT ? process.env.DB_PORT : "5432";
const dbName = process.env.DB_DATABASE ? process.env.DB_DATABASE : "database";

const db = pgp(`postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);

export default db;