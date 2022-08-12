import NextAuth from 'next-auth';
import { compare } from 'bcrypt';
import Providers from 'next-auth/providers';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                UserPhone: { label: 'Username', type: 'number' },
                UserPassword: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                try {
                    const res = await fetch(`/api/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { 'Content-Type': 'application/json' },
                    });

                    const user = await res.json();
                    if (user && user.error) {
                        return null;
                    }

                    const comparedValue = await compare(credentials.UserPassword, user.UserPassword);

                    if (!comparedValue) {
                        return null;
                    }

                    delete user.UserPassword;
                    return user;
                } catch (error) {
                    throw new Error('Oops! Something went wrong!');
                }
            },
        }),
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    // database: process.env.DATABASE_URL,

    // database: {
    //     type: 'mysql',
    //     host: process.env.MYSQL_HOST,
    //     port: process.env.MYSQL_PORT,
    //     username: process.env.MYSQL_USER,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.MYSQL_DATABASE
    // },

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,
        secret: process.env.JWT_SECRET,

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 4 * 60 * 60,

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 4 * 60 * 60,
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.JWT_SECRET,
        // Set to true to use encryption (default: false)
        encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error' // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        // async session(session, user) { return session },
        // async jwt(token, user, account, profile, isNewUser) { return token }

        async session(session, user) {
            if (user) session.user = user.user;
            return session;
        },
        async jwt(token, user) {
            if (user) {
                const UserFirstName = user.UserFirstName || '';
                const UserLastName = user.UserLastName || '';
                const UserKey = user.UserKey || '';
                const UserName = `${UserFirstName} ${UserLastName}`;
                const RoleName = user.RoleName || '';

                token.user = {
                    UserKey: UserKey,
                    UserName: UserName,
                    RoleName: RoleName,
                };

                if (user.StoreKey && user.StoreName) {
                    const StoreName = user.StoreName || '';
                    const StoreKey = user.StoreKey || '';

                    token.user.StoreName = StoreName;
                    token.user.StoreKey = StoreKey;
                }
            }

            return token;
        },
        async signIn(user) {
            // throw `${process.env.NEXTAUTH_URL}/${user.RoleName.toLowerCase()}/home`;
            if (user && user.UserBlocked) return false;

            if (user && user.RoleName) return true;
            // throw `${process.env.NEXTAUTH_URL}/${user.RoleName.toLowerCase()}/home`;
            return false;
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: true,
});
