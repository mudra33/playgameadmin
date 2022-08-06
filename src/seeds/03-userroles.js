exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('UserRoles')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('UserRoles').insert([
                {
                    UserRoleKey: 1,
                    UserKey: 1,
                    RoleKey: 1,
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    UserRoleCreateTS: new Date(),
                    UserRoleLastUpdatedDateTime: new Date(),
                },
                {
                    UserRoleKey: 2,
                    UserKey: 2,
                    RoleKey: 2,
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    UserRoleCreateTS: new Date(),
                    UserRoleLastUpdatedDateTime: new Date(),
                },
                {
                    UserRoleKey: 3,
                    UserKey: 3,
                    RoleKey: 3,
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    UserRoleCreateTS: new Date(),
                    UserRoleLastUpdatedDateTime: new Date(),
                },
                {
                    UserRoleKey: 4,
                    UserKey: 4,
                    RoleKey: 4,
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    UserRoleCreateTS: new Date(),
                    UserRoleLastUpdatedDateTime: new Date(),
                },
                {
                    UserRoleKey: 5,
                    UserKey: 5,
                    RoleKey: 5,
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    UserRoleCreateTS: new Date(),
                    UserRoleLastUpdatedDateTime: new Date(),
                },
                {
                    UserRoleKey: 6,
                    UserKey: 6,
                    RoleKey: 6,
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    UserRoleCreateTS: new Date(),
                    UserRoleLastUpdatedDateTime: new Date(),
                },
            ]);
        });
};
