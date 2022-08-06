exports.up = function (knex) {
    return knex.schema.createTable('BonusPlans', function (table) {
        table.increments('BonusPlanKey', 11).primary().unsigned();
        table.string('BonusPlanName', 30).unique().notNullable();
        table.string('Comments', 50).nullable();
        table.jsonb('BonusEntries').notNullable();
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
        table.timestamp('BonusPlanCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('BonusPlanLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('BonusPlanKey');
        table.index('BonusPlanName');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('BonusPlans');
};
