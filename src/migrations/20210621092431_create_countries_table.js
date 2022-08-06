exports.up = function (knex) {
    return knex.schema.createTable('Countries', function (table) {
        table.increments('CountryKey', 11).primary().unsigned();
        table.string('CountryName', 20).unique().notNullable();
        table.string('CountryDescription', 100).notNullable();
        table.timestamp('CountryCreateTS').notNullable().defaultTo(knex.fn.now());
        table.timestamp('CountryLastUpdatedDateTime').notNullable().defaultTo(knex.fn.now());
        table.index('CountryKey');
        table.index('CountryName');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Countries');
};
