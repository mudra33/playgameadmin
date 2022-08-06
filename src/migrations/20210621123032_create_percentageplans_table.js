exports.up = function (knex) {
    return knex.schema.createTable('PercentagePlans', function (table) {
        table.increments('PercentagePlanKey', 11).primary().unsigned();
        table.string('PercentagePlanName', 30).unique().notNullable();
        table.string('PurchasePercentage', 5).notNullable();
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
        table.timestamp('PercentagePlanCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('PercentagePlanLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('PercentagePlanKey');
        table.index('PercentagePlanName');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('PercentagePlans');
};
