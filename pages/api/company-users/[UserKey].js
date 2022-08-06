import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const data = await req
                .db('Users')
                .where({ 'Users.UserKey': req.query.UserKey })
                .select(
                    'Users.UserFirstName',
                    'Users.UserKey',
                    'Users.UserLastName',
                    'Users.UserPhone',
                    'Users.UserEmail',
                    'Users.AddressLine1',
                    'Users.AddressLine2',
                    'Users.City',
                    'Users.State',
                    'Users.Zip',
                    'Users.ForcePasswordChange',
                    'Users.UserBlocked',
                    'Companies.*'
                )
                .join('UserRoles', { 'Users.UserKey': 'UserRoles.UserKey' })
                .join('Roles', { 'Roles.RoleKey': 'UserRoles.RoleKey' })
                .where({ RoleName: 'FulFilment' })
                .leftOuterJoin('CompanyUsers', { 'Users.UserKey': 'CompanyUsers.UserKey' })
                .leftOuterJoin('Companies', { 'Companies.CompanyKey': 'CompanyUsers.CompanyKey' });

            if (data && data.length < 1)
                return res.status(404).json({
                    message: `User not found with UserKey- ${req.query.UserKey} && UserRole - ${req.query.UserRole}`,
                });

            return res.status(200).send({ data: data[0] });
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
                            Comments: req.body.Comments,
                        })
                        .transacting(trx)
                        .then(async (UserKey) => {
                            const CompanyUser = await trx('CompanyUsers')
                                .where('UserKey', '=', req.query.UserKey)
                                .update({
                                    CompanyKey: req.body.CompanyKey,
                                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                    CompanyUsersLastUpdatedDateTime: new Date(),
                                });

                            if (CompanyUser == 0) {
                                return trx
                                    .insert({
                                        UserKey: req.query.UserKey,
                                        CompanyKey: req.body.CompanyKey,
                                        UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                                        UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                                        CompanyUsersLastUpdatedDateTime: new Date(),
                                    })
                                    .into('CompanyUsers')
                                    .transacting(trx);
                            }

                            return { UserKey };
                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(() => {
                    return res.status(201).send({ message: 'Users updated succesfully.' });
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
