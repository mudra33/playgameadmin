import React, { useState, useEffect } from 'react';
import jwt from 'next-auth/jwt';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Dropdown from '../../../components/Dropdown';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import { ChoiceGroup, Spinner, SpinnerSize } from '@fluentui/react';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const ViewEditFulfilment = (props) => {
    const router = useRouter();
    const companies = [];
    const [selectedCompany, setSelectedCompany] = useState({ text: '', key: '' });
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const [error, setError] = React.useState('');

    useEffect(() => {
        if (!props.data.fulfilment.data) {
            router.push('/admin/fulfilment');
        }

        if (props.data.fulfilment && props.data.fulfilment.data && props.data.fulfilment.data.CompanyName)
            setSelectedCompany({
                key: props.data.fulfilment.data.CompanyKey,
                text: props.data.fulfilment.data.CompanyName,
            });
    }, [props.data.fulfilment.data]);

    if (props.data && props.data.company.length > 0) {
        props.data.company.forEach((value) => {
            companies.push({ text: value.CompanyName, key: value.CompanyKey });
        });
    }
    const onDropdownChange = (event, item) => {
        setSelectedCompany({ text: item.text, key: item.key });
        if (!item.key) {
            setError('No Companies Found !!');
        }
    };

    const [selectedItem, setSelectedItem] = useState(false);

    const onChangeBlock = (event, item) => {
        setSelectedItem(item.key);
    };

    const UserBlockedoptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const formik = useFormik({
        initialValues: {
            UserFirstName:
                props.data.fulfilment && props.data.fulfilment.data && props.data.fulfilment.data.UserFirstName
                    ? props.data.fulfilment.data.UserFirstName
                    : '',
            UserLastName:
                props.data.fulfilment && props.data.fulfilment.data && props.data.fulfilment.data.UserLastName
                    ? props.data.fulfilment.data.UserLastName
                    : '',
            UserPhone:
                props.data.fulfilment && props.data.fulfilment.data && props.data.fulfilment.data.UserPhone
                    ? props.data.fulfilment.data.UserPhone
                    : '',
            UserEmail:
                props.data.fulfilment && props.data.fulfilment.data && props.data.fulfilment.data.UserEmail
                    ? props.data.fulfilment.data.UserEmail
                    : '',
            UserPassword: '',
            Comments:
                props.data.fulfilment && props.data.fulfilment.data && props.data.fulfilment.data.Comments
                    ? props.data.fulfilment.data.Comments
                    : '',
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
                .required('Phone Number is required')
                .min(10, 'Too short!  Minimum allowed length is 10')
                .max(10, 'Too short!  Minimum allowed length is 10'),
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
            Comments: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Comments should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(60, 'Too long! Maximum allowed length is 60'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(`/api/company-users/${props.data.fulfilment.data.UserKey}`, {
                body: JSON.stringify({
                    CompanyKey: selectedCompany.key,
                    UserFirstName: values.UserFirstName,
                    UserLastName: values.UserLastName,
                    UserPhone: values.UserPhone,
                    UserEmail: values.UserEmail,
                    UserPassword: values.UserPassword,
                    UserKey_LastUpdatedBy: props.token.UserKey,
                    UserKey_CreatedBy: props.token.UserKey,
                    UserBlocked: selectedItem,
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
                router.push('/admin/fulfilment');
            }
        },
    });

    return (
        <Layout title="View/Edit Fulfilment">
            <PageHeader
                title="Fulfilment Accounts"
                button={{ text: 'Add new Fulfilment Account', link: '/admin/fulfilment/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Fulfilment', key: 'Fulfilment', href: '/admin/fulfilment' },
                    {
                        text: 'Edit Fulfilment',
                        key: 'addfulfilment',
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
                        <Dropdown
                            label="Company Name"
                            options={companies}
                            selectedKey={selectedCompany.key}
                            onChange={onDropdownChange}
                            errorMessage={error}
                        />

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

                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                    <TextField
                                        type="tel"
                                        label="User Phone"
                                        minLength="9"
                                        maxLength="10"
                                        {...formik.getFieldProps('UserPhone')}
                                        formik={{
                                            touched: formik.touched.UserPhone,
                                            errors: formik.errors.UserPhone,
                                        }}
                                    />
                                </div>

                                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                    <TextField
                                        type="email"
                                        label="Email"
                                        {...formik.getFieldProps('UserEmail')}
                                        formik={{
                                            touched: formik.touched.UserEmail,
                                            errors: formik.errors.UserEmail,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <TextField
                            type="text"
                            label="Comments"
                            {...formik.getFieldProps('Comments')}
                            formik={{
                                touched: formik.touched.Comments,
                                errors: formik.errors.Comments,
                            }}
                        />
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

                        <ChoiceGroup
                            label="Account Blocked"
                            onChange={onChangeBlock}
                            options={UserBlockedoptions}
                            optionsContainIconOrImage={false}
                            defaultSelectedKey={
                                props.data.fulfilment &&
                                props.data.fulfilment.data &&
                                props.data.fulfilment.data.UserBlocked
                                    ? props.data.fulfilment.data.UserBlocked
                                    : 0
                            }
                        />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <PrimaryButton
                                    type="submit"
                                    text={
                                        formik.isSubmitting ? (
                                            <Spinner size={SpinnerSize.xSmall} />
                                        ) : (
                                            'Update Fulfilment Account'
                                        )
                                    }
                                    disabled={!formik.isValid || formik.isSubmitting}
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
    const { FulfilmentKey } = context.query;
    const res = await fetch(`/api/company-users/${FulfilmentKey}`);
    const fulfilment = await res.json();

    const token = await jwt.getToken({
        req: context.req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });

    let company = await fetch(`/api/company`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    company = await company.json();

    return { props: { token, data: { company: company.data, fulfilment } } };
}

ViewEditFulfilment.propTypes = {
    token: PropTypes.any,
    data: PropTypes.array,
};

export default ViewEditFulfilment;
