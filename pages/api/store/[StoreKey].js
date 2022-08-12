import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            await req.db
                .transaction((trx) => {
                    trx.select('Stores.*')
                        .from('Stores')
                        .where('Stores.StoreKey', '=', req.query.StoreKey)
                        .transacting(trx)
                        .then(async (data) => {
                            const Sweepstakes = await trx
                                .select('Sweepstakes.*')
                                .from('StoreSweepstakes')
                                .innerJoin(
                                    'Sweepstakes',
                                    'StoreSweepstakes.SweepstakesKey',
                                    'Sweepstakes.SweepstakesKey'
                                )
                                .where('StoreSweepstakes.StoreKey', '=', req.query.StoreKey);

                            data[0].Sweepstakes = JSON.parse(JSON.stringify(Sweepstakes));

                            const BonusPlans = await trx
                                .select('BonusPlans.*')
                                .from('StoreBonusPlans')
                                .innerJoin('BonusPlans', 'StoreBonusPlans.BonusPlanKey', 'BonusPlans.BonusPlanKey')
                                .where('StoreBonusPlans.StoreKey', '=', req.query.StoreKey);

                            data[0].BonusPlans = JSON.parse(JSON.stringify(BonusPlans));

                            const StorePercentagePlans = await trx
                                .select('StorePercentagePlans.*')
                                .from('StorePercentagePlans')
                                .innerJoin(
                                    'PercentagePlans',
                                    'StorePercentagePlans.PercentagePlanKey',
                                    'PercentagePlans.PercentagePlanKey'
                                )
                                .where('StorePercentagePlans.StoreKey', '=', req.query.StoreKey);

                            data[0].StorePercentagePlans = JSON.parse(JSON.stringify(StorePercentagePlans));

                            const transaction = await trx
                                .select('Transactions.*')
                                .from('Transactions')
                                .innerJoin('Stores', 'Stores.StoreKey', 'Transactions.StoreKey')
                                .where('Transactions.StoreKey', '=', req.query.StoreKey)
                                .orderBy('Transactions.TransactionsLastUpdatedDateTime', 'desc');

                            data[0].transaction = JSON.parse(JSON.stringify(transaction));

                            return data;
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then((inserts) => {
                    return res.status(200).send({ data: inserts[0] });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }

        if (req.method === 'PATCH') {
            await req.db
                .transaction((trx) => {
                    trx('Stores')
                        .where('Stores.StoreKey', '=', req.query.StoreKey)
                        .update({
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
                            StoreBlocked: req.body.StoreBlocked,
                            SalespersonPercentage: req.body.SalespersonPercentage,
                            Settings: JSON.stringify(req.body.Settings),
                            UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                            UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                            StoreCreateTS: new Date(),
                            StoreLastUpdatedDateTime: new Date(),
                        })
                        .transacting(trx)
                        .then(async (StoreKey) => {
                            const sweepstakes = req.body.Sweepstakes;
                            await req
                                .db('StoreSweepstakes')
                                .where({
                                    'StoreSweepstakes.StoreKey': req.query.StoreKey,
                                })
                                .del();

                            const StoreSweepstakes = sweepstakes.forEach(async (sweepstake) => {
                                return trx
                                    .insert({
                                        StoreKey: req.query.StoreKey,
                                        SweepstakesKey: sweepstake,
                                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                        StoreSweepstakesLastUpdatedDateTime: new Date(),
                                    })
                                    .into('StoreSweepstakes')
                                    .transacting(trx);
                            });

                            return { StoreKey, StoreSweepstakes };
                        })
                        .then(async () => {
                            if (req.body.PercentagePlanKey) {
                                const storePercentagePlan = await trx('StorePercentagePlans')
                                    .where('StorePercentagePlans.StoreKey', '=', req.query.StoreKey)
                                    .update({
                                        PercentagePlanKey: req.body.PercentagePlanKey,
                                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                    })
                                    .transacting(trx);

                                return { storePercentagePlan };
                            }
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(() => {
                    return res.status(201).send({ message: 'Store Edited Succesfully.' });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }

        if (req.method === 'DELETE') {
            const data = await req.db('Stores').where({ StoreKey: req.query.StoreKey }).del();

            if (data < 1) {
                return res.status(404).json({ message: `Store not found with StoreKey- ${req.query.StoreKey}` });
            }

            return res.status(200).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
