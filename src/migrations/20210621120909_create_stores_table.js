exports.up = function (knex) {
    return knex.schema.createTable('Stores', function (table) {
        table.increments('StoreKey', 11).primary().unsigned();
        table.string('StoreName', 30).unique().notNullable();
        table.string('StorePhone', 15).nullable();
        table.string('StoreAddress1', 30).nullable();
        table.string('StoreAddress2', 30).nullable();
        table.string('StoreCity', 20).nullable();
        table.string('StoreState', 20).nullable();
        table.string('StoreZip', 20).nullable();
        table.string('MailingAddress1', 30).nullable();
        table.string('MailingAddress2', 30).nullable();
        table.string('MailingCity', 20).nullable();
        table.string('MailingState', 20).nullable();
        table.string('MailingZip', 20).nullable();
        table.string('Comments', 40).nullable();
        table.string('Salesperson', 20).nullable();
        table.string('SalespersonPercentage', 10).nullable();
        table.boolean('StoreBlocked').notNullable().defaultTo(0);
        table
            .integer('UserKey_LastUpdatedBy', 11)
            .nullable()
            .references('UserKey')
            .inTable('Users')
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
        table
            .integer('UserKey_CreatedBy', 11)
            .nullable()
            .references('UserKey')
            .inTable('Users')
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
        table.jsonb('Settings').nullable();
        table.timestamp('StoreCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('StoreLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('StoreKey');
        table.index('StoreName');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Stores');
};
