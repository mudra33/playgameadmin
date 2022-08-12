import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Post';
import TextField from '../../components/TextField';
import React, { useState, useEffect } from 'react';
import MessageBar from '../../components/MessageBar';
import PageHeader from '../../components/PageHeader';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { ChoiceGroup, Spinner, SpinnerSize } from '@fluentui/react';

const ViewEditAdmin = (props) => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const [selectedUserBlocked, setSelectedUserBlocked] = React.useState(0);
    const [selectedForcePasswordChange, setSelectedForcePasswordChange] = React.useState(0);

    useEffect(() => {
        if (!props.admin.data || props.admin.data.UserKey === props.token.UserKey) {
            router.push('/admin/list');
        }
    });

    const options = [
        { key: 1, text: 'Yes' },
        { key: null, text: 'No' },
    ];

    const UserBlockedoptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const formik = useFormik({
        initialValues: {
            UserFirstName:
                props.admin.data && props.admin.data.UserFirstName
                    ? props.admin.data.UserFirstName
                    : '',
            UserLastName:
                props.admin.data && props.admin.data.UserLastName
                    ? props.admin.data.UserLastName
                    : '',
            UserPhone:
                props.admin.data && props.admin.data.UserPhone ? props.admin.data.UserPhone : '',
            UserPassword: '',
        },
        validationSchema: Yup.object({
            UserFirstName: Yup.string()
                .trim()
                .required('First Name is required')
                .matches(/^[A-Za-z ]*$/, 'First Name should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
            UserLastName: Yup.string()
                .trim()
                .required('Last Name is required')
                .matches(/^[A-Za-z ]*$/, 'Last Name should only contain Characters')
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
                .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Use 8 or more characters with a mix of letters, numbers & symbols'
                ),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(
                `/api/users/UserKey/${props.admin.data.UserKey}`,
                {
                    body: JSON.stringify({
                        UserFirstName: values.UserFirstName,
                        UserLastName: values.UserLastName,
                        UserPhone: values.UserPhone,
                        UserPassword: values.UserPassword,
                        ForcePasswordChange: selectedForcePasswordChange,
                        UserBlocked: selectedUserBlocked,
                        UserKey_LastUpdatedBy: props.token.UserKey,
                        UserKey_CreatedBy: props.token.UserKey,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PATCH',
                }
            );
            const result = await res.json();
            if (res.ok && result) {
                setNotification({ message: result.message, messageBarType: 4 });
                resetForm();
                router.push('/admin/list');
            }
        },
    });

    return (
        <Layout title="Edit Admin">
            <PageHeader
                title="Edit Admin"
                button={{ text: 'Add New Admin', link: '/admin/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Admin', key: 'admin', href: '/admin/list' },
                    {
                        text: 'Edit Admin',
                        key: 'editadmin',
                        isCurrentItem: true,
                    },
                ]}
            />

            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg5">
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

                        <form onSubmit={formik.handleSubmit}>
                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
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

                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
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
                            </div>

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

                            <ChoiceGroup
                                options={options}
                                defaultSelectedKey={
                                    props.admin.data && props.admin.data.ForcePasswordChange
                                        ? props.admin.data.ForcePasswordChange
                                        : ''
                                }
                                label="Force Password Change:"
                                optionsContainIconOrImage={false}
                                onChange={(event, item) => {
                                    setSelectedForcePasswordChange(item.key);
                                }}
                            />

                            <TextField
                                type="password"
                                canRevealPassword
                                label="Initial Password"
                                {...formik.getFieldProps('UserPassword')}
                                revealPasswordAriaLabel="Show User Password"
                                formik={{
                                    touched: formik.touched.UserPassword,
                                    errors: formik.errors.UserPassword,
                                }}
                            />

                            <ChoiceGroup
                                options={UserBlockedoptions}
                                defaultSelectedKey={
                                    props.admin.data && props.admin.data.UserBlocked
                                        ? props.admin.data.UserBlocked
                                        : ''
                                }
                                label="Admin Blocked:"
                                optionsContainIconOrImage={false}
                                onChange={(event, item) => {
                                    setSelectedUserBlocked(item.key);
                                }}
                            />

                            <br />

                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm12">
                                    <PrimaryButton
                                        type="submit"
                                        text={
                                            formik.isSubmitting ? (
                                                <Spinner size={SpinnerSize.xSmall} />
                                            ) : (
                                                'Update Admin'
                                            )
                                        }
                                        disabled={!formik.isValid || formik.isSubmitting}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { UserKey } = context.query;

    const res = await fetch(
        `/api/users/UserKey/${UserKey}?UserRole=Admin`
    );
    const admin = await res.json();
    const token = await jwt.getToken({
        req: context.req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });

    return { props: { admin, token } };
}

ViewEditAdmin.propTypes = {
    admin: PropTypes.any,
    token: PropTypes.any,
};

export default ViewEditAdmin;
