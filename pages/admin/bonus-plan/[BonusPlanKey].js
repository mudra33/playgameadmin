import React, { useState } from 'react';
import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import MessageBar from '../../../components/MessageBar';
import PageHeader from '../../../components/PageHeader';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import Checkbox from '../../../components/CheckBox';
import Label from '../../../components/Label';
import SpinButton from '../../../components/SpinButton';
import { ChoiceGroup, Stack, Spinner, SpinnerSize } from '@fluentui/react';

const EditBonusPlan = (props) => {
    const router = useRouter();
    const SweepstakesKey = [];
    const stackTokens = { childrenGap: 10 };
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const SweepstakesData = [];

    React.useEffect(() => {
        if (!props.data.bonusPlans.data) {
            router.push('/admin/bonus-plan');
        }
        if (
            props.data.bonusPlans.data &&
            props.data.bonusPlans.data.Sweepstakes &&
            props.data.bonusPlans.data.Sweepstakes.length > 0
        )
            props.data.bonusPlans.data.Sweepstakes.map((sweepstake) => {
                SweepstakesData.push(sweepstake.SweepstakesKey);
            });
    });

    const Entries =
        props.data.bonusPlans.data && JSON.parse(props.data.bonusPlans.data.BonusEntries).length > 0
            ? JSON.parse(props.data.bonusPlans.data.BonusEntries)
            : [
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
                  { maxBonus: '' },
              ];

    props.data.sweepstakes.data.map((sweepstakes) => {
        SweepstakesKey.push(sweepstakes.SweepstakesKey);
    });

    const selectAll = () => {
        formik.values.Sweepstakes = SweepstakesKey;
    };

    const stackItemStyles = {
        root: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '20px',
        },
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

    const options = [{ key: 'All Same', text: 'All Same' }];

    const formik = useFormik({
        initialValues: {
            Sweepstakes:
                props.data.bonusPlans.data && props.data.bonusPlans.data.Sweepstakes.length > 0
                    ? SweepstakesData
                    : [],
            BonusPlanName:
                props.data.bonusPlans.data && props.data.bonusPlans.data.BonusPlanName
                    ? props.data.bonusPlans.data.BonusPlanName
                    : '',
            Comments:
                props.data.bonusPlans.data && props.data.bonusPlans.data.Comments
                    ? props.data.bonusPlans.data.Comments
                    : '',
            BonusEntries: [
                { entries: 2000, maxBonus: Entries[0].maxBonus },
                { entries: 3000, maxBonus: Entries[1].maxBonus },
                { entries: 4000, maxBonus: Entries[2].maxBonus },
                { entries: 5000, maxBonus: Entries[3].maxBonus },
                { entries: 6000, maxBonus: Entries[4].maxBonus },
                { entries: 7000, maxBonus: Entries[5].maxBonus },
                { entries: 8000, maxBonus: Entries[6].maxBonus },
                { entries: 9000, maxBonus: Entries[7].maxBonus },
                { entries: 10000, maxBonus: Entries[8].maxBonus },
            ],
        },
        validationSchema: Yup.object({
            BonusPlanName: Yup.string().required('Bonus Plan Name is required'),
            Comments: Yup.string(),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(
                `/api/bonus-plan/${props.data.bonusPlans.data.BonusPlanKey}`,
                {
                    body: JSON.stringify({
                        BonusPlanName: values.BonusPlanName,
                        Comments: values.Comments,
                        Sweepstakes: values.Sweepstakes,
                        BonusEntries: values.BonusEntries,
                        UserKey_LastUpdatedBy: props.token.UserKey,
                        UserKey_CreatedBy: props.token.UserKey,
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
                router.push('/admin/bonus-plan');
            }
        },
    });

    return (
        <Layout title="Edit Admin Bonus Plan">
            <PageHeader
                title="Admin"
                button={{ text: 'Add Bonus Plan', link: '/admin/bonus-plan/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Bonus Plan', key: 'bonus-plan', href: '/admin/bonus-plan' },
                    {
                        text: 'Edit Bonus Plan',
                        key: 'edit-bonus-plan',
                        isCurrentItem: true,
                    },
                ]}
            />

            <div className="ms-Grid" dir="ltr">
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
                        <TextField
                            label="Bonus Plan Name"
                            {...formik.getFieldProps('BonusPlanName')}
                            formik={{
                                touched: formik.touched.BonusPlanName,
                                errors: formik.errors.BonusPlanName,
                            }}
                        />

                        <ChoiceGroup
                            options={options}
                            onChange={selectAll}
                            optionsContainIconOrImage={false}
                            label={['Select ALL or adjust each Sweepstakes individually']}
                        />

                        <div className="ms-Grid" dir="ltr">
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
                                                {props.data.sweepstakes.data < 1
                                                    ? ''
                                                    : props.data.sweepstakes.data.map(
                                                          (sweepstakes) => {
                                                              const sa =
                                                                  props.data.bonusPlans.data &&
                                                                  props.data.bonusPlans.data
                                                                      .Sweepstakes
                                                                      ? props.data.bonusPlans.data.Sweepstakes.find(
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
                                                                      key={
                                                                          sweepstakes.SweepstakesKey
                                                                      }
                                                                      name={
                                                                          sweepstakes.SweepstakesKey
                                                                      }
                                                                      label={
                                                                          sweepstakes.SweepstakesName
                                                                      }
                                                                      defaultChecked={sa}
                                                                      onChange={_onChange}
                                                                  />
                                                              );
                                                          }
                                                      )}
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>Entries</Label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label> Max Bonus</Label>
                                    </div>
                                </div>

                                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>Entries</Label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label> Max Bonus</Label>
                                    </div>
                                </div>

                                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>Entries</Label>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>Max Bonus</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>2000</Label>
                                        <Label>3000</Label>
                                        <Label>4000</Label>
                                    </div>

                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[0].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[0].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[0].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[0].maxBonus + 1;
                                                formik.values.BonusEntries[0].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[0].maxBonus - 1;
                                                formik.values.BonusEntries[0].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[1].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[1].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[1].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[1].maxBonus + 1;
                                                formik.values.BonusEntries[1].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[1].maxBonus - 1;
                                                formik.values.BonusEntries[1].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[2].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[2].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[2].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[2].maxBonus + 1;
                                                formik.values.BonusEntries[2].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[2].maxBonus - 1;
                                                formik.values.BonusEntries[2].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>5000</Label>
                                        <Label>6000</Label>
                                        <Label>7000</Label>
                                    </div>

                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[3].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[3].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[3].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[3].maxBonus + 1;
                                                formik.values.BonusEntries[3].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[3].maxBonus - 1;
                                                formik.values.BonusEntries[3].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[4].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[4].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[4].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[4].maxBonus + 1;
                                                formik.values.BonusEntries[4].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[4].maxBonus - 1;
                                                formik.values.BonusEntries[4].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[5].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[5].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[5].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[5].maxBonus + 1;
                                                formik.values.BonusEntries[5].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[5].maxBonus - 1;
                                                formik.values.BonusEntries[5].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <Label>8000</Label>
                                        <Label>9000</Label>
                                        <Label>10000</Label>
                                    </div>

                                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[6].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[6].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[6].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[6].maxBonus + 1;
                                                formik.values.BonusEntries[6].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[6].maxBonus - 1;
                                                formik.values.BonusEntries[6].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[7].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[7].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[7].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[7].maxBonus + 1;
                                                formik.values.BonusEntries[7].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[7].maxBonus - 1;
                                                formik.values.BonusEntries[7].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                        <SpinButton
                                            min={0}
                                            step={1}
                                            value={formik.values.BonusEntries[8].maxBonus}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            {...formik.getFieldProps('BonusEntries[8].maxBonus')}
                                            onChange={(e, newValue) => {
                                                if (newValue != undefined) {
                                                    formik.values.BonusEntries[8].maxBonus =
                                                        parseInt(newValue);

                                                    formik.handleChange(e);
                                                }
                                            }}
                                            onIncrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[8].maxBonus + 1;
                                                formik.values.BonusEntries[8].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                            onDecrement={() => {
                                                const newValue =
                                                    formik.values.BonusEntries[8].maxBonus - 1;
                                                formik.values.BonusEntries[8].maxBonus =
                                                    parseInt(newValue);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <TextField
                            label="Comments"
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
                                            'Update Bonus Plan'
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
    const token = await jwt.getToken({
        req: context.req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });

    const { BonusPlanKey } = context.query;
    let bonusPlans = await fetch(
        `/api/bonus-plan/${BonusPlanKey}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    bonusPlans = await bonusPlans.json();

    let sweepstakes = await fetch(`/api/sweepstakes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    sweepstakes = await sweepstakes.json();

    return {
        props: {
            token,
            data: {
                sweepstakes: sweepstakes,
                bonusPlans: bonusPlans,
            },
        },
    };
}

EditBonusPlan.propTypes = {
    token: PropTypes.any,
    data: PropTypes.any,
};

export default EditBonusPlan;
