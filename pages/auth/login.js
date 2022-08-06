import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../components/Layout/Pre';
import TextField from '../../components/TextField';
import MessageBar from '../../components/MessageBar';
import { getCsrfToken, getSession, signIn } from 'next-auth/client';
import { Link, Spinner, SpinnerSize, Text } from '@fluentui/react';
import PrimaryButton from '../../components/Button/PrimaryButton';

const Login = (props) => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const formik = useFormik({
        initialValues: {
            UserPhone: '',
            UserPassword: '',
        },
        validationSchema: Yup.object({
            UserPhone: Yup.string()
                .trim()
                .required('Phone Number is required')
                .matches(/^[0-9]+$/, 'Phone number must be a numeric')
                .min(10, 'Too short! Minimum allowed length is 10')
                .max(10, 'Too short! Minimum allowed length is 10'),
            UserPassword: Yup.string()
                .trim()
                .required('Password is required')
                .min(5, 'Too short! Minimum allowed length is 5')
                .max(18, 'Too long! Maximum allowed length is 18'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await signIn('credentials', {
                redirect: false,
                csrfToken: props.csrfToken,
                UserPhone: values.UserPhone,
                UserPassword: values.UserPassword,
            });

            // const data = await fetch(
            //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/callback/credentials`,
            //     {
            //         body: JSON.stringify({
            //             csrfToken: props.csrfToken,
            //             UserPhone: values.UserPhone,
            //             UserPassword: values.UserPassword
            //         }),
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         method: 'POST'
            //     }
            // );

            if (res && res.error) {
                if (res.error === 'AccessDenied') {
                    setNotification({
                        message: `Account locked with Phone - ${values.UserPhone}. Please see an agent for help`,
                        messageBarType: 1,
                    });
                } else {
                    setNotification({
                        message: `Incorrect credentials`,
                        messageBarType: 1,
                    });
                }
                return;
            }

            resetForm();
            setNotification({
                message: ``,
                messageBarType: '',
            });
            console.log('Res Url', res.url);
            router.push('/admin/home');
        },
    });

    return (
        <Layout title="Login">
            <form className="ms-Grid" onSubmit={formik.handleSubmit}>
                {notification.message.length > 0 ? (
                    <MessageBar
                        message={notification.message}
                        messageBarType={notification.messageBarType}
                        onDismiss={() => setNotification({ message: '', messageBarType: null })}
                    />
                ) : (
                    ''
                )}

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <Text
                            variant={'xxLarge'}
                            style={{
                                color: '#2E4765',
                                display: 'block',
                                marginBottom: '15px',
                            }}>
                            Login
                        </Text>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <Text
                            variant={'large'}
                            style={{
                                color: '#707070',
                                display: 'block',
                                marginBottom: '30px',
                            }}>
                            Welcome back! Please login to your account
                        </Text>
                    </div>
                </div>

                <TextField
                    type="tel"
                    label="Username"
                    minLength="9"
                    maxLength="10"
                    {...formik.getFieldProps('UserPhone')}
                    formik={{
                        touched: formik.touched.UserPhone,
                        errors: formik.errors.UserPhone,
                    }}
                />

                <TextField
                    type="password"
                    label="Password"
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                    {...formik.getFieldProps('UserPassword')}
                    formik={{
                        touched: formik.touched.UserPassword,
                        errors: formik.errors.UserPassword,
                    }}
                />

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <Link
                            href="/auth/forgot-password"
                            style={{
                                color: '#777777',
                                display: 'flex',
                                letterSpacing: '0px',
                                paddingBottom: '50px',
                                justifyContent: 'flex-end',
                                textDecoration: 'underline',
                                font: 'normal normal normal 15px/20px',
                            }}>
                            Forgot Password
                        </Link>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <PrimaryButton
                            type="submit"
                            text={
                                formik.isSubmitting ? (
                                    <Spinner size={SpinnerSize.xSmall} />
                                ) : (
                                    `Login`
                                )
                            }
                            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                        />
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <Text
                            style={{
                                display: 'block',
                                paddingTop: '20px',
                                textAlign: 'center',
                            }}>
                            {'Don’t have an account? '}
                            <Link
                                href="/auth/signup"
                                style={{
                                    color: '#2D62ED',
                                    textAlign: 'center',
                                    letterSpacing: '0px',
                                    font: 'normal normal 600 15px/25px',
                                }}>
                                Sign up
                            </Link>
                        </Text>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    // if (session) {
    //     return {
    //         redirect: {
    //             destination: '/admin/home',
    //             permanent: false
    //         }
    //     };
    // }

    return {
        props: {
            session,
            csrfToken: await getCsrfToken(context),
        },
    };
}

// function getQuery(url) {
//     var qs = url.substring(url.indexOf('?') + 1).split('&');
//     for (var i = 0, result = {}; i < qs.length; i++) {
//         qs[i] = qs[i].split('=');
//         result[qs[i][0]] = decodeURIComponent(qs[i][1]);
//     }
//     return result;
// }

Login.propTypes = {
    csrfToken: PropTypes.any,
};

export default Login;
