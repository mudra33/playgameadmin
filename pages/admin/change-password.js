import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Layout from '../../components/Layout/Post';
import { getSession } from 'next-auth/client';
import PropTypes from 'prop-types';
import TextField from '../../components/TextField';
import { Spinner, SpinnerSize } from '@fluentui/react';
import MessageBar from '../../components/MessageBar';
import PageHeader from '../../components/PageHeader';
import PrimaryButton from '../../components/Button/PrimaryButton';

const ChangePassword = (props) => {
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const formik = useFormik({
        initialValues: {
            UserPassword: '',
            NewUserPassword: '',
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
            NewUserPassword: Yup.string()
                .trim()
                .required('New Password is required')
                .notOneOf(
                    [Yup.ref('UserPassword'), null],
                    'Old Password Is Incorrect or New Password is Equal to Old Password'
                )
                .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Use 8 or more characters with a mix of letters, numbers & symbols'
                ),
            ConfirmUserPassword: Yup.string()
                .trim()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('NewUserPassword'), null], 'Passwords must match'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(`/api/users/UserKey/change-password`, {
                body: JSON.stringify({
                    UserKey: props.session.user.UserKey,
                    UserPassword: values.NewUserPassword,
                    NewUserPassword: values.NewUserPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
            });
            const result = await res.json();

            if (res.ok && result) {
                resetForm();
                setNotification({ message: result.message, messageBarType: 4 });
            }
            setNotification({ message: result.message, messageBarType: 1 });
        },
    });

    return (
        <Layout title="Change Password">
            <PageHeader title="Change Password" breadcrumb={[{ text: 'Home', key: 'home', href: '/admin/home' }]} />
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg5">
                        {notification.message && notification.message.length > 0 ? (
                            <MessageBar
                                message={notification.message}
                                messageBarType={notification.messageBarType}
                                onDismiss={() => setNotification({ message: '', messageBarType: null })}
                            />
                        ) : (
                            ''
                        )}
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                type="password"
                                canRevealPassword
                                label="Initial Password"
                                revealPasswordAriaLabel="Show UserPassword"
                                {...formik.getFieldProps('UserPassword')}
                                formik={{
                                    touched: formik.touched.UserPassword,
                                    errors: formik.errors.UserPassword,
                                }}
                            />

                            <TextField
                                type="password"
                                canRevealPassword
                                label="New Password"
                                revealPasswordAriaLabel="Show NewUserPassword"
                                {...formik.getFieldProps('NewUserPassword')}
                                formik={{
                                    touched: formik.touched.NewUserPassword,
                                    errors: formik.errors.NewUserPassword,
                                }}
                            />

                            <TextField
                                type="password"
                                canRevealPassword
                                label="Confirm Password"
                                revealPasswordAriaLabel="Show ConfirmUserPassword"
                                {...formik.getFieldProps('ConfirmUserPassword')}
                                formik={{
                                    touched: formik.touched.ConfirmUserPassword,
                                    errors: formik.errors.ConfirmUserPassword,
                                }}
                            />

                            <PrimaryButton
                                type="submit"
                                text={formik.isSubmitting ? <Spinner size={SpinnerSize.xSmall} /> : `Change Password`}
                                disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}

ChangePassword.propTypes = {
    session: PropTypes.any,
};

export default ChangePassword;
