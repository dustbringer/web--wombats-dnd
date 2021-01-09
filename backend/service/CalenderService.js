import { Pool } from "pg";
import moment from "moment";

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
                    client.release();
                    console.log(err.stack);
                })
                .finally(() => client.release());
        });
    }

    getMonth(month) {
        return this.pool.connect().then((client) => {
            return client
                .query("SELECT * FROM calender WHERE month = $1", [month])
                .then((res) => {
                    client.release();
                    console.log("Month get'ed. ", res);
                })
                .catch((err) => {
                    client.release();
                    console.log(err.stack);
                });
        });
    }

    addEvent(day, month, year, title, description, priority) {
        return this.pool.connect().then((client) => {
            const now = moment().format("D-MMM-YY hh.mm.ss.SSSSSS A Z");
            return client
                .query(
                    `INSERT INTO
                        calender(date_created, date_edited, day, month, year, title, description, priority)
                    VALUES
                        (${now}, ${now}, $1, $2, $3, $4, $5, $6);`,
                    [day, month, year, title, description, priority]
                )
                .then((res) => {
                    client.release();
                    console.log("Event added. ", res);
                })
                .catch((err) => {
                    client.release();
                    console.log(err.stack);
                });
        });
    }

    // Applies changes to all the inputs, even if null/undefined
    editEvent(id, day, month, year, title, description, priority) {
        return this.pool.connect().then((client) => {
            return client
                .query(
                    `UPDATE calender
                    SET day = $1,
                        month = $2,
                        year = $3,
                        title = $4,
                        description = $5,
                        priority = $6
                    WHERE id = $7;`,
                    [day, month, year, title, description, priority, id]
                )
                .then((res) => {
                    client.release();
                    console.log(`Event ${id} edited. `, res);
                })
                .catch((err) => {
                    client.release();
                    console.log(err.stack);
                });
        });
    }

    removeEvent(id) {
        return this.pool.connect().then((client) => {
            return client
                .query(
                    `DELETE FROM calender WHERE id = $1;`,
                    [id]
                )
                .then((res) => {
                    client.release();
                    console.log(`Event ${id} removed. `, res);
                })
                .catch((err) => {
                    client.release();
                    console.log(err.stack);
                });
        });
    }
}

/*
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js

may be helpful
https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/
https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

*/
