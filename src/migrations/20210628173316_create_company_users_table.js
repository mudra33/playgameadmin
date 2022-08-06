exports.up = function (knex) {
    return knex.schema.createTable('CompanyUsers', function (table) {
        table.increments('CompanyUsersKey', 11).primary().unsigned();
        table
            .integer('CompanyKey', 11)
            .notNullable()
            .references('CompanyKey')
            .inTable('Companies')
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
        table.timestamp('CompanyUsersCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('CompanyUsersLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('CompanyUsersKey');
        table.unique(['CompanyKey', 'UserKey']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('CompanyUsers');
};
