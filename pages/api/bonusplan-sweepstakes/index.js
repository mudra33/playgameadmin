import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('BonusPlanSweepstakes')
                .select(
                    'BonusPlanSweepstakes.BonusPlanSweepstakesKey',
                    'Sweepstakes.SweepstakesName',
                    'BonusPlanSweepstakes.Comments'
                )
                .join('BonusPlans', {
                    'BonusPlanSweepstakes.BonusPlanKey': 'BonusPlans.BonusPlanKey',
                })
                .join('Sweepstakes', {
                    'BonusPlanSweepstakes.SweepstakesKey': 'Sweepstakes.SweepstakesKey',
                });

            return res.status(200).send({ data });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
