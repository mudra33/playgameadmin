import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('CompanySweepstakes')
                .select(
                    'CompanySweepstakes.CompanySweepstakesKey',
                    'Sweepstakes.SweepstakesName',
                    'Companies.CompanyName',
                    'CompanySweepstakes.Comments'
                )
                .join('Companies', { 'CompanySweepstakes.CompanyKey': 'Companies.CompanyKey' })
                .join('Sweepstakes', {
                    'CompanySweepstakes.SweepstakesKey': 'Sweepstakes.SweepstakesKey',
                });

            return res.status(200).send({ data });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
