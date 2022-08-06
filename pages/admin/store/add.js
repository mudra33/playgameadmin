import React, { useState } from 'react';
import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Dropdown from '../../../components/Dropdown';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import { Stack, Spinner, SpinnerSize } from '@fluentui/react';
import Checkbox from '../../../components/CheckBox';
import Label from '../../../components/Label';

const NewStore = (props) => {
    const router = useRouter();
    const [error, setError] = React.useState('');
    const stackTokens = { childrenGap: 10 };
    const PercentagePlanName = [];
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const [storePercentagePlan, setStorePercentagePlan] = React.useState();

    const onDropdownPercentagePlan = (event, item) => {
        setStorePercentagePlan(item.key);
    };

    if (props.data.percentagePlan && props.data.percentagePlan.length > 0)
        props.data.percentagePlan.map((percentagePlan) => {
            PercentagePlanName.push({
                text: percentagePlan.PercentagePlanName,
                key: percentagePlan.PercentagePlanKey,
            });
        });

    const stackItemStyles = {
        root: {
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '20px',
            justifyContent: 'space-between',
        },
    };

    const _onChange = (event, isChecked) => {
        if (isChecked) {
            formik.values.Sweepstakes.push(parseInt(event.target.name));
        } else {
            formik.values.Sweepstakes = formik.values.Sweepstakes.filter(
                (value) => value != parseInt(event.target.name)
            );
        }
    };

    const formik = useFormik({
        initialValues: {
            StoreName: '',
            StoreAddress1: '',
            StoreAddress2: '',
            StoreCity: '',
            StorePhone: '',
            StoreState: '',
            StoreZip: '',
            MailingAddress1: '',
            MailingAddress2: '',
            MailingCity: '',
            MailingState: '',
            MailingZip: '',
            Comments: '',
            Salesperson: '',
            Sweepstakes: [],
            SalespersonPercentage: '',
        },
        validationSchema: Yup.object({
            StoreName: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Store Name should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Store Name is required'),
            StoreAddress1: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Store Address1 should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Store Address 1 is required'),
            StoreAddress2: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Store Address2 should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Store Address 2 is required'),
            StoreCity: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Store City should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(20, 'Too long! Maximum allowed length is 20')
                .required('Store City Is required'),
            StorePhone: Yup.string('Store Phone is required')
                .trim()
                .matches(/^[0-9]+$/, 'Store Phone must be a numeric')
                .min(10, 'Too short!  Minimum allowed length is 10')
                .max(10, 'Too short!  Minimum allowed length is 10')
                .required('Store Phone is required'),
            StoreState: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Store State should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(20, 'Too long! Maximum allowed length is 20')
                .required('Store State is required'),
            StoreZip: Yup.string()
                .trim()
                .matches(/^[0-9]+$/, 'Store Zip must be a numeric')
                .min(6, 'Too short! Allowed length is 6')
                .max(6, 'Too long! Allowed length is 6')
                .required('Store Zip Is required'),
            MailingAddress1: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing Address1 should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Mailing Address 1 is required'),
            MailingAddress2: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing Address2 should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Mailing Address 2 is required'),
            MailingCity: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing City should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(20, 'Too long! Maximum allowed length is 20')
                .required('Mailing City Is required'),
            MailingState: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing State should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Mailing State Is required'),
            MailingZip: Yup.string()
                .trim()
                .matches(/^[0-9]+$/, 'Mailing Zip must be a numeric')
                .min(6, 'Too short! Allowed length is 6')
                .max(6, 'Too long! Allowed length is 6')
                .required('Mailing Zip Is required'),
            Comments: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Comments should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(40, 'Too long! Maximum allowed length is 40'),
            Salesperson: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Salesperson should only contain Characters')
                .min(2, 'Too short! Minimum allowed length is 2')
                .max(20, 'Too long! Maximum allowed length is 20')
                .required('Salesperson  is required'),
            SalespersonPercentage: Yup.string()
                .trim()
                .matches(
                    /(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/,
                    'Salesperson Percenage should be valid Percentage Value'
                )
                .required('Salesperson Percentage is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (values.Sweepstakes && values.Sweepstakes.length < 1) {
                setError('No Sweepstake Found');
            } else {
                setError('');
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/store`, {
                body: JSON.stringify({
                    StoreName: values.StoreName,
                    StorePhone: values.StorePhone,
                    StoreAddress1: values.StoreAddress1,
                    StoreAddress2: values.StoreAddress2,
                    StoreCity: values.StoreCity,
                    StoreState: values.StoreState,
                    StoreZip: values.StoreZip,
                    PercentagePlanKey: storePercentagePlan,
                    MailingAddress1: values.MailingAddress1,
                    MailingAddress2: values.MailingAddress2,
                    MailingCity: values.MailingCity,
                    MailingState: values.MailingState,
                    MailingZip: values.MailingZip,
                    Comments: values.Comments,
                    Salesperson: values.Salesperson,
                    Sweepstakes: values.Sweepstakes,
                    UserKey_LastUpdatedBy: props.token.UserKey,
                    UserKey_CreatedBy: props.token.UserKey,
                    SalespersonPercentage: values.SalespersonPercentage,
                }),

                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const result = await res.json();
            if (res.ok && result) {
                resetForm();
                router.push('/admin/store');
            }
        },
    });

    return (
        <Layout title="Add Store">
            <PageHeader
                title="Stores"
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Store', key: 'store', href: '/admin/store' },
                    {
                        text: 'Add Store',
                        key: 'add-store',
                        isCurrentItem: true,
                    },
                ]}
            />

            <form className="ms-Grid" dir="ltr" onSubmit={formik.handleSubmit}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm5">
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
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm5">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Store Name"
                                    {...formik.getFieldProps('StoreName')}
                                    formik={{
                                        touched: formik.touched.StoreName,
                                        errors: formik.errors.StoreName,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="tel"
                                    minLength="9"
                                    maxLength="10"
                                    label="Store Phone"
                                    {...formik.getFieldProps('StorePhone')}
                                    formik={{
                                        touched: formik.touched.StorePhone,
                                        errors: formik.errors.StorePhone,
                                    }}
                                />
                            </div>
                        </div>

                        <TextField
                            type="text"
                            label="Contact Comments"
                            {...formik.getFieldProps('Comments')}
                            formik={{
                                touched: formik.touched.Comments,
                                errors: formik.errors.Comments,
                            }}
                        />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <Dropdown
                                    errorMessage={error}
                                    label="Percentage Plan"
                                    options={PercentagePlanName}
                                    onChange={onDropdownPercentagePlan}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6"></div>
                        </div>

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Salesperson:"
                                    {...formik.getFieldProps('Salesperson')}
                                    formik={{
                                        touched: formik.touched.Salesperson,
                                        errors: formik.errors.Salesperson,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm8">
                                <TextField
                                    type="text"
                                    label="Salesperson Percentage"
                                    {...formik.getFieldProps('SalespersonPercentage')}
                                    formik={{
                                        touched: formik.touched.SalespersonPercentage,
                                        errors: formik.errors.SalespersonPercentage,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="ms-Grid-col ms-sm5">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Store Address 1"
                                    {...formik.getFieldProps('StoreAddress1')}
                                    formik={{
                                        touched: formik.touched.StoreAddress1,
                                        errors: formik.errors.StoreAddress1,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Store Address 2"
                                    {...formik.getFieldProps('StoreAddress2')}
                                    formik={{
                                        touched: formik.touched.StoreAddress2,
                                        errors: formik.errors.StoreAddress2,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Store City"
                                    {...formik.getFieldProps('StoreCity')}
                                    formik={{
                                        touched: formik.touched.StoreCity,
                                        errors: formik.errors.StoreCity,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Store State"
                                    {...formik.getFieldProps('StoreState')}
                                    formik={{
                                        touched: formik.touched.StoreState,
                                        errors: formik.errors.StoreState,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Store Zip"
                                    {...formik.getFieldProps('StoreZip')}
                                    formik={{
                                        touched: formik.touched.StoreZip,
                                        errors: formik.errors.StoreZip,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Mailing Address 1"
                                    {...formik.getFieldProps('MailingAddress1')}
                                    formik={{
                                        touched: formik.touched.MailingAddress1,
                                        errors: formik.errors.MailingAddress1,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Mailing Address 2"
                                    {...formik.getFieldProps('MailingAddress2')}
                                    formik={{
                                        touched: formik.touched.MailingAddress2,
                                        errors: formik.errors.MailingAddress2,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Mailing City"
                                    {...formik.getFieldProps('MailingCity')}
                                    formik={{
                                        touched: formik.touched.MailingCity,
                                        errors: formik.errors.MailingCity,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Mailing State"
                                    {...formik.getFieldProps('MailingState')}
                                    formik={{
                                        touched: formik.touched.MailingState,
                                        errors: formik.errors.MailingState,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm4">
                                <TextField
                                    type="text"
                                    label="Mailing Zip"
                                    {...formik.getFieldProps('MailingZip')}
                                    formik={{
                                        touched: formik.touched.MailingZip,
                                        errors: formik.errors.MailingZip,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm10">
                        <Label>Sweepstakes:</Label>
                        {error}
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm10">
                                <Stack
                                    wrap
                                    horizontal
                                    styles={stackItemStyles}
                                    tokens={stackTokens}>
                                    {props.data.sweepstakes < 1
                                        ? ''
                                        : props.data.sweepstakes.map((sweepstakes) => {
                                              return (
                                                  <Checkbox
                                                      grow={3}
                                                      key={sweepstakes.SweepstakesKey}
                                                      name={sweepstakes.SweepstakesKey}
                                                      label={sweepstakes.SweepstakesName}
                                                      onChange={_onChange}
                                                  />
                                              );
                                          })}
                                </Stack>
                            </div>
                        </div>
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
                                !formik.isValid || props.data.sweepstakes < 1 || formik.isSubmitting
                            }
                        />
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export async function getServerSideProps({ req }) {
    const token = await jwt.getToken({
        req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });
    let sweepstakes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sweepstakes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    sweepstakes = await sweepstakes.json();
    let percentagePlan = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/percentage-plan`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    percentagePlan = await percentagePlan.json();

    return {
        props: {
            token,
            data: {
                sweepstakes: sweepstakes.data,
                percentagePlan: percentagePlan.data,
            },
        },
    };
}

NewStore.propTypes = {
    token: PropTypes.any,
    data: PropTypes.any,
};
export default NewStore;
