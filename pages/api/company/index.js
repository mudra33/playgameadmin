import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('Companies')
                .select(
                    'CompanyName',
                    'CompanyKey',
                    'CompanyDescription',
                    'CompanyCreateTS',
                    'CompanyLastUpdatedDateTime'
                );

            return res.status(200).send({ data });
        }
    } catch (err) {
        return res.status(500).send({ error: 'Oops! Something went wrong!', err });
    }
};

export default connectionHandler()(handler);
