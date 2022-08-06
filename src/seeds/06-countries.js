exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Countries')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('Countries').insert([
                {
                    CountryKey: 1,
                    CountryName: 'CountryName',
                    CountryDescription: 'CountryDescription',
                    CountryCreateTS: new Date(),
                    CountryLastUpdatedDateTime: new Date(),
                },
            ]);
        });
};
