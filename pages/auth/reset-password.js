import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Layout from '../../components/Layout/Pre';
import TextField from '../../components/TextField';
import { useRouter, withRouter } from 'next/router';
import MessageBar from '../../components/MessageBar';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { Text, Link, Spinner, SpinnerSize } from '@fluentui/react';

const ResetPassword = (props) => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const formik = useFormik({
        initialValues: {
            UserPassword: '',
            ConfirmUserPassword: '',
        },
        validationSchema: Yup.object({
            UserPassword: Yup.string()
                .trim()
                .required('Password is required')
                .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Use 8 or more characters with a mix of letters, numbers & symbols'
                ),
            ConfirmUserPassword: Yup.string()
                .trim()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('UserPassword'), null], 'Passwords must match'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(
                `/api/users/change-password`,
                {
                    body: JSON.stringify({
                        Token: props.router.query.Token,
                        UserPassword: values.UserPassword,
                        UserKey: props.router.query.UserKey,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                }
            );
            const result = await res.json();
            if (res.ok && result) {
                resetForm();
                setNotification({ message: result.message, messageBarType: 4 });
                router.push('/auth/login');
            }
        },
    });

    return (
        <Layout title="Auth Password">
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
                            Reset Password
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

                {/* <div className="ms-Grid-row">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Label styles={labelStyles}>Name:&nbsp;</Label>
                        <Text styles={textStyles}>Xxxxx Xxxxxxxx</Text>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Label styles={labelStyles}>Phone Number:&nbsp;</Label>
                        <Text styles={textStyles}>{props.router.query.UserPhone}</Text>
                    </div>
                </div> */}

                <TextField
                    label="New Password"
                    type="password"
                    revealPasswordAriaLabel="Show password"
                    {...formik.getFieldProps('UserPassword')}
                    formik={{
                        touched: formik.touched.UserPassword,
                        errors: formik.errors.UserPassword,
                    }}
                />

                <TextField
                    label="Re-enter New Password"
                    type="password"
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                    {...formik.getFieldProps('ConfirmUserPassword')}
                    formik={{
                        touched: formik.touched.ConfirmUserPassword,
                        errors: formik.errors.ConfirmUserPassword,
                    }}
                />

                <div className="ms-Grid-row">
                    <div
                        className="ms-Grid-col ms-sm12"
                        style={{
                            marginTop: '50px',
                        }}>
                        <PrimaryButton
                            type="submit"
                            text={
                                formik.isSubmitting ? (
                                    <Spinner size={SpinnerSize.xSmall} />
                                ) : (
                                    'Submit'
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
            </form>
        </Layout>
    );
};

ResetPassword.propTypes = {
    router: PropTypes.any,
};

export default withRouter(ResetPassword);
