import React, { useState } from 'react';
import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import DefaultButton from '../../../components/Button/DefaultButton';
import { Spinner, SpinnerSize } from '@fluentui/react';

const AddPercentageplan = (props) => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const formik = useFormik({
        initialValues: {
            PercentagePlanName: '',
            PurchasePercentage: '',
            Comments: '',
        },
        validationSchema: Yup.object({
            PercentagePlanName: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Percentage Plan Name should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30')
                .required('Percentage Plan Name is required'),
            PurchasePercentage: Yup.string()
                .trim()
                .matches(
                    /(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/,
                    'Purchase Percenage should be valid Percentage Value'
                )
                .required('Purchase Percentage is required'),
            Comments: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Comments should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(50, 'Too long! Maximum allowed length is 50'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(`/api/percentage-plan`, {
                body: JSON.stringify({
                    PercentagePlanName: values.PercentagePlanName,
                    PurchasePercentage: values.PurchasePercentage,
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
                router.push('/admin/percentage-plan');
            }
        },
    });

    return (
        <Layout title="Add Percentage Plan">
            <PageHeader
                title="Percentage Plans"
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    {
                        text: 'Percentage Plan',
                        key: 'percentage-plan',
                        href: '/admin/percentage-plan',
                    },
                    {
                        text: 'Add new Percentage Plan',
                        key: 'add-percentage-plan',
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
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Percentage Plan Name"
                                    {...formik.getFieldProps('PercentagePlanName')}
                                    formik={{
                                        touched: formik.touched.PercentagePlanName,
                                        errors: formik.errors.PercentagePlanName,
                                    }}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="number"
                                    label="Purchase Percentage"
                                    {...formik.getFieldProps('PurchasePercentage')}
                                    formik={{
                                        touched: formik.touched.PurchasePercentage,
                                        errors: formik.errors.PurchasePercentage,
                                    }}
                                />
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

                        <br />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <DefaultButton text="Reset" onClick={() => formik.resetForm()} />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <PrimaryButton
                                    type="submit"
                                    text={formik.isSubmitting ? <Spinner size={SpinnerSize.xSmall} /> : 'Submit'}
                                    disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
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

AddPercentageplan.propTypes = {
    token: PropTypes.any,
};

export default AddPercentageplan;
