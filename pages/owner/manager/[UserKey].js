import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import Text from '../../../components/Text';
import Label from '../../../components/Label';
import { ChoiceGroup, Spinner, SpinnerSize } from '@fluentui/react';

const EditManager = (props) => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const [selectedUserBlocked, setSelectedUserBlocked] = React.useState(0);
    const [selectedForcePasswordChange, setSelectedForcePasswordChange] = React.useState(0);

    React.useEffect(() => {
        if (!props.StoreManager.data) {
            router.push('/owner/manager');
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
                props.StoreManager.data && props.StoreManager.data.UserFirstName
                    ? props.StoreManager.data.UserFirstName
                    : '',
            UserLastName:
                props.StoreManager.data && props.StoreManager.data.UserLastName
                    ? props.StoreManager.data.UserLastName
                    : '',
            UserPhone:
                props.StoreManager.data && props.StoreManager.data.UserPhone
                    ? props.StoreManager.data.UserPhone
                    : '',
            UserEmail:
                props.StoreManager.data && props.StoreManager.data.UserEmail
                    ? props.StoreManager.data.UserEmail
                    : '',
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
                .matches(/^[A-Za-z ]*$/, 'Last Name should only contain Characters')
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
                ),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(
                `/api/users/UserKey/${props.StoreManager.data.UserKey}`,
                {
                    body: JSON.stringify({
                        UserFirstName: values.UserFirstName,
                        UserLastName: values.UserLastName,
                        UserPhone: values.UserPhone,
                        UserEmail: values.UserEmail,
                        UserPassword: values.UserPassword,
                        UserKey_LastUpdatedBy: props.token.UserKey,
                        UserKey_CreatedBy: props.token.UserKey,
                        UserBlocked: selectedUserBlocked,
                        ForcePasswordChange: selectedForcePasswordChange,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PATCH',
                }
            );
            const result = await res.json();
            if (res.ok && result) {
                resetForm();
                setNotification({ message: result.message, messageBarType: 4 });
                router.push('/owner/manager');
            }
        },
    });

    return (
        <Layout title="View Manager">
            <PageHeader
                title="Managers"
                button={{ text: 'Add new Manager', link: '/owner/manager/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/owner/home' },
                    { text: 'Manager', key: 'manager', href: '/owner/manager' },
                    {
                        text: 'Edit Manager',
                        key: 'edit-manager',
                        isCurrentItem: true,
                    },
                ]}
            />

            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg5">
                    {notification.message.length > 0 ? (
                        <MessageBar
                            message={notification.message}
                            messageBarType={notification.messageBarType}
                            onDismiss={() => setNotification({ message: '', messageBarType: null })}
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
                                    {props.session &&
                                    props.session.user &&
                                    props.session.user.StoreName
                                        ? props.session.user.StoreName
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
                                    {props.session &&
                                    props.session.user &&
                                    props.session.user.StoreKey
                                        ? props.session.user.StoreKey
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
                                        minLength="9"
                                        maxLength="10"
                                        label="User Phone"
                                        {...formik.getFieldProps('UserPhone')}
                                        formik={{
                                            touched: formik.touched.UserPhone,
                                            errors: formik.errors.UserPhone,
                                        }}
                                    />
                                </div>

                                <div className="ms-Grid-col ms-sm6">
                                    <TextField
                                        label="User Email"
                                        {...formik.getFieldProps('UserEmail')}
                                        formik={{
                                            touched: formik.touched.UserEmail,
                                            errors: formik.errors.UserEmail,
                                        }}
                                    />
                                </div>
                            </div>

                            <ChoiceGroup
                                options={options}
                                label="Force Password Change"
                                optionsContainIconOrImage={false}
                                onChange={(event, item) => {
                                    setSelectedForcePasswordChange(item.key);
                                }}
                                defaultSelectedKey={
                                    props.StoreManager.data
                                        ? props.StoreManager.data.ForcePasswordChange
                                        : ''
                                }
                            />

                            <TextField
                                type="password"
                                canRevealPassword
                                label="Initial Password"
                                revealPasswordAriaLabel="Show password"
                                {...formik.getFieldProps('UserPassword')}
                                formik={{
                                    touched: formik.touched.UserPassword,
                                    errors: formik.errors.UserPassword,
                                }}
                            />

                            <ChoiceGroup
                                label="Account Blocked"
                                options={UserBlockedoptions}
                                optionsContainIconOrImage={false}
                                onChange={(event, item) => {
                                    setSelectedUserBlocked(item.key);
                                }}
                                defaultSelectedKey={
                                    props.StoreManager.data
                                        ? props.StoreManager.data.UserBlocked
                                        : ''
                                }
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
                                            'Update Manager'
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

export async function getServerSideProps(context) {
    const { UserKey } = context.query;
    const session = await getSession(context);
    const res = await fetch(
        `/api/store-users/${UserKey}?UserRole=Manager`
    );
    const StoreManager = await res.json();

    const token = await jwt.getToken({
        req: context.req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });

    return { props: { StoreManager, token, session } };
}

EditManager.propTypes = {
    StoreManager: PropTypes.any,
    token: PropTypes.any,
    store: PropTypes.any,
    session: PropTypes.any,
};

export default EditManager;
