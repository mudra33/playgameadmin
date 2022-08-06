import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await req.db
                .transaction(async (trx) => {
                    let subquery = await trx('Sweepstakes')
                        .select('SweepstakesName', 'SweepstakesKey')
                        .where({
                            SweepstakesName: req.body.SweepstakesNames.text,
                        });

                    subquery = JSON.parse(JSON.stringify(subquery));

                    if (subquery && subquery.length < 1) {
                        const SweepstakesKey = await trx
                            .insert({
                                SweepstakesName: req.body.SweepstakesNames.text,
                                UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                            })
                            .into('Sweepstakes')
                            .transacting(trx);

                        let companySubquery = await trx('Companies')
                            .select('CompanyName', 'CompanyKey')
                            .where({
                                CompanyName: req.body.CompanyNames.text,
                            });
                        companySubquery = JSON.parse(JSON.stringify(companySubquery));

                        if (companySubquery && companySubquery.length < 1) {
                            const CompanyKey = await trx
                                .insert({
                                    CompanyName: req.body.CompanyNames.text,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('Companies')
                                .transacting(trx);

                            await trx
                                .insert({
                                    CompanyKey: CompanyKey[0],
                                    SweepstakesKey: SweepstakesKey[0],
                                    Comments: req.body.Comments,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('CompanySweepstakes')
                                .transacting(trx);
                        } else {
                            await trx
                                .insert({
                                    CompanyKey: req.body.CompanyNames.key,
                                    SweepstakesKey: SweepstakesKey[0],
                                    Comments: req.body.Comments,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('CompanySweepstakes')
                                .transacting(trx);
                        }
                    } else {
                        let companySubquery = await trx('Companies')
                            .select('CompanyName', 'CompanyKey')
                            .where({
                                CompanyName: req.body.CompanyNames.text,
                            });
                        companySubquery = JSON.parse(JSON.stringify(companySubquery));

                        if (companySubquery && companySubquery.length < 1) {
                            const CompanyKey = await trx
                                .insert({
                                    CompanyName: req.body.CompanyNames.text,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('Companies')
                                .transacting(trx);
                            await trx
                                .insert({
                                    CompanyKey: CompanyKey[0],
                                    SweepstakesKey: req.body.SweepstakesNames.key,
                                    Comments: req.body.Comments,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('CompanySweepstakes')
                                .transacting(trx);
                        } else {
                            await trx
                                .insert({
                                    CompanyKey: req.body.CompanyNames.key,
                                    SweepstakesKey: req.body.SweepstakesNames.key,
                                    Comments: req.body.Comments,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('CompanySweepstakes')
                                .transacting(trx);
                        }
                    }
                })

                .then((inserts) => {
                    return res.status(201).send({ message: 'Added Successfully.', data: inserts });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }

        if (req.method === 'GET') {
            const data = await req
                .db('CompanySweepstakes')
                .distinct('Sweepstakes.SweepstakesName', 'CompanySweepstakes.SweepstakesKey')
                .join('Companies', {
                    'CompanySweepstakes.CompanyKey': 'Companies.CompanyKey',
                })
                .join('Sweepstakes', {
                    'CompanySweepstakes.SweepstakesKey': 'Sweepstakes.SweepstakesKey',
                });

            return res.status(200).send({ data });
        }
    } catch (err) {
        return res.status(500).send({ error: 'Oops! Something went wrong!', err });
    }
};

export default connectionHandler()(handler);
