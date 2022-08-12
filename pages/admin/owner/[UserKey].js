import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Dropdown from '../../../components/Dropdown';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import { ChoiceGroup, Spinner, SpinnerSize } from '@fluentui/react';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const EditOwnerManager = (props) => {
    const router = useRouter();
    const Stores = [];
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    if (props.store && props.store.length > 0)
        props.store.map((store) => {
            Stores.push({ text: store.StoreName, key: store.StoreKey });
        });

    const [selectedStore, setSelectedStore] = React.useState({ text: '', key: '' });
    const [selectedUserBlocked, setSelectedUserBlocked] = React.useState(0);
    const [selectedForcePasswordChange, setSelectedForcePasswordChange] = React.useState(0);

    const onDropdownChange = (event, item) => {
        setSelectedStore({ text: item.text, key: item.key });
    };

    React.useEffect(() => {
        if (!props.owner.data) {
            router.push('/admin/owner');
        }

        if (props.owner.data)
            setSelectedStore({
                key: props.owner.data.StoreKey,
                text: props.owner.data.StoreName,
            });
    }, [props.owner.data]);

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
                props.owner.data && props.owner.data.UserFirstName
                    ? props.owner.data.UserFirstName
                    : '',
            UserLastName:
                props.owner.data && props.owner.data.UserLastName
                    ? props.owner.data.UserLastName
                    : '',
            UserPhone:
                props.owner.data && props.owner.data.UserPhone ? props.owner.data.UserPhone : '',
            UserEmail:
                props.owner.data && props.owner.data.UserEmail ? props.owner.data.UserEmail : '',
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
                `/api/users/UserKey/${props.owner.data.UserKey}`,
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
                router.push('/admin/owner');
            }
        },
    });

    return (
        <Layout title="View Owner/Manager">
            <PageHeader
                title="Owners"
                button={{ text: 'Add new Owner', link: '/admin/owner/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Owner', key: 'owner', href: '/admin/owner' },
                    {
                        text: 'Edit Owner/Manager',
                        key: 'addowner',
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

                    <form onSubmit={formik.handleSubmit}>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6">
                                    <Dropdown
                                        label="Store Name"
                                        options={Stores}
                                        onChange={onDropdownChange}
                                        selectedKey={selectedStore.key}
                                    />
                                </div>

                                <div className="ms-Grid-col ms-sm6"></div>
                            </div>
                        </div>

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
                                    props.owner.data ? props.owner.data.ForcePasswordChange : ''
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
                                    props.owner.data ? props.owner.data.UserBlocked : ''
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
                                            'Edit Owner'
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
    const res = await fetch(
        `/api/store-users/${UserKey}?UserRole=Owner`
    );
    const owner = await res.json();

    const token = await jwt.getToken({
        req: context.req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });
    let store = await fetch(`/api/store`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    store = await store.json();

    return { props: { owner, token, store: store.data } };
}

EditOwnerManager.propTypes = {
    owner: PropTypes.any,
    token: PropTypes.any,
    store: PropTypes.any,
};

export default EditOwnerManager;
