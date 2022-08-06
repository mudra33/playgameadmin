exports.up = function (knex) {
    return knex.schema.createTable('Transactions', function (table) {
        table.increments('TransactionsKey', 11).primary().unsigned();
        table.string('TransactionType', 30).notNullable();
        table.string('TransactionAmount', 30).notNullable();
        table.string('Total', 30).notNullable();
        table
            .integer('StoreKey', 11)
            .notNullable()
            .references('StoreKey')
            .inTable('Stores')
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
        table.timestamp('TransactionsCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('TransactionsLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('TransactionsKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Transactions');
};
