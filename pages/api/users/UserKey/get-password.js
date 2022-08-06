import connectionHandler from '../../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('Users')
                .where({ UserKey: req.query.UserKey })
                .select('UserPassword');

            if (data < 1)
                return res.status(404).json({
                    message: `User not found with UserKey- ${req.query.UserKey} `,
                });

            return res.status(200).send({ data: data[0].UserPassword });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
