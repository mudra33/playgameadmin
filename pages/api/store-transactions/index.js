import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const data = await req.db('Transactions').insert({
                TransactionType: req.body.TransactionType,
                StoreKey: req.body.StoreKey,
                TransactionAmount: req.body.TransactionAmount,
                Total: req.body.Total,
                UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                TransactionsCreateTS: new Date(),
                TransactionsLastUpdatedDateTime: new Date(),
            });

            return res.status(200).send({ message: 'Transaction Added Successfully', data });
        }

        if (req.method === 'GET') {
            const data = await req
                .db('Transactions')
                .select('TransactionAmount', 'Total', 'Transactionskey')
                .where('StoreKey', req.query.StoreKey)
                .orderBy('TransactionsLastUpdatedDateTime', 'desc');

            return res.status(200).send({ data });
        }
    } catch (err) {
        return res.status(500).send({ error: 'Oops! Something went wrong!' });
    }
};

export default connectionHandler()(handler);
