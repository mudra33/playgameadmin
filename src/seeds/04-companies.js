exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Companies')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('Companies').insert([
                {
                    CompanyKey: 1,
                    CompanyName: 'CompanyName',
                    CompanyDescription: 'CompanyDescription',
                    UserKey_LastUpdatedBy: 1,
                    UserKey_CreatedBy: 1,
                    CompanyCreateTS: new Date(),
                    CompanyLastUpdatedDateTime: new Date(),
                },
            ]);
        });
};
