import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import MessageBar from '../../../components/MessageBar';
import PageHeader from '../../../components/PageHeader';
import { Spinner, SpinnerSize } from '@fluentui/react';
import Text from '../../../components/Text';
import Label from '../../../components/Label';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const AddManager = (props) => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const [session] = useSession();

    const formik = useFormik({
        initialValues: {
            UserFirstName: '',
            UserLastName: '',
            UserPhone: '',
            UserEmail: '',
            UserPassword: '',
        },
        validationSchema: Yup.object({
            UserFirstName: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'First Name should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('First Name is required'),
            UserLastName: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'First Name should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Last Name is required'),
            UserPhone: Yup.string()
                .trim()
                .matches(/^[0-9]+$/, 'User Phone must be a numeric')
                .min(10, 'Too short! Minimum allowed length is 10')
                .max(10, 'Too short! Minimum allowed length is 10')
                .required('User Phone is required'),
            UserEmail: Yup.string()
                .trim()
                .matches(
                    /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                    'Enter a Valid Email'
                )
                .required('User Email is required'),
            UserPassword: Yup.string()
                .trim()
                .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Use 8 or more characters with a mix of letters, numbers & symbols'
                )
                .required('User Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const user = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
                body: JSON.stringify({
                    UserPhone: values.UserPhone,
                    UserEmail: values.UserEmail,
                }),

                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const { data } = await user.json();

            if (data && data.UserKey) {
                setNotification({
                    message: `Account already exists with ${values.UserPhone} or  ${values.UserEmail}`,
                    messageBarType: 1,
                });
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/store-users`, {
                body: JSON.stringify({
                    StoreKey: session.user.StoreKey,
                    UserFirstName: values.UserFirstName,
                    UserLastName: values.UserLastName,
                    UserPhone: values.UserPhone,
                    UserEmail: values.UserEmail,
                    UserRole: 'Manager',
                    UserPassword: values.UserPassword,
                    UserKey_LastUpdatedBy: props.token.UserKey,
                    UserKey_CreatedBy: props.token.UserKey,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const result = await res.json();
            if (res.ok && result) {
                resetForm();
                setNotification({ message: result.message, messageBarType: 4 });
                router.push('/owner/manager');
            }
        },
    });

    return (
        <Layout title="Add new Manager">
            <PageHeader
                title="Add Manager"
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/owner/home' },
                    { text: 'Manager', key: 'manager', href: '/owner/manager' },
                    {
                        text: 'Add new Manager',
                        key: 'add-manager',
                        isCurrentItem: true,
                    },
                ]}
            />

            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg5">
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Managers Have Full Access To Store Screens</h2>

                        {notification.message.length > 0 ? (
                            <MessageBar
                                message={notification.message}
                                messageBarType={notification.messageBarType}
                                onDismiss={() =>
                                    setNotification({ message: '', messageBarType: null })
                                }
                            />
                        ) : (
                            ''
                        )}

                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingLeft: '15px',
                                    }}>
                                    <Label>Store Name:&nbsp;</Label>
                                    <Text>
                                        {session && session.user && session.user.StoreName
                                            ? session.user.StoreName
                                            : 'No Store Name Found'}
                                    </Text>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingLeft: '15px',
                                    }}>
                                    <Label>Store Id:&nbsp;</Label>
                                    <Text>
                                        {session && session.user && session.user.StoreKey
                                            ? session.user.StoreKey
                                            : 'No Store Key Found'}
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6">
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

                                <div className="ms-Grid-col ms-sm6">
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

                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6">
                                    <TextField
                                        type="tel"
                                        label="Mobile"
                                        minLength="9"
                                        maxLength="10"
                                        {...formik.getFieldProps('UserPhone')}
                                        formik={{
                                            touched: formik.touched.UserPhone,
                                            errors: formik.errors.UserPhone,
                                        }}
                                    />
                                </div>

                                <div className="ms-Grid-col ms-sm6">
                                    <TextField
                                        type="email"
                                        label="User Email"
                                        {...formik.getFieldProps('UserEmail')}
                                        formik={{
                                            touched: formik.touched.UserEmail,
                                            errors: formik.errors.UserEmail,
                                        }}
                                    />
                                </div>
                            </div>

                            <TextField
                                type="password"
                                label="Password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show Password"
                                {...formik.getFieldProps('UserPassword')}
                                formik={{
                                    touched: formik.touched.UserPassword,
                                    errors: formik.errors.UserPassword,
                                }}
                            />
                        </div>

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <PrimaryButton
                                    type="submit"
                                    text={
                                        formik.isSubmitting ? (
                                            <Spinner size={SpinnerSize.xSmall} />
                                        ) : (
                                            'Submit'
                                        )
                                    }
                                    disabled={
                                        !(formik.isValid && formik.dirty) || formik.isSubmitting
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps({ req }) {
    const token = await jwt.getToken({
        req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });
    let store = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/store`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    store = await store.json();
    return {
        props: {
            token,
            store,
        },
    };
}

AddManager.propTypes = {
    token: PropTypes.any,
    store: PropTypes.any,
};

export default AddManager;
