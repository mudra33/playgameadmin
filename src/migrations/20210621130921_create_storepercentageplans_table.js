exports.up = function (knex) {
    return knex.schema.createTable('StorePercentagePlans', function (table) {
        table.increments('StorePercentagePlanKey', 11).primary().unsigned();
        table
            .integer('StoreKey', 11)
            .notNullable()
            .references('StoreKey')
            .inTable('Stores')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .unsigned();
        table
            .integer('PercentagePlanKey', 11)
            .notNullable()
            .references('PercentagePlanKey')
            .inTable('PercentagePlans')
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
        table.timestamp('StorePercentagePlanCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('StorePercentagePlanLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('StorePercentagePlanKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('StorePercentagePlans');
};
