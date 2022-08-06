exports.up = function (knex) {
    return knex.schema.createTable('Users', function (table) {
        table.increments('UserKey', 11).primary().unsigned();
        table.string('UserFirstName', 30).notNullable();
        table.string('UserLastName', 30).notNullable();
        table.string('UserPhone', 15).unique().notNullable();
        table.string('UserEmail', 40).unique().nullable();
        table.string('AddressLine1', 30).nullable();
        table.string('AddressLine2', 30).nullable();
        table.string('City', 20).nullable();
        table.string('State', 20).nullable();
        table.string('Zip', 10).nullable();
        table.string('UserIdType', 40).nullable();
        table.string('UserIdNumber', 30).nullable();
        table.string('UserPassword', 255).notNullable();
        table.string('UserPasswordSalt', 255).notNullable();
        table.string('Comments', 40).nullable();
        table.timestamp('UserCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('UserLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.boolean('UserBlocked').notNullable().defaultTo(0);
        table.boolean('EmailVerified').notNullable().defaultTo(0);
        table.boolean('PhoneVerified').notNullable().defaultTo(0);
        table.boolean('ForcePasswordChange').nullable().defaultTo(0);
        table.index('UserKey');
        table.index('UserPhone');
        table.index('UserEmail');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Users');
};
