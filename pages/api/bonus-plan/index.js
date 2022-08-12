import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await req.db
                .transaction((trx) => {
                    trx.insert({
                        BonusPlanName: req.body.BonusPlanName,
                        Comments: req.body.Comments,
                        BonusEntries: JSON.stringify(req.body.BonusEntries),
                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                        BonusPlanCreateTS: new Date(),
                        BonusPlanLastUpdatedDateTime: new Date(),
                    })
                        .into('BonusPlans')
                        .transacting(trx)
                        .then(async (BonusPlanKey) => {
                            const data = {
                                BonusPlanKey,
                            };
                            const sweepstakes = [];

                            if (req.body.Sweepstakes && req.body.Sweepstakes.length > 0) {
                                req.body.Sweepstakes.forEach((sweepstake) => {
                                    sweepstakes.push({
                                        BonusPlanKey: BonusPlanKey[0],
                                        SweepstakesKey: sweepstake,
                                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    });
                                });

                                const BonusPlanSweepstakes = await trx
                                    .insert(sweepstakes)
                                    .into('BonusPlanSweepstakes')
                                    .transacting(trx);

                                data.BonusPlanSweepstakes = BonusPlanSweepstakes;
                            }

                            return data;
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then((data) => {
                    return res.status(201).send({ message: 'Bonus Plan Added Succesfully.', data });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }

        if (req.method === 'GET') {
            const data = await req.db('BonusPlans').select('BonusPlanKey', 'BonusPlanName', 'Comments');

            return res.status(200).send({ data });
        } else {
            return res.status(404).end();
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
