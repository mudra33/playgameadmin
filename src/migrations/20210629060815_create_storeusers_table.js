exports.up = function (knex) {
    return knex.schema.createTable('StoreUsers', function (table) {
        table.increments('StoreUsersKey', 11).primary().unsigned();
        table
            .integer('StoreKey', 11)
            .notNullable()
            .references('StoreKey')
            .inTable('Stores')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            .unsigned();
        table
            .integer('UserKey', 11)
            .notNullable()
            .references('UserKey')
            .inTable('Users')
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
        table.timestamp('StoreUsersCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('StoreUsersLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('StoreUsersKey');
        table.unique(['StoreKey', 'UserKey']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('StoreUsers');
};
