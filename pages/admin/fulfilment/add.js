import React, { useState } from 'react';
import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import MessageBar from '../../../components/MessageBar';
import PageHeader from '../../../components/PageHeader';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import DefaultButton from '../../../components/Button/DefaultButton';
import ComboBox from '../../../components/ComboBox';
import { Spinner, SpinnerSize } from '@fluentui/react';

const AddFulfilment = (props) => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState('');
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');

    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const companies = [];

    if (props.data && props.data.length > 0)
        props.data.map((company) => {
            companies.push({ text: company.CompanyName, key: company.CompanyName });
        });

    const [options, setOptions] = useState(companies);

    function validate(string) {
        const format = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]+/;
        return format.test(string) ? false : true;
    }

    const onChange = (event, option, index, value) => {
        if (validate(value)) {
            if (!option && value) {
                option = { key: value, text: value };
                setOptions((prevOptions) => [...prevOptions, option]);
            }
            if (option || value) {
                setError('');
                setValidationError('');
                setSelectedKeys(option.text);
            } else {
                setError('Company Name Is Required');
                setValidationError('');
            }
        } else {
            setValidationError('Enter a Valid Company Name');
        }
    };

    const formik = useFormik({
        initialValues: {
            UserFirstName: '',
            UserLastName: '',
            UserPhone: '',
            UserEmail: '',
            UserPassword: '',
            Comments: '',
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
                .required('User Phone Number is required')
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
                .required('User Password is required')
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
            if (!selectedKeys) {
                setError('No Company Name Found');
            } else {
                const user = await fetch(`/api/users`, {
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
                        message: `Account already exists with ${values.UserPhone} or ${values.UserEmail}`,
                        messageBarType: 1,
                    });
                    return;
                }

                const res = await fetch(`/api/fulfillment`, {
                    body: JSON.stringify({
                        CompanyNames: selectedKeys,
                        UserFirstName: values.UserFirstName,
                        UserLastName: values.UserLastName,
                        UserPhone: values.UserPhone,
                        UserEmail: values.UserEmail,
                        UserRole: 'Fulfilment',
                        UserPassword: values.UserPassword,
                        Comments: values.Comments,
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
                    router.push('/admin/fulfilment');
                }
            }
        },
    });

    return (
        <Layout title="Add Fulfilment Account">
            <PageHeader
                title="Fulfilment Accounts"
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Fulfilment', key: 'fulfilment', href: '/admin/fulfilment' },
                    {
                        text: 'Add new Fulfilment',
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
                        <ComboBox
                            options={options}
                            onChange={onChange}
                            label="Company Name:"
                            errorMessage={error || validationError}
                            selectedKey={selectedKeys}
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
                                        errorMessage={
                                            formik.touched.UserLastName &&
                                            formik.errors.UserLastName
                                                ? formik.errors.UserLastName
                                                : null
                                        }
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

                        <TextField
                            type="text"
                            label="Comments"
                            {...formik.getFieldProps('Comments')}
                            formik={{
                                touched: formik.touched.Comments,
                                errors: formik.errors.Comments,
                            }}
                        />

                        <br />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <DefaultButton text="Reset" onClick={() => formik.resetForm()} />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
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

    let company = await fetch(`/api/company`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    company = await company.json();

    return {
        props: {
            token,
            data: company.data,
        },
    };
}

AddFulfilment.propTypes = {
    token: PropTypes.any,
    data: PropTypes.any,
};

export default AddFulfilment;
