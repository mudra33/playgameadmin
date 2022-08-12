import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Layout from '../../components/Layout/Pre';
import TextField from '../../components/TextField';
import MessageBar from '../../components/MessageBar';
import { Link, Spinner, SpinnerSize, Text } from '@fluentui/react';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const formik = useFormik({
        initialValues: {
            UserFirstName: '',
            UserLastName: '',
            UserPhone: '',
            UserEmail: '',
            UserPassword: '',
        },
        validationSchema: Yup.object({
            UserFirstName: Yup.string().required('First Name is required'),
            UserLastName: Yup.string().required('Last Name is required'),
            UserPhone: Yup.string()
                .min(10, 'Too Short!')
                .max(10, 'Too Long!')
                .required('Phone number Is required'),
            UserEmail: Yup.string().required('Email is required'),
            UserPassword: Yup.string()
                .min(10, 'Too Short!')
                .max(10, 'Too Long!')
                .required('Password Is required'),
        }),
        onSubmit: async (values) => {
            const res = await fetch(`/api/auth/signup`, {
                body: JSON.stringify({
                    UserFirstName: values.UserFirstName,
                    UserLastName: values.UserLastName,
                    UserPhone: values.UserPhone,
                    UserEmail: values.UserEmail,
                    UserPassword: values.UserPassword,
                    UserRole: 'Customer',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            try {
                const signUpRes = await res.json();
                setNotification({ message: signUpRes.message, messageBarType: 1 });
                if (signUpRes.data) {
                    router.push('/auth/login');
                }
            } catch (e) {
                console.log('Error');
            }
        },
    });

    return (
        <Layout title="Auth Signup">
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
                            Sign up
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
                            }}></Text>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-xl6">
                        <TextField
                            type="text"
                            label="First Name"
                            {...formik.getFieldProps('UserFirstName')}
                            formik={{
                                touched: formik.touched.UserFirstName,
                                errors: formik.errors.UserFirstName,
                            }}
                        />
                    </div>

                    <div className="ms-Grid-col ms-sm6 ms-xl6">
                        <TextField
                            type="text"
                            label="Last Name"
                            {...formik.getFieldProps('UserLastName')}
                            formik={{
                                touched: formik.touched.UserLastName,
                                errors: formik.errors.UserLastName,
                            }}
                        />
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

                <TextField
                    type="email"
                    label="Email"
                    {...formik.getFieldProps('UserEmail')}
                    formik={{
                        touched: formik.touched.UserEmail,
                        errors: formik.errors.UserEmail,
                    }}
                />

                <TextField
                    type="Password"
                    label="password"
                    {...formik.getFieldProps('UserPassword')}
                    formik={{
                        touched: formik.touched.UserPassword,
                        errors: formik.errors.UserPassword,
                    }}
                />

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <Text
                            style={{
                                display: 'block',
                                paddingTop: '20px',
                                textAlign: 'center',
                            }}>
                            By continuing, you agree to accept our
                        </Text>

                        <Text
                            style={{
                                display: 'block',
                                textAlign: 'center',
                            }}>
                            <Link
                                href="/privacy-policy"
                                style={{
                                    color: '#2D62ED',
                                    textAlign: 'center',
                                    letterSpacing: '0px',
                                    font: 'normal normal 600 15px/25px',
                                }}>
                                Privacy Policy
                            </Link>
                            {' & '}
                            <Link
                                href="/terms-conditions"
                                style={{
                                    color: '#2D62ED',
                                    textAlign: 'center',
                                    letterSpacing: '0px',
                                    font: 'normal normal 600 15px/25px',
                                }}>
                                Terms of Service
                            </Link>
                        </Text>
                    </div>
                </div>

                <div
                    className="ms-Grid-row"
                    style={{
                        marginTop: '50px',
                    }}>
                    <div className="ms-Grid-col ms-sm12 ms-xl12">
                        <PrimaryButton
                            type="submit"
                            text={
                                formik.isSubmitting ? (
                                    <Spinner size={SpinnerSize.xSmall} />
                                ) : (
                                    `Submit`
                                )
                            }
                            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                        />
                        {console.log('here', formik.dirty)}
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

export default Signup;
