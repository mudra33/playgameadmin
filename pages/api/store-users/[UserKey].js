import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const UserKey = req.query.UserKey ? req.query.UserKey : '';
            const StoreKey = req.query.StoreKey ? req.query.StoreKey : '';

            await req
                .db('Users')
                .where({ 'Users.UserKey': UserKey })
                .select(
                    'Users.UserKey',
                    'Users.UserFirstName',
                    'Users.UserLastName',
                    'Users.UserPhone',
                    'Users.UserEmail',
                    'Users.AddressLine1',
                    'Users.AddressLine2',
                    'Users.City',
                    'Users.State',
                    'Users.Zip',
                    'Users.Comments',
                    'Users.UserBlocked',
                    'Users.ForcePasswordChange',
                    'Roles.RoleName',
                    'Stores.StoreKey',
                    'Stores.StoreName'
                )
                .innerJoin('UserRoles', { 'Users.UserKey': 'UserRoles.UserKey' })
                .innerJoin('Roles', { 'Roles.RoleKey': 'UserRoles.RoleKey' })
                .where({ RoleName: req.query.UserRole })
                .leftOuterJoin('StoreUsers', { 'Users.UserKey': 'StoreUsers.UserKey' })
                .leftOuterJoin('Stores', { 'Stores.StoreKey': 'StoreUsers.StoreKey' })
                .modify(function (queryBuilder) {
                    if (StoreKey) {
                        queryBuilder.where('Stores.StoreKey', StoreKey);
                    }
                })
                .then((data) => {
                    if (data && data.length < 1)
                        return res.status(404).json({
                            message: `User not found with UserKey - ${req.query.UserKey} && UserRole - ${req.query.UserRole}`,
                        });

                    return res.status(200).send({ data: data[0] });
                });
        }

        if (req.method === 'PATCH') {
            await req.db
                .transaction((trx) => {
                    trx('Users')
                        .where('Users.UserKey', '=', req.query.UserKey)
                        .update({
                            UserFirstName: req.body.UserFirstName,
                            UserLastName: req.body.UserLastName,
                            UserPhone: req.body.UserPhone,
                            UserEmail: req.body.UserEmail,
                            UserLastUpdatedDateTime: new Date(),
                            UserBlocked: req.body.UserBlocked,
                        })
                        .transacting(trx)
                        .then(async (UserKey) => {
                            await trx('StoreUsers').where('UserKey', '=', req.query.UserKey).update({
                                StoreKey: req.body.StoreKey,
                                UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                StoreUsersLastUpdatedDateTime: new Date(),
                            });
                            return { UserKey };
                        })

                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(() => {
                    return res.status(201).send({ message: 'Owners Updated Succesfully.' });
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
