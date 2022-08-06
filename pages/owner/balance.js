import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import Dropdown from '../../components/Dropdown';
import Layout from '../../components/Layout/Post';
import TextField from '../../components/TextField';
import MessageBar from '../../components/MessageBar';
import PageHeader from '../../components/PageHeader';
import PrimaryButton from '../../components/Button/PrimaryButton';
import Text from '../../components/Text';
import Label from '../../components/Label';
import { Spinner, SpinnerSize } from '@fluentui/react';

const ShowBalance = () => {
    const router = useRouter();
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const [session] = useSession();

    const [selectedBonusEntries, setSelectedBonusEntries] = useState(0);
    const [selectedLowBalanceThreshold, setSelectedLowBalanceThreshold] = useState(0);
    const [selectedCreditBalance, setSelectedCreditBalance] = useState(0);

    const BonusEntriesOptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const LowBalanceThresholdOptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const CreditBalanceOptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const formik = useFormik({
        initialValues: {
            DollarAmount: '',
        },
        validationSchema: Yup.object({
            DollarAmount: Yup.string()
                .trim()
                .required('Dollar Amount is required')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/store/show-balance/${session.user.StoreKey}`,
                {
                    body: JSON.stringify({
                        Settings: [
                            {
                                CreditBalance: selectedCreditBalance,
                                DollarAmount: values.DollarAmount,
                                LowBalanceThreshold: selectedLowBalanceThreshold,
                                BonusEntries: selectedBonusEntries,
                            },
                        ],
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
                router.push('/owner/home');
            }
        },
    });

    return (
        <Layout title="Store Show Balance">
            <PageHeader
                title="Show Balance"
                breadcrumb={[{ text: 'Home', key: 'home', href: '/owner/home' }]}
            />

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
                            {session && session.user && session.user.StoreName
                                ? session.user.StoreName
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
                            {session && session.user && session.user.StoreKey
                                ? session.user.StoreKey
                                : 'No Store Key Found'}
                        </Text>
                    </div>
                </div>
            </div>
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
                                    <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                                        <Label>Show Credit Balance on Cashier Screen?</Label>
                                    </div>

                                    <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                        <Dropdown
                                            value={selectedCreditBalance}
                                            options={CreditBalanceOptions}
                                            onChange={(event, item) => {
                                                setSelectedCreditBalance(item.key);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <TextField
                                        label="Show dollar amount or OK/LOW?"
                                        {...formik.getFieldProps('DollarAmount')}
                                        formik={{
                                            touched: formik.touched.DollarAmount,
                                            errors: formik.errors.DollarAmount,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row" style={{ paddingBottom: '20px' }}>
                                    <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                                        <Label>Set Low Balance threshold to</Label>
                                    </div>

                                    <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                        <Dropdown
                                            value={selectedLowBalanceThreshold}
                                            options={LowBalanceThresholdOptions}
                                            onChange={(event, item) => {
                                                setSelectedLowBalanceThreshold(item.key);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="ms-Grid-row" style={{ paddingBottom: '20px' }}>
                                    <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
                                        <Label>
                                            Show/Allow Bonus Entries? (This Will Reduce Your Net
                                            Profit)
                                        </Label>
                                    </div>

                                    <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                        <Dropdown
                                            placeholder="Bonus Entries"
                                            value={selectedBonusEntries}
                                            options={BonusEntriesOptions}
                                            onChange={(event, item) => {
                                                setSelectedBonusEntries(item.key);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ paddingBottom: '25px' }}>
                                    <Text>
                                        You will receive a refill reminder when your account falls
                                        to threshold
                                    </Text>
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
                                                !(formik.isValid && formik.dirty) ||
                                                formik.isSubmitting
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ShowBalance;
