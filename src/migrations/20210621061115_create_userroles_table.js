exports.up = function (knex) {
    return knex.schema.createTable('UserRoles', function (table) {
        table.increments('UserRoleKey', 11).primary().unsigned();
        table
            .integer('UserKey', 11)
            .notNullable()
            .references('UserKey')
            .inTable('Users')
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('RoleKey', 11).notNullable().references('RoleKey').inTable('Roles').unsigned();
        table
            .integer('UserKey_LastUpdatedBy', 11)
            .references('UserKey')
            .inTable('Users')
            .nullable()
            .unsigned()
            .onDelete('SET NULL');
        table
            .integer('UserKey_CreatedBy', 11)
            .references('UserKey')
            .inTable('Users')
            .nullable()
            .unsigned()
            .onDelete('SET NULL');
        table.timestamp('UserRoleCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('UserRoleLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('UserRoleKey');
        table.index('UserKey');
        table.index('RoleKey');
        table.index('UserKey_LastUpdatedBy');
        table.index('UserKey_CreatedBy');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('UserRoles');
};
