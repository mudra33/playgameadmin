import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            await req.db
                .transaction((trx) => {
                    trx.select('BonusPlans.*')
                        .from('BonusPlans')
                        .where('BonusPlans.BonusPlanKey', '=', req.query.BonusPlanKey)
                        .transacting(trx)
                        .then(async (data) => {
                            const Sweepstakes = await trx
                                .select('Sweepstakes.*')
                                .from('BonusPlanSweepstakes')
                                .innerJoin(
                                    'Sweepstakes',
                                    'BonusPlanSweepstakes.SweepstakesKey',
                                    'Sweepstakes.SweepstakesKey'
                                )
                                .where('BonusPlanSweepstakes.BonusPlanKey', '=', req.query.BonusPlanKey);

                            data[0].Sweepstakes = JSON.parse(JSON.stringify(Sweepstakes));

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
                    trx('BonusPlans')
                        .where('BonusPlans.BonusPlanKey', '=', req.query.BonusPlanKey)
                        .update({
                            BonusPlanName: req.body.BonusPlanName,
                            Comments: req.body.Comments,
                            BonusEntries: JSON.stringify(req.body.BonusEntries),
                            UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                            BonusPlanLastUpdatedDateTime: new Date(),
                        })
                        .transacting(trx)
                        .then(async (BonusPlanKey) => {
                            const sweepstakes = req.body.Sweepstakes;
                            await req
                                .db('BonusPlanSweepstakes')
                                .where({
                                    'BonusPlanSweepstakes.BonusPlanKey': req.query.BonusPlanKey,
                                })
                                .del();

                            const BonusPlanSweepstakes = sweepstakes.forEach(async (sweepstake) => {
                                return trx
                                    .insert({
                                        BonusPlanKey: req.query.BonusPlanKey,
                                        SweepstakesKey: sweepstake,
                                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                        BonusPlanSweepstakesLastUpdatedDateTime: new Date(),
                                    })
                                    .into('BonusPlanSweepstakes')
                                    .transacting(trx);
                            });

                            return { BonusPlanKey, BonusPlanSweepstakes };
                        })

                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(() => {
                    return res.status(201).send({ message: 'Bonus Plan Edited Succesfully.' });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }

        if (req.method === 'DELETE') {
            const data = await req.db('BonusPlans').where({ BonusPlanKey: req.query.BonusPlanKey }).del();

            if (data < 1) {
                return res.status(404).json({
                    message: `Bonus Plan not found with given BonusPlanKey  - ${req.query.BonusPlanKey}`,
                });
            }

            return res.status(204).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
