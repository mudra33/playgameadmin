import React, { useState } from 'react';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import { Spinner, SpinnerSize } from '@fluentui/react';
import Dropdown from '../../../components/Dropdown';
import PageHeader from '../../../components/PageHeader';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import MessageBar from '../../../components/MessageBar';
import Label from '../../../components/Label';
import SpinButton from '../../../components/SpinButton';

const AddCredit = (props) => {
    const router = useRouter();
    const [error, setError] = React.useState('');
    const [Total, setTotal] = React.useState('0');

    const StoreName = [];
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    props.data.stores && props.data.stores.length < 1
        ? ''
        : props.data.stores.map((store) => {
              StoreName.push({
                  text: store.StoreName,
                  key: store.StoreKey,
              });
          });

    const [selectedStore, setSelectedStore] = React.useState('');

    const onDropdownChange = async (event, item) => {
        setSelectedStore(item.key);
        let Balance = await fetchData(item.key);
        Balance = Balance && Balance.length > 0 ? Balance[0].Total : 0;
        formik.values.CurrentCredit = Balance;

        setTotal(Balance);

        if (!item.key) {
            setError('No Percentage Plans Found !!');
        }
    };

    React.useEffect(async () => {});

    const upArrowButtonStyles = {
        rootChecked: {
            backgroundColor: 'green',
        },
        rootPressed: {
            backgroundColor: 'green',
        },
    };

    const downArrowButtonStyles = {
        rootChecked: {
            backgroundColor: 'red',
        },
        rootPressed: {
            backgroundColor: 'red',
        },
    };

    const formik = useFormik({
        initialValues: {
            CurrentCredit: Total,
            Amount: '',
            Total: '',
        },
        validationSchema: Yup.object({
            CurrentCredit: Yup.string().trim().required('Current Credit is required'),
            Total: Yup.string().trim().required('Total is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!selectedStore) {
                setError('No Store Found');
            } else {
                const res = await fetch('/api/store-transactions', {
                    body: JSON.stringify({
                        Total: values.Total,
                        StoreKey: selectedStore,
                        TransactionAmount: values.Amount,
                        TransactionType: 'Credit',
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
                    router.push('/admin/home');
                }
            }
        },
    });
    return (
        <Layout title="Add Credit To Store">
            <PageHeader title="Add Credit To Store" breadcrumb={[{ text: 'Home', key: 'home', href: '/admin/home' }]} />
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
                            <h2>Add Credit To Store!</h2>
                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6">
                                        <Label>Store Name:&nbsp;</Label>
                                    </div>
                                    {error}
                                    <div className="ms-Grid-col ms-sm6">
                                        <Dropdown
                                            value={selectedStore}
                                            onChange={onDropdownChange}
                                            options={StoreName}
                                        />
                                    </div>
                                </div>

                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6">
                                        <Label>Current Credit:&nbsp;</Label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6">
                                        <TextField
                                            disabled={true}
                                            value={formik.values.CurrentCredit}
                                            onChange={formik.handleChange}
                                            formik={{
                                                touched: formik.touched.CurrentCredit,
                                                errors: formik.errors.CurrentCredit,
                                            }}
                                            {...formik.getFieldProps('CurrentCredit')}
                                        />
                                    </div>
                                </div>

                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6">
                                        <Label>Amount :&nbsp;</Label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6">
                                        <SpinButton
                                            upArrowButtonStyles={upArrowButtonStyles}
                                            downArrowButtonStyles={downArrowButtonStyles}
                                            defaultValue="0"
                                            step={1}
                                            value={formik.values.Amount}
                                            {...formik.getFieldProps('Amount')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.Amount = parseInt(newValue);
                                                    formik.values.Total =
                                                        parseInt(formik.values.CurrentCredit, 10) +
                                                        parseInt(formik.values.Amount, 10);
                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue = formik.values.Amount + 1;
                                                formik.values.Amount = parseInt(newValue);
                                                formik.values.Total =
                                                    parseInt(formik.values.CurrentCredit, 10) +
                                                    parseInt(formik.values.Amount, 10);
                                            }}
                                            onDecrement={() => {
                                                const newValue = formik.values.Amount - 1;
                                                formik.values.Amount = parseInt(newValue);
                                                formik.values.Total =
                                                    parseInt(formik.values.CurrentCredit, 10) +
                                                    parseInt(formik.values.Amount, 10);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6">
                                        <Label>New Total:&nbsp;</Label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6">
                                        <TextField
                                            disabled={true}
                                            value={formik.values.Total}
                                            formik={{
                                                touched: formik.touched.Total,
                                                errors: formik.errors.Total,
                                            }}
                                            {...formik.getFieldProps('Total')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="ms-Grid"
                                dir="ltr"
                                style={{
                                    padding: '30px 0 0 0',
                                }}>
                                <div className="ms-Grid-row">
                                    <PrimaryButton
                                        type="submit"
                                        text={
                                            formik.isSubmitting ? (
                                                <Spinner size={SpinnerSize.xSmall} />
                                            ) : (
                                                `Submit Credit Changes`
                                            )
                                        }
                                        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
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

async function fetchData(selectedStore) {
    let storeTransactions = await fetch(`/api/store-transactions?StoreKey=${selectedStore}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    storeTransactions = await storeTransactions.json();

    return storeTransactions.data;
}

export async function getServerSideProps({ req }) {
    const token = await jwt.getToken({
        req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });

    let stores = await fetch(`/api/store`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    stores = await stores.json();

    return {
        props: {
            token,
            data: {
                stores: stores.data,
            },
        },
    };
}

AddCredit.propTypes = {
    token: PropTypes.any,
    data: PropTypes.any,
};
export default AddCredit;
