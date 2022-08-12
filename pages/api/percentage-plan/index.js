import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const data = await req.db('PercentagePlans').insert({
                PercentagePlanName: req.body.PercentagePlanName,
                PurchasePercentage: req.body.PurchasePercentage,
                Comments: req.body.Comments,
                UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                PercentagePlanCreateTS: new Date(),
                PercentagePlanLastUpdatedDateTime: new Date(),
            });

            return res.status(200).send({ message: 'Percentage Plan Added Successfully', data });
        }

        if (req.method === 'GET') {
            const data = await req
                .db('PercentagePlans')
                .select('PercentagePlanKey', 'PercentagePlanName', 'PurchasePercentage', 'Comments');

            return res.status(200).send({ data });
        } else {
            return res.status(404).end();
        }
    } catch (err) {
        return res.status(500).send({ error: 'Oops! Something went wrong!' });
    }
};

export default connectionHandler()(handler);
