import './styles.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../public/styles/globals.css';
import { Provider, useSession } from 'next-auth/client';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

export default function App({ Component, pageProps }) {
    initializeIcons();
    return (
        <Provider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            options={{
                // Client Max Age controls how often the useSession in the client should
                // contact the server to sync the session state. Value in seconds.
                // e.g.
                // * 0  - Disabled (always use cache value)
                // * 60 - Sync session state with server if it's older than 60 seconds
                clientMaxAge: 0,
                // Keep Alive tells windows / tabs that are signed in to keep sending
                // a keep alive request (which extends the current session expiry) to
                // prevent sessions in open windows from expiring. Value in seconds.
                //
                // Note: If a session has expired when keep alive is triggered, all open
                // windows / tabs will be updated to reflect the user is signed out.
                keepAlive: 0,
            }}
            session={pageProps.session}>
            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </Provider>
    );
}

function Auth({ children }) {
    const [session, loading] = useSession();

    useEffect(() => {
        // if (loading) return; // Do nothing while loading
        // if (!session) {
        // }
    }, [session, loading]);

    if (session) {
        return children;
    } else {
        return (
            <a
                href="http://localhost:3000/api/auth/signin"
                onClick={(e) => {
                    e.preventDefault();
                }}>
                <button className="signInButton">Sign in</button>
            </a>
        );
    }

    // // Session is being fetched, or no user.
    // // If no user, useEffect() will redirect.
    // return <div>Loading...</div>;
}

App.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
};
