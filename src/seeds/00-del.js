exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('UserRoles')
        .del()
        .then(function () {
            return knex('Companies').del();
        })
        .then(function () {
            return knex('Users').del();
        })
        .then(function () {
            return knex('Roles').del();
        });
};
