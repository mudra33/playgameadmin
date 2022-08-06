exports.up = function (knex) {
    return knex.schema.createTable('BonusPlanSweepstakes', function (table) {
        table.increments('BonusPlanSweepstakesKey', 11).primary().unsigned();
        table
            .integer('BonusPlanKey', 11)
            .notNullable()
            .references('BonusPlanKey')
            .inTable('BonusPlans')
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
        table.timestamp('BonusPlanSweepstakesCreateTS').notNullable().defaultTo(knex.fn.now());
        table
            .timestamp('BonusPlanSweepstakesLastUpdatedDateTime')
            .notNullable()
            .defaultTo(knex.fn.now());
        table.boolean('SweepstakesBlocked').notNullable().defaultTo(0);
        table.unique(['BonusPlanKey', 'SweepstakesKey']);
        table.index('BonusPlanSweepstakesKey');
        table.index('BonusPlanKey');
        table.index('SweepstakesKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('BonusPlanSweepstakes');
};
