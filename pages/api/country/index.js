import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('Countries')
                .select('CountryKey', 'CountryName', 'CountryDescription');

            return res.status(200).send({ data });
        } else {
            return res.status(404).end();
        }
    } catch (err) {
        return res.status(500).send({ error: 'Oops! Something went wrong!' });
    }
};

export default connectionHandler()(handler);
