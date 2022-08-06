import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import { Spinner, SpinnerSize } from '@fluentui/react';
import MessageBar from '../../../components/MessageBar';
import PageHeader from '../../../components/PageHeader';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const ViewEditPercentagePlan = (props) => {
    const router = useRouter();

    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    useEffect(() => {
        if (!props.percentagePlan.data) {
            router.push('/admin/percentage-plan');
        }
    });

    const formik = useFormik({
        initialValues: {
            PercentagePlanName:
                props.percentagePlan.data && props.percentagePlan.data.PercentagePlanName
                    ? props.percentagePlan.data.PercentagePlanName
                    : '',
            PurchasePercentage:
                props.percentagePlan.data && props.percentagePlan.data.PurchasePercentage
                    ? props.percentagePlan.data.PurchasePercentage
                    : '',
            Comments:
                props.percentagePlan.data && props.percentagePlan.data.Comments
                    ? props.percentagePlan.data.Comments
                    : '',
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
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/percentage-plan/${props.percentagePlan.data.PercentagePlanKey}`,
                {
                    body: JSON.stringify({
                        PercentagePlanName: values.PercentagePlanName,
                        PurchasePercentage: values.PurchasePercentage,
                        Comments: values.Comments,
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
                router.push('/admin/percentage-plan');
            }
        },
    });

    return (
        <Layout title="View Percentage Plan">
            <PageHeader
                title="Percentage Plans"
                button={{ text: 'Add new Percentage Plan', link: '/admin/percentage-plan/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    {
                        text: 'Percentage Plan',
                        key: 'percentageplan',
                        href: '/admin/percentage-plan',
                    },
                    {
                        text: 'Edit Percentage Plan',
                        key: 'edit-percentage-plan',
                        isCurrentItem: true,
                    },
                ]}
            />

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
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <TextField
                                    type="text"
                                    label="Percentage Plan Name:"
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
                                    label="Purchase Percentage:"
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
                            label="Comments :"
                            {...formik.getFieldProps('Comments')}
                            formik={{
                                touched: formik.touched.Comments,
                                errors: formik.errors.Comments,
                            }}
                        />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <PrimaryButton
                                    type="submit"
                                    text={
                                        formik.isSubmitting ? (
                                            <Spinner size={SpinnerSize.xSmall} />
                                        ) : (
                                            'Update Percentage Plan'
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
    const { PercentagePlanKey } = context.query;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/percentage-plan/${PercentagePlanKey}`
    );
    const percentagePlan = await res.json();
    return { props: { percentagePlan } };
}

ViewEditPercentagePlan.propTypes = {
    percentagePlan: PropTypes.any,
};

export default ViewEditPercentagePlan;
