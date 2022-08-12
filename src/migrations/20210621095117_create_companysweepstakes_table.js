exports.up = function (knex) {
    return knex.schema.createTable('CompanySweepstakes', function (table) {
        table.increments('CompanySweepstakesKey', 11).primary().unsigned();
        table
            .integer('CompanyKey', 11)
            .notNullable()
            .references('CompanyKey')
            .inTable('Companies')
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
        table.string('Comments', 50).nullable();
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
        table.timestamp('CompanySweepstakesCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('CompanySweepstakesLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.boolean('SweepstakesBlocked').notNullable().defaultTo(0);
        table.unique(['CompanyKey', 'SweepstakesKey']);
        table.index('CompanySweepstakesKey');
        table.index('CompanyKey');
        table.index('SweepstakesKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('CompanySweepstakes');
};
