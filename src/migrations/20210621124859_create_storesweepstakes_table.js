exports.up = function (knex) {
    return knex.schema.createTable('StoreSweepstakes', function (table) {
        table.increments('StoreSweepstakesKey', 11).primary().unsigned();
        table
            .integer('StoreKey', 11)
            .notNullable()
            .references('StoreKey')
            .inTable('Stores')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .unsigned();
        table
            .integer('SweepstakesKey', 11)
            .notNullable()
            .references('SweepstakesKey')
            .inTable('Sweepstakes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .unsigned();
        table
            .integer('UserKey_LastUpdatedBy', 11)
            .nullable()
            .references('UserKey')
            .inTable('Users')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .unsigned();
        table
            .integer('UserKey_CreatedBy', 11)
            .nullable()
            .references('UserKey')
            .inTable('Users')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
            .unsigned();
        table.timestamp('StoreSweepstakesCreateTS').notNullable().defaultTo(knex.fn.now());
        table
            .timestamp('StoreSweepstakesLastUpdatedDateTime')
            .notNullable()
            .defaultTo(knex.fn.now());
        table.unique(['StoreKey', 'SweepstakesKey']);
        table.index('StoreSweepstakesKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('StoreSweepstakes');
};
