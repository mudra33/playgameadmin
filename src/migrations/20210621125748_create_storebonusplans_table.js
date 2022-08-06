exports.up = function (knex) {
    return knex.schema.createTable('StoreBonusPlans', function (table) {
        table.increments('StoreBonusPlanKey', 11).primary().unsigned();
        table
            .integer('StoreKey', 11)
            .notNullable()
            .references('StoreKey')
            .inTable('Stores')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .unsigned();
        table
            .integer('BonusPlanKey', 11)
            .notNullable()
            .references('BonusPlanKey')
            .inTable('BonusPlans')
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
        table.timestamp('StoreBonusPlanCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('StoreBonusPlanLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('StoreBonusPlanKey');
        table.index('StoreKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('StoreBonusPlans');
};
