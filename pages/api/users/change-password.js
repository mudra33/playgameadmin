import connectionHandler from '../../../src/config/connection-handler';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await req.db
                .transaction((trx) => {
                    trx('PasswordResetTokens')
                        .where({ Token: req.body.Token })
                        .select('UserKey')
                        .del()
                        .transacting(trx)
                        .then(async () => {
                            const salt = bcrypt.genSaltSync(15);
                            const hash = bcrypt.hashSync(req.body.UserPassword, salt);

                            await trx('Users')
                                .whereNot('UserPassword', '=', hash)
                                .andWhere('UserKey', req.body.UserKey)
                                .update({
                                    UserPassword: hash,
                                });
                        })

                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(() => {
                    return res.status(201).send({ message: 'Password Changed Successfully.' });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
