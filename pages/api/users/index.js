import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'GET' && req.query.UserRole === 'Cashier') {
            const UserKey = req.query.UserKey ? req.query.UserKey : '';
            const StoreKey = req.query.StoreKey ? req.query.StoreKey : '';

            await req
                .db('Users')
                .whereNot({ 'Users.UserKey': UserKey })
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
                    'Roles.RoleName'
                )
                .innerJoin('UserRoles', { 'Users.UserKey': 'UserRoles.UserKey' })
                .innerJoin('Roles', { 'Roles.RoleKey': 'UserRoles.RoleKey' })
                .where({ RoleName: 'Cashier' })
                .leftOuterJoin('StoreUsers', { 'Users.UserKey': 'StoreUsers.UserKey' })
                .leftOuterJoin('Stores', { 'Stores.StoreKey': 'StoreUsers.StoreKey' })
                .modify((queryBuilder) => {
                    if (StoreKey) {
                        queryBuilder.where('Stores.StoreKey', StoreKey);
                    }
                })
                .then((data) => {
                    return res.status(200).send({ data: data });
                });
        }

        if (req.method === 'GET' && req.query.UserRole === 'Owner') {
            const UserKey = req.query.UserKey ? req.query.UserKey : '';
            const StoreKey = req.query.StoreKey ? req.query.StoreKey : '';

            await req
                .db('Users')
                .whereNot({ 'Users.UserKey': UserKey })
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
                    'Roles.RoleName',
                    'Stores.StoreName'
                )
                .innerJoin('UserRoles', { 'Users.UserKey': 'UserRoles.UserKey' })
                .innerJoin('Roles', { 'Roles.RoleKey': 'UserRoles.RoleKey' })
                .where({ RoleName: 'Owner' })
                .leftOuterJoin('StoreUsers', { 'Users.UserKey': 'StoreUsers.UserKey' })
                .leftOuterJoin('Stores', { 'Stores.StoreKey': 'StoreUsers.StoreKey' })
                .modify((queryBuilder) => {
                    if (StoreKey) {
                        queryBuilder.where('Stores.StoreKey', StoreKey);
                    }
                })
                .then((data) => {
                    return res.status(200).send({ data });
                });
        }

        if (req.method === 'GET' && req.query.UserRole !== 'Owner' && req.query.UserRole !== 'Cashier') {
            const UserKey = req.query.UserKey ? req.query.UserKey : '';

            const data = await req
                .db('Users')
                .whereNot({ 'Users.UserKey': UserKey })
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
                    'Users.UserBlocked'
                )
                .join('UserRoles', { 'Users.UserKey': 'UserRoles.UserKey' })
                .join('Roles', { 'Roles.RoleKey': 'UserRoles.RoleKey' })
                .where({ RoleName: req.query.UserRole });

            return res.status(200).send({ data });
        }

        if (req.method === 'POST') {
            let UserPhone;
            let UserEmail;

            req.body.UserPhone === undefined ? (UserPhone = '0') : (UserPhone = req.body.UserPhone);
            req.body.UserEmail === undefined ? (UserEmail = '0') : (UserEmail = req.body.UserEmail);

            const data = await req
                .db('Users')
                .where({ UserPhone: UserPhone })
                .orWhere({ UserEmail: UserEmail })
                .select('UserKey', 'UserBlocked');

            if (data && data.length < 1) {
                return res.status(404).json({ message: `User not found with Phone or Email` });
            }

            return res.status(200).send({ data: data[0] });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
