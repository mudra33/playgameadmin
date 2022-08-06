const knex = require('knex');
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../knexfile.js')[environment];

let connection;

export const getDatabaseConnector = () => {
    return () => {
        if (!config) {
            throw new Error(`Failed to get knex configuration for env:${environment}`);
        }
        connection = knex(config);
        return connection;
    };
};
