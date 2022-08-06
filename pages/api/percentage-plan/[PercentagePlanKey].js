import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('PercentagePlans')
                .where({ PercentagePlanKey: req.query.PercentagePlanKey })
                .select(
                    'PercentagePlanKey',
                    'PercentagePlanName',
                    'Comments',
                    'PurchasePercentage'
                );

            if (data && data.length < 1) {
                return res.status(404).json({
                    message: `Percentage Plan not found with given PercentagePlanKey  - ${req.query.PercentagePlanKey}`,
                });
            }

            return res.status(200).send({ data: data[0] });
        }

        if (req.method === 'PATCH') {
            const data = await req
                .db('PercentagePlans')
                .where({ PercentagePlanKey: req.query.PercentagePlanKey })
                .update({
                    PercentagePlanName: req.body.PercentagePlanName,
                    Comments: req.body.Comments,
                    PurchasePercentage: req.body.PurchasePercentage,
                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                    PercentagePlanLastUpdatedDateTime: new Date(),
                });

            if (data && data.length < 1) {
                return res.status(404).json({
                    message: `Percentage Plan not found with given PercentagePlanKey  - ${req.query.PercentagePlanKey}`,
                });
            }

            return res.status(200).send({ data: data[0] });
        }

        if (req.method === 'DELETE') {
            const data = await req
                .db('PercentagePlans')
                .where({ PercentagePlanKey: req.query.PercentagePlanKey })
                .del();

            if (data < 1) {
                return res.status(404).json({
                    message: `Percentage Plan not found with given PercentagePlanKey  - ${req.query.PercentagePlanKey}`,
                });
            }

            return res.status(200).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
