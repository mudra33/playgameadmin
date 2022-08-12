import connectionHandler from '../../../../src/config/connection-handler';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    try {
        if (req.method === 'PATCH') {
            const user = await req.db('Users').where({ UserKey: req.body.UserKey }).select('UserPassword', 'UserKey');

            if (user && user.length < 1)
                return res.status(404).json({
                    message: `User not found with UserKey- ${req.query.UserKey} `,
                });

            if (await bcrypt.compare(req.body.UserPassword, user[0].UserPassword))
                return res.status(404).send({
                    message: 'Old Password is incorrect',
                });

            if (await bcrypt.compare(req.body.NewUserPassword, user[0].UserPassword))
                return res.status(404).send({
                    message: 'New Password cannot be same as Old Password',
                });

            const salt = bcrypt.genSaltSync(15);
            const hash = bcrypt.hashSync(req.body.NewUserPassword, salt);

            await req.db('Users').where({ UserKey: user[0].UserKey }).update({ UserPassword: hash });

            return res.status(200).send({ message: 'Password Changed Successfully.' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
