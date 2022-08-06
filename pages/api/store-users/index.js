import bcrypt from 'bcrypt';
import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await req.db
                .transaction((trx) => {
                    const salt = bcrypt.genSaltSync(15);
                    const hash = bcrypt.hashSync(req.body.UserPassword, salt);

                    trx.insert({
                        UserFirstName: req.body.UserFirstName,
                        UserLastName: req.body.UserLastName,
                        UserPhone: req.body.UserPhone,
                        UserEmail: req.body.UserEmail,
                        AddressLine1: req.body.AddressLine1,
                        AddressLine2: req.body.AddressLine2,
                        City: req.body.City,
                        State: req.body.State,
                        Zip: req.body.Zip,
                        UserIdType: req.body.UserIdType,
                        UserIdNumber: req.body.UserIdNumber,
                        UserPassword: hash,
                        UserPasswordSalt: salt,
                        UserCreateTS: new Date(),
                        UserLastUpdatedDateTime: new Date(),
                    })
                        .into('Users')
                        .transacting(trx)
                        .then(async (UserKey) => {
                            await trx
                                .insert({
                                    UserKey: UserKey[0],
                                    StoreKey: req.body.StoreKey,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    StoreUsersCreateTS: new Date(),
                                    StoreUsersLastUpdatedDateTime: new Date(),
                                })
                                .into('StoreUsers')
                                .transacting(trx);
                            return {
                                UserKey: UserKey[0],
                            };
                        })
                        .then(async (UserKey) => {
                            const RoleKey = await trx('Roles')
                                .where({
                                    RoleName: req.body.UserRole,
                                })
                                .select('RoleKey');
                            return {
                                UserKey: UserKey.UserKey,
                                RoleKey: RoleKey && RoleKey.length > 0 ? RoleKey[0].RoleKey : 1,
                            };
                        })
                        .then((data) => {
                            return trx
                                .insert({
                                    UserKey: data.UserKey,
                                    RoleKey: data.RoleKey,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserRoleCreateTS: new Date(),
                                    UserRoleLastUpdatedDateTime: new Date(),
                                })
                                .into('UserRoles')
                                .transacting(trx);
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then((inserts) => {
                    return res
                        .status(201)
                        .send({ message: 'Registered Successfully.', data: inserts[0] });
                })
                .catch((error) => {
                    return res.status(500).send({ message: 'Oops! Something went wrong!', error });
                });
        } else {
            return res.status(404).end();
        }
    } catch (err) {
        return res.status(500).send({ error: 'Oops! Something went wrong!' });
    }
};

export default connectionHandler()(handler);
