import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Dropdown from '../../../components/Dropdown';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import { Stack, ChoiceGroup, Spinner, SpinnerSize } from '@fluentui/react';
import Checkbox from '../../../components/CheckBox';
import Label from '../../../components/Label';

const EditStore = (props) => {
    const router = useRouter();
    const PercentagePlanName = [];
    const [session] = useSession();
    const stackTokens = { childrenGap: 10 };
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const SweepstakesData = [];
    const [selectedItem, setSelectedItem] = React.useState(false);
    const [selectedPercentagePlan, setSelectedPercentagePlan] = React.useState({
        text:
            props.percentagePlan.data.length > 0
                ? props.percentagePlan.data[0].PercentagePlanName
                : '',
        key:
            props.percentagePlan.data.length > 0
                ? props.percentagePlan.data[0].PercentagePlanKey
                : '',
    });

    const onChangeBlock = (event, item) => {
        setSelectedItem(item.key);
    };

    React.useEffect(() => {
        if (!props.store.data) {
            router.push('/admin/store');
        }

        if (props.store.data && props.store.data.Sweepstakes.length > 0)
            props.store.data.Sweepstakes.map((sweepstake) => {
                SweepstakesData.push(sweepstake.SweepstakesKey);
            });
    });

    if (props.percentagePlan.data && props.percentagePlan.data.length > 0)
        props.percentagePlan.data.map((percentagePlan) => {
            PercentagePlanName.push({
                text: percentagePlan.PercentagePlanName,
                key: percentagePlan.PercentagePlanKey,
            });
        });

    const stackItemStyles = {
        root: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '20px',
        },
    };

    const onDropdownChange = (event, item) => {
        setSelectedPercentagePlan({ text: item.text, key: item.key });
    };

    const _onChange = (ev, isChecked) => {
        if (isChecked) {
            formik.values.Sweepstakes.push(parseInt(ev.target.name));
        } else {
            formik.values.Sweepstakes = formik.values.Sweepstakes
                ? formik.values.Sweepstakes.filter((value) => value != parseInt(ev.target.name))
                : formik.values.Sweepstakes;
        }
    };

    const UserBlockedoptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const formik = useFormik({
        initialValues: {
            StoreName:
                props.store.data && props.store.data.StoreName ? props.store.data.StoreName : '',
            StorePhone:
                props.store.data && props.store.data.StorePhone ? props.store.data.StorePhone : '',
            StoreAddress1:
                props.store.data && props.store.data.StoreAddress1
                    ? props.store.data.StoreAddress1
                    : '',
            StoreAddress2:
                props.store.data && props.store.data.StoreAddress2
                    ? props.store.data.StoreAddress2
                    : '',
            StoreCity:
                props.store.data && props.store.data.StoreCity ? props.store.data.StoreCity : '',
            StoreState:
                props.store.data && props.store.data.StoreState ? props.store.data.StoreState : '',
            StoreZip:
                props.store.data && props.store.data.StoreZip ? props.store.data.StoreZip : '',
            MailingAddress1:
                props.store.data && props.store.data.MailingAddress1
                    ? props.store.data.MailingAddress1
                    : '',
            MailingAddress2:
                props.store.data && props.store.data.MailingAddress2
                    ? props.store.data.MailingAddress2
                    : '',
            MailingCity:
                props.store.data && props.store.data.MailingCity
                    ? props.store.data.MailingCity
                    : '',
            MailingState:
                props.store.data && props.store.data.MailingState
                    ? props.store.data.MailingState
                    : '',
            MailingZip:
                props.store.data && props.store.data.MailingZip ? props.store.data.MailingZip : '',
            Comments:
                props.store.data && props.store.data.Comments ? props.store.data.Comments : '',
            Sweepstakes:
                props.store.data && props.store.data.Sweepstakes.length > 0 ? SweepstakesData : [],
            StorePercentagePlan:
                props.store.data && props.store.data.PercentagePlanName
                    ? props.store.data.PercentagePlanName
                    : '',
            Salesperson:
                props.store.data && props.store.data.Salesperson
                    ? props.store.data.Salesperson
                    : '',
            SalespersonPercentage:
                props.store.data && props.store.data.SalespersonPercentage
                    ? props.store.data.SalespersonPercentage
                    : '',
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
                .max(10, 'Too short!  Minimum allowed length is 10'),
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
                .max(30, 'Too long! Maximum allowed length is 30'),
            MailingAddress2: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing Address2 should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
            MailingCity: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing City should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(20, 'Too long! Maximum allowed length is 20'),
            MailingState: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Mailing State should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
            MailingZip: Yup.string()
                .trim()
                .matches(/^[0-9]+$/, 'Mailing Zip must be a numeric')
                .min(5, 'Too short! Allowed length is 5')
                .max(7, 'Too long! Allowed length is 7'),
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
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/store/${props.store.data.StoreKey}`,
                {
                    body: JSON.stringify({
                        StoreName: values.StoreName,
                        StorePhone: values.StorePhone,
                        StoreAddress1: values.StoreAddress1,
                        StoreAddress2: values.StoreAddress2,
                        StoreCity: values.StoreCity,
                        StoreState: values.StoreState,
                        StoreZip: values.StoreZip,
                        MailingAddress1: values.MailingAddress1,
                        MailingAddress2: values.MailingAddress2,
                        MailingCity: values.MailingCity,
                        MailingState: values.MailingState,
                        MailingZip: values.MailingZip,
                        Comments: values.Comments,
                        PercentagePlanKey: selectedPercentagePlan.key,
                        Salesperson: values.Salesperson,
                        SalespersonPercentage: values.SalespersonPercentage,
                        UserKey_LastUpdatedBy: session.user.UserKey,
                        UserKey_CreatedBy: session.user.UserKey,
                        Sweepstakes: values.Sweepstakes,
                        StoreBlocked: selectedItem,
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
                router.push('/admin/store');
            }
        },
    });

    return (
        <Layout title="Edit Store">
            <PageHeader
                title="Owners"
                button={{ text: 'Add new Store', link: '/admin/store/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Store', key: 'store', href: '/admin/store' },
                    {
                        text: 'Edit Store',
                        key: 'edit-store',
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
                        <Label>
                            Balance :
                            {props.store.data && props.store.data.transaction.length > 0
                                ? props.store.data.transaction[0].Total
                                : 'No Balance'}
                        </Label>
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
                                    label="Percentage Plan"
                                    onChange={onDropdownChange}
                                    options={PercentagePlanName}
                                    defaultSelectedKey={selectedPercentagePlan.key}
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
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm10">
                                <Stack
                                    wrap
                                    horizontal
                                    styles={stackItemStyles}
                                    tokens={stackTokens}>
                                    {props.sweepstakes.data < 1
                                        ? ''
                                        : props.sweepstakes.data.map((sweepstakes) => {
                                              const sa =
                                                  props.store.data && props.store.data.Sweepstakes
                                                      ? props.store.data.Sweepstakes.find(
                                                            (value) => {
                                                                if (
                                                                    value.SweepstakesKey ===
                                                                    sweepstakes.SweepstakesKey
                                                                ) {
                                                                    return true;
                                                                }
                                                                return false;
                                                            }
                                                        )
                                                      : '';

                                              return (
                                                  <Checkbox
                                                      grow={3}
                                                      key={sweepstakes.SweepstakesKey}
                                                      name={sweepstakes.SweepstakesKey}
                                                      label={sweepstakes.SweepstakesName}
                                                      defaultChecked={sa}
                                                      onChange={_onChange}
                                                  />
                                              );
                                          })}
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>

                <ChoiceGroup
                    label="Store Blocked"
                    onChange={onChangeBlock}
                    options={UserBlockedoptions}
                    optionsContainIconOrImage={false}
                    defaultSelectedKey={
                        props.store.data && props.store.data.StoreBlocked
                            ? props.store.data.StoreBlocked
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
                                    'Submit'
                                )
                            }
                            disabled={!formik.isValid || formik.isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { StoreKey } = context.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/store/${StoreKey}`);
    const store = await res.json();

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

    let sweepstakes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sweepstakes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    sweepstakes = await sweepstakes.json();

    return {
        props: {
            store: store,
            sweepstakes: sweepstakes,
            percentagePlan: percentagePlan,
        },
    };
}

EditStore.propTypes = {
    store: PropTypes.any,
    sweepstakes: PropTypes.any,
    percentagePlan: PropTypes.any,
};

export default EditStore;
