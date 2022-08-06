import bcrypt from 'bcrypt';
import connectionHandler from '../../../../src/config/connection-handler';

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
                    'Users.UserBlocked'
                )
                .join('UserRoles', { 'Users.UserKey': 'UserRoles.UserKey' })
                .join('Roles', { 'Roles.RoleKey': 'UserRoles.RoleKey' })
                .where({ RoleName: req.query.UserRole });

            if (data && data.length < 1)
                return res.status(404).json({
                    message: `User not found with UserKey- ${req.query.UserKey} && UserRole - ${req.query.UserRole}`,
                });

            return res.status(200).send({ data: data[0] });
        }

        if (req.method === 'PATCH') {
            const user = {
                UserFirstName: req.body.UserFirstName,
                UserLastName: req.body.UserLastName,
                UserPhone: req.body.UserPhone,
                UserEmail: req.body.UserEmail,
                UserBlocked: req.body.UserBlocked,
                ForcePasswordChange: req.body.ForcePasswordChange,
                UserLastUpdatedDateTime: new Date(),
            };

            if (req.body.UserPassword) {
                const salt = bcrypt.genSaltSync(15);
                const hash = bcrypt.hashSync(req.body.UserPassword, salt);
                user.UserPassword = hash;
            }

            const data = await req.db('Users').where('UserKey', req.query.UserKey).update(user);

            if (data && data.length < 1)
                return res
                    .status(404)
                    .json({ message: `User not found with UserKey - ${req.query.UserKey}` });

            return res.status(200).send({ message: 'Updated Successfully', data: data[0] });
        }

        if (req.method === 'DELETE') {
            const data = await req.db('Users').where({ UserKey: req.query.UserKey }).del();

            if (data < 1)
                return res
                    .status(404)
                    .json({ message: `User not found with UserKey- ${req.query.UserKey}` });

            return res.status(200).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
