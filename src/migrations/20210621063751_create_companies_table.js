exports.up = function (knex) {
    return knex.schema.createTable('Companies', function (table) {
        table.increments('CompanyKey', 11).primary().unsigned();
        table.string('CompanyName', 60).unique().notNullable();
        table.string('CompanyDescription', 120).nullable();
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
        table.timestamp('CompanyCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('CompanyLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('CompanyKey');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Companies');
};
