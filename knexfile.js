const fs = require('fs');
const path = './.env.local';
const dotenv = require('dotenv');
dotenv.config({ path: fs.existsSync(path) ? '.env.local' : '' });

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
        debug: true,
        pool: {
            min: 2,
            max: 10,
            // createTimeoutMillis: 3000,
            // acquireTimeoutMillis: 30000,
            // idleTimeoutMillis: 30000,
            // reapIntervalMillis: 1000,
            // createRetryIntervalMillis: 100,
            // propagateCreateError: false
        },
        seeds: {
            directory: './src/seeds',
        },
        migrations: {
            tableName: 'migrations',
            directory: './src/migrations',
        },
    },

    staging: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
        debug: true,
        pool: {
            min: 2,
            max: 10,
            // createTimeoutMillis: 3000,
            // acquireTimeoutMillis: 30000,
            // idleTimeoutMillis: 30000,
            // reapIntervalMillis: 1000,
            // createRetryIntervalMillis: 100,
            propagateCreateError: false,
        },
        seeds: {
            directory: './src/seeds',
        },
        migrations: {
            tableName: 'migrations',
            directory: './src/migrations',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
        debug: true,
        pool: {
            min: 2,
            max: 10,
            // createTimeoutMillis: 3000,
            // acquireTimeoutMillis: 30000,
            // idleTimeoutMillis: 30000,
            // reapIntervalMillis: 1000,
            // createRetryIntervalMillis: 100,
            // propagateCreateError: false
        },
        seeds: {
            directory: './src/seeds',
        },
        migrations: {
            tableName: 'migrations',
            directory: './src/migrations',
        },
    },
};
