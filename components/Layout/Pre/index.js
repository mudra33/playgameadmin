import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import PropTypes from 'prop-types';
import profilePic from '../../../public/images/illustrator.svg';

export default function Layout({ children, title }) {
    const siteTitle = title
        ? `${title} - ${process.env.NEXT_PUBLIC_SITE_TITLE}`
        : `${process.env.NEXT_PUBLIC_SITE_TITLE}`;

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

            <div className="ms-Grid pre" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm7 ms-xl7 ms-hiddenMdDown">
                        <div
                            style={{
                                paddingLeft: 0,
                                display: 'flex',
                                height: '100vh',
                                margin: '0 auto',
                                justifyContent: 'center',
                            }}>
                            <Image
                                src={profilePic}
                                width={679}
                                height={528}
                                objectPosition="center"
                                alt="Picture of the author"
                            />
                        </div>
                    </div>
                    <div className="main-element ms-Grid-col ms-sm12 ms-md5 ms-lg5">{children}</div>
                </div>
            </div>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};
