exports.up = function (knex) {
    return knex.schema.createTable('Sweepstakes', function (table) {
        table.increments('SweepstakesKey', 11).primary().unsigned();
        table.string('SweepstakesName', 30).notNullable();
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
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
        table.timestamp('SweepstakesCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('SweepstakesLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('SweepstakesKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Sweepstakes');
};
