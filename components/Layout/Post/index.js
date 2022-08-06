import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Navigation from '../../Navigation';
import { useSession } from 'next-auth/client';
import { Spinner, SpinnerSize } from '@fluentui/react';

export default function Layout({ children, title }) {
    const router = useRouter();
    const [session, loading] = useSession();

    const siteTitle = title
        ? `${title} - ${process.env.NEXT_PUBLIC_SITE_TITLE}`
        : `${process.env.NEXT_PUBLIC_SITE_TITLE}`;

    // If no session exists, display access denied message
    if (!session && !loading) {
        router.push('/auth/login');
    }

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Play Promo" />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        title
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} key="title" />
                <meta name="twitter:card" content="summary_large_image" />

                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />
            </Head>

            {loading ? (
                <Spinner
                    label="Loading..."
                    ariaLive="assertive"
                    labelPosition="left"
                    size={SpinnerSize.large}
                />
            ) : (
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div
                            className="ms-Grid-col ms-sm2 ms-xl2"
                            style={{
                                marginLeft: 0,
                                paddingLeft: 0,
                            }}>
                            <Navigation />
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};
