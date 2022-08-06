exports.up = function (knex) {
    return knex.schema.createTable('PasswordResetTokens', function (table) {
        table
            .integer('UserKey', 11)
            .notNullable()
            .references('UserKey')
            .inTable('Users')
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('Token', 30).unique().notNullable();
        table.date('Expires');
        table.index('UserKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('PasswordResetTokens');
};
