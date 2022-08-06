import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('CompanySweepstakes')
                .select(
                    'Companies.*',
                    'Sweepstakes.*',
                    'CompanySweepstakes.CompanySweepstakesKey',
                    'CompanySweepstakes.Comments',
                    'CompanySweepstakes.SweepstakesBlocked'
                )
                .innerJoin('Companies', 'CompanySweepstakes.CompanyKey', 'Companies.CompanyKey')
                .innerJoin(
                    'Sweepstakes',
                    'CompanySweepstakes.SweepstakesKey',
                    'Sweepstakes.SweepstakesKey'
                )
                .where('CompanySweepstakes.CompanySweepstakesKey', '=', req.query.SweepstakesKey);

            return res.status(200).send({ data });
        }

        if (req.method === 'PATCH') {
            const data = await req
                .db('CompanySweepstakes')
                .where('CompanySweepstakes.CompanySweepstakesKey', '=', req.query.SweepstakesKey)
                .update({
                    CompanyKey: req.body.CompanyKey,
                    SweepstakesKey: req.body.SweepstakesKey,
                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                    SweepstakesBlocked: req.body.SweepstakesBlocked,
                    Comments: req.body.Comments,
                });

            return res.status(201).send({ data });
        }
        if (req.method === 'DELETE') {
            const data = await req
                .db('CompanySweepstakes')
                .where({ CompanySweepstakesKey: req.query.SweepstakesKey })
                .del();

            if (data < 1) {
                return res.status(404).json({
                    message: `Company Sweepstakes not found with CompanySweepstakesKey- ${req.query.SweepstakesKey}`,
                });
            }

            return res.status(200).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
