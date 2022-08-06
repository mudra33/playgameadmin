import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await req.db
                .transaction((trx) => {
                    trx.insert({
                        StoreName: req.body.StoreName,
                        StoreAddress1: req.body.StoreAddress1,
                        StoreAddress2: req.body.StoreAddress2,
                        StorePhone: req.body.StorePhone,
                        StoreCity: req.body.StoreCity,
                        StoreState: req.body.StoreState,
                        StoreZip: req.body.StoreZip,
                        MailingAddress1: req.body.MailingAddress1,
                        MailingAddress2: req.body.MailingAddress2,
                        MailingCity: req.body.MailingCity,
                        MailingState: req.body.MailingState,
                        MailingZip: req.body.MailingZip,
                        Comments: req.body.Comments,
                        Salesperson: req.body.Salesperson,
                        SalespersonPercentage: req.body.SalespersonPercentage,
                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                        StoreCreateTS: new Date(),
                        StoreLastUpdatedDateTime: new Date(),
                    })
                        .into('Stores')
                        .transacting(trx)
                        .then(async (StoreKey) => {
                            const data = {
                                StoreKey,
                            };
                            const sweepstakes = [];

                            if (req.body.Sweepstakes && req.body.Sweepstakes.length > 0) {
                                req.body.Sweepstakes.forEach((sweepstake) => {
                                    sweepstakes.push({
                                        StoreKey: StoreKey[0],
                                        SweepstakesKey: sweepstake,
                                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    });
                                });

                                const StoreSweepstakes = await trx
                                    .insert(sweepstakes)
                                    .into('StoreSweepstakes')
                                    .transacting(trx);

                                data.StoreSweepstakes = StoreSweepstakes;
                            }

                            return data;
                        })
                        .then(async (data) => {
                            const storePercentagePlan = await trx
                                .insert({
                                    StoreKey: data.StoreKey,
                                    PercentagePlanKey: req.body.PercentagePlanKey,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                })
                                .into('StorePercentagePlans')
                                .transacting(trx);

                            return { storePercentagePlan };
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(() => {
                    return res.status(201).send({ message: 'Store Added Succesfully.' });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }

        if (req.method === 'GET') {
            const data = await req
                .db('Stores')
                .select(
                    'StoreName',
                    'StoreKey',
                    'StorePhone',
                    'StoreAddress1',
                    'StoreAddress2',
                    'StoreCity',
                    'StoreState',
                    'StoreZip',
                    'MailingAddress1',
                    'MailingAddress2',
                    'MailingCity',
                    'MailingState',
                    'MailingZip',
                    'Comments',
                    'Salesperson',
                    'SalespersonPercentage'
                );

            return res.status(200).send({ data });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
