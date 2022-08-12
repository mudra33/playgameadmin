const moment = require('moment');
const crypto = require('crypto');
import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await req.db
                .transaction((trx) => {
                    trx('Users')
                        .where({ UserPhone: req.body.UserPhone })
                        .select('UserKey', 'UserEmail')
                        .transacting(trx)
                        .then(async (UserKey) => {
                            UserKey = UserKey[0].UserKey;
                            const Token = `${UserKey}.${crypto.randomBytes(40).toString('hex')}`;
                            const Expires = moment().add(2, 'hours').toDate();

                            await trx
                                .insert({
                                    UserKey,
                                    Token,
                                    Expires,
                                })
                                .into('PasswordResetTokens')
                                .transacting(trx);
                            return { Token, UserKey };
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then((data) => {
                    return res.status(201).send({ message: 'User Found with given UserPhone', data });
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
