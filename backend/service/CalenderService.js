import { Pool } from "pg";

// import { InputError, AccessError } from "../error";

export default class CalenderService {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        this.pool.on("error", (err) => {
            console.error("Unexpected error on idle client", err);
            process.exit(-1);
        });

        // Create table if not exist
        this.pool.connect().then((client) => {
            return client
                .query(
                    `CREATE TABLE IF NOT EXISTS calender (
                        id serial PRIMARY KEY,
                        date_created TIMESTAMPTZ NOT NULL,
                        date_edited TIMESTAMPTZ NOT NULL,
                        CHECK (date_created <= date_edited),
                        day INTEGER NOT NULL,
                        month INTEGER NOT NULL,
                        year INTEGER NOT NULL,
                        title TEXT NOT NULL CHECK (title != ''),
                        description TEXT NOT NULL CHECK (description != ''),
                        priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 5)
                    );`
                )
                .catch((err) => {
                    console.log(err.stack);
                })
                .finally(() => client.release());
        });
    }

    query(text, values, then) {
        return this.pool.connect().then((client) => {
            return client
                .query(text, values)
                .then(then)
                .catch((err) => {
                    console.log(err.stack);
                })
                .finally(() => client.release());
        });
    }

    getAll() {
        return this.query(
            `SELECT *
            FROM calender
            ORDER BY
                year DESC,
                month DESC,
                day DESC,
                id DESC;`,
            [],
            (res) => {
                return res.rows;
            }
        );
    }

    getYear(year) {
        return this.query(
            `SELECT *
            FROM calender 
            WHERE year = $1
            ORDER BY
                month DESC,
                day DESC,
                id DESC;`,
            [year],
            (res) => {
                return res.rows;
            }
        );
    }

    getMonth(month, year) {
        return this.query(
            `SELECT *
            FROM calender 
            WHERE month = $1 AND year = $2
            ORDER BY
                day DESC,
                id DESC;`,
            [month, year],
            (res) => {
                return res.rows;
            }
        );
    }

    getDay(day, month, year) {
        return this.query(
            `SELECT *
            FROM calender 
            WHERE day = $1 AND month = $2 AND year = $3
            ORDER BY
                id DESC;`,
            [day, month, year],
            (res) => {
                return res.rows;
            }
        );
    }

    addEvent(day, month, year, title, description, priority) {
        return this.query(
            `INSERT INTO
                calender(date_created, date_edited, day, month, year, title, description, priority)
            VALUES
                (NOW(), NOW(), $1, $2, $3, $4, $5, $6);`,
            [day, month, year, title, description, priority],
            (res) => {
                return res;
            }
        );
    }

    // Applies changes to all the inputs, even if null/undefined
    editEvent(id, day, month, year, title, description, priority) {
        return this.query(
            `UPDATE calender
            SET date_edited = NOW(),
                day = $1,
                month = $2,
                year = $3,
                title = $4,
                description = $5,
                priority = $6
            WHERE id = $7;`,
            [day, month, year, title, description, priority, id],
            (res) => {
                return res;
            }
        );
    }

    removeEvent(id) {
        return this.query(
            `DELETE FROM calender
                WHERE id = $1;`,
            [id],
            (res) => {
                return res;
            }
        );
    }
}

/*
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js

may be helpful
https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/
https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

*/
