exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Roles')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('Roles').insert([
                {
                    RoleKey: 1,
                    RoleName: 'Admin',
                    RoleDescription: 'RoleDescription',
                    RoleCreateTS: new Date(),
                    RoleLastUpdatedDateTime: new Date(),
                },
                {
                    RoleKey: 2,
                    RoleName: 'Manager',
                    RoleDescription: 'RoleDescription',
                    RoleCreateTS: new Date(),
                    RoleLastUpdatedDateTime: new Date(),
                },
                {
                    RoleKey: 3,
                    RoleName: 'Cashier',
                    RoleDescription: 'RoleDescription',
                    RoleCreateTS: new Date(),
                    RoleLastUpdatedDateTime: new Date(),
                },
                {
                    RoleKey: 4,
                    RoleName: 'Owner',
                    RoleDescription: 'RoleDescription',
                    RoleCreateTS: new Date(),
                    RoleLastUpdatedDateTime: new Date(),
                },
                {
                    RoleKey: 5,
                    RoleName: 'Customer',
                    RoleDescription: 'RoleDescription',
                    RoleCreateTS: new Date(),
                    RoleLastUpdatedDateTime: new Date(),
                },
                {
                    RoleKey: 6,
                    RoleName: 'Fulfilment',
                    RoleDescription: 'RoleDescription',
                    RoleCreateTS: new Date(),
                    RoleLastUpdatedDateTime: new Date(),
                },
            ]);
        });
};
