import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import Text from '../../../components/Text';
import Label from '../../../components/Label';
import { Spinner, SpinnerSize } from '@fluentui/react';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const AddCashier = (props) => {
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
            UserPassword: '',
        },
        validationSchema: Yup.object({
            UserFirstName: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'First Name should only contain Characters')
                .required('First Name is required')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
            UserLastName: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Last Name should only contain Characters')
                .required('Last Name is required')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
            UserPhone: Yup.string()
                .trim()
                .required('Phone Number is required')
                .matches(/^[0-9]+$/, 'Phone number must be a numeric')
                .min(10, 'Too short! Minimum allowed length is 10')
                .max(10, 'Too short! Minimum allowed length is 10'),
            UserPassword: Yup.string()
                .trim()
                .required('Password is required')
                .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Use 8 or more characters with a mix of letters, numbers & symbols'
                ),
        }),
        onSubmit: async (values, { resetForm }) => {
            const user = await fetch(`/api/store-users`, {
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
                    message: `Account already exists with ${values.UserPhone} `,
                    messageBarType: 1,
                });
                return;
            }

            const res = await fetch(`/api/store-users`, {
                body: JSON.stringify({
                    StoreKey: session.user.StoreKey,
                    UserRole: 'Cashier',
                    UserFirstName: values.UserFirstName,
                    UserLastName: values.UserLastName,
                    UserPhone: values.UserPhone,
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

            if (res.ok && result && result.data) {
                resetForm();
                setNotification({ message: result.message, messageBarType: 4 });
                router.push('/owner/cashier/list');
            }
        },
    });

    return (
        <Layout title="Add Cashier">
            <PageHeader
                title="Cashier"
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/owner/home' },
                    { text: 'Cashier', key: 'cashier', href: '/owner/Cashier/list' },
                    {
                        text: 'Add new Cashier',
                        key: 'addCashier',
                        isCurrentItem: true,
                    },
                ]}
            />

            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg5">
                        {notification.message && notification.message.length > 0 ? (
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

                        <form onSubmit={formik.handleSubmit}>
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
                                            label="Login"
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
                                    </div>
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
                                                !(formik.isValid && formik.dirty) ||
                                                formik.isSubmitting
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps({ req }) {
    const data = await jwt.getToken({
        req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });
    return {
        props: {
            token: data,
        },
    };
}

AddCashier.propTypes = {
    token: PropTypes.any,
};

export default AddCashier;
