import connectionHandler from '../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const data = await req
                .db('Users as U')
                .leftJoin('UserRoles as UR', 'U.UserKey', 'UR.UserKey')
                .leftJoin('Roles as R', 'UR.RoleKey', 'R.RoleKey')
                .where('U.UserPhone', req.body.UserPhone)
                .select(
                    'U.UserFirstName as UserFirstName',
                    'U.UserLastName as UserLastName',
                    'U.UserKey',
                    'U.UserBlocked as UserBlocked',
                    'U.UserPassword as UserPassword',
                    'R.RoleName as RoleName',
                    'StoreUsers.StoreKey',
                    'Stores.StoreName'
                )
                .leftJoin('StoreUsers', 'U.UserKey', 'StoreUsers.UserKey')
                .leftJoin('Stores', 'Stores.StoreKey', 'StoreUsers.StoreKey');

            if (data && data.length < 1)
                return res
                    .status(404)
                    .send({ message: `User not found with Phone - ${req.body.UserPhone}` });

            return res.status(200).send(data[0]);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
