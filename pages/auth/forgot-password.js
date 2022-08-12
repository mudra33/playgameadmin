import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Pre';
import TextField from '../../components/TextField';
import MessageBar from '../../components/MessageBar';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { Link, Spinner, SpinnerSize, Text } from '@fluentui/react';

const ForgotPassword = () => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const formik = useFormik({
        initialValues: {
            UserPhone: '',
        },
        validationSchema: Yup.object({
            UserPhone: Yup.string()
                .trim()
                .required('Phone Number is required')
                .matches(/^[0-9]+$/, 'Phone number must be a numeric')
                .min(10, 'Too short! Minimum allowed length is 10')
                .max(10, 'Too short! Minimum allowed length is 10'),
        }),
        onSubmit: async (values) => {
            const user = await fetch(`/api/users`, {
                body: JSON.stringify({
                    UserPhone: values.UserPhone,
                }),

                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const data = await user.json();

            if (!data.data) {
                setNotification({
                    message: `Account does not exist with Phone - ${values.UserPhone}`,
                    messageBarType: 1,
                });
            }

            if (data.data.UserBlocked === 1) {
                setNotification({
                    message: `Account Blocked with Phone - ${values.UserPhone}`,
                    messageBarType: 1,
                });
            } else if (data.data && data.data.UserKey) {
                const user = await fetch(`/api/users/reset-password`, {
                    body: JSON.stringify({
                        UserPhone: values.UserPhone,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                });
                const userReturned = await user.json();

                if (userReturned.data && userReturned.data.UserKey) {
                    router.push(
                        {
                            pathname: '/auth/reset-password',
                            query: {
                                UserPhone: values.UserPhone,
                                UserKey: userReturned.data.UserKey,
                                Token: userReturned.data.Token,
                            },
                        },
                        { shallow: false }
                    );
                    return;
                }
            }
        },
    });

    return (
        <Layout title="Auth Forgot Password">
            <form className="ms-Grid" onSubmit={formik.handleSubmit}>
                {notification.message && notification.message.length > 0 ? (
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
                            Forgot Password
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
                            Enter the Phone Number of your Account
                        </Text>
                    </div>
                </div>

                <TextField
                    type="tel"
                    label="Phone Number"
                    minLength="9"
                    maxLength="10"
                    {...formik.getFieldProps('UserPhone')}
                    formik={{
                        touched: formik.touched.UserPhone,
                        errors: formik.errors.UserPhone,
                    }}
                />

                <div
                    className="ms-Grid-row"
                    style={{
                        marginTop: '50px',
                    }}>
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <PrimaryButton
                            type="submit"
                            text={formik.isSubmitting ? <Spinner size={SpinnerSize.xSmall} /> : `Submit`}
                            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                        />
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-xl12">
                            <Text
                                style={{
                                    display: 'block',
                                    paddingTop: '20px',
                                    textAlign: 'center',
                                }}>
                                {'Continue to '}
                                <Link
                                    href="/auth/login"
                                    style={{
                                        color: '#2D62ED',
                                        textAlign: 'center',
                                        letterSpacing: '0px',
                                        font: 'normal normal 600 15px/25px',
                                    }}>
                                    Login
                                </Link>
                            </Text>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default ForgotPassword;
