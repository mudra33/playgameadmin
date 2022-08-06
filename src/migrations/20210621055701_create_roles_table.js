exports.up = function (knex) {
    return knex.schema.createTable('Roles', function (table) {
        table.increments('RoleKey', 11).primary().unsigned();
        table.string('RoleName', 30).unique().notNullable();
        table.string('RoleDescription', 100).nullable();
        table.timestamp('RoleCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('RoleLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('RoleKey');
        table.index('RoleName');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Roles');
};
