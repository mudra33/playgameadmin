import React, { useState, useEffect } from 'react';
import jwt from 'next-auth/jwt';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import { ChoiceGroup, Spinner, SpinnerSize } from '@fluentui/react';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import DefaultButton from '../../../components/Button/DefaultButton';
import Dropdown from '../../../components/Dropdown';

const ViewSweepstake = (props) => {
    const router = useRouter();
    const CompanyName = [];
    const SweepstakesName = [];
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });
    const [error, setError] = useState('');
    const [sweepstakesError, setSweepstakesError] = useState('');
    const [selectedSweepstakesBlocked, setSelectedSweepstakesBlocked] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState({ text: '', key: '' });
    const [selectedSweepstakes, setSelectedSweepstakes] = useState({ text: '', key: '' });

    useEffect(() => {
        if (!props.data.CompanySweepstakes[0]) {
            router.push('/admin/sweepstakes');
        }

        setSelectedCompany(
            props.data && props.data.CompanySweepstakes[0]
                ? {
                      text: props.data.CompanySweepstakes[0].CompanyName,
                      key: props.data.CompanySweepstakes[0].CompanyKey,
                  }
                : ''
        );
        setSelectedSweepstakes(
            props.data && props.data.CompanySweepstakes[0]
                ? {
                      text: props.data.CompanySweepstakes[0].SweepstakesName,
                      key: props.data.CompanySweepstakes[0].SweepstakesKey,
                  }
                : ''
        );
    }, [props.data.CompanySweepstakes[0]]);

    props.data && props.data.length < 1
        ? ''
        : props.data.Company.map((company) => {
              CompanyName.push({ text: company.CompanyName, key: company.CompanyKey });
          });

    props.data && props.data.length < 1
        ? ''
        : props.data.Sweepstakes.map((sweepstakes) => {
              SweepstakesName.push({
                  text: sweepstakes.SweepstakesName,
                  key: sweepstakes.SweepstakesKey,
              });
          });

    const onCompanyChange = (event, item) => {
        setSelectedCompany({ text: item.text, key: item.key });
        if (!item.key) {
            setError('No Companies Found !!');
        }
    };

    const onSweepstakesChange = (event, item) => {
        setSelectedSweepstakes({ text: item.text, key: item.key });
        if (!item.key) {
            setSweepstakesError('No Sweepstakes Found !!');
        }
    };

    const UserBlockedoptions = [
        { key: 1, text: 'Yes' },
        { key: 0, text: 'No' },
    ];

    const formik = useFormik({
        initialValues: {
            Comments:
                props.data.CompanySweepstakes[0] && props.data.CompanySweepstakes[0].Comments
                    ? props.data.CompanySweepstakes[0].Comments
                    : '',
        },
        validationSchema: Yup.object({
            Comments: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Comments should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(50, 'Too long! Maximum allowed length is 50'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-sweepstakes/${props.data.CompanySweepstakes[0].CompanySweepstakesKey}`,
                {
                    body: JSON.stringify({
                        SweepstakesKey: selectedSweepstakes.key,
                        CompanyKey: selectedCompany.key,
                        Comments: values.Comments,
                        UserKey_LastUpdatedBy: props.token.UserKey,
                        UserKey_CreatedBy: props.token.UserKey,
                        SweepstakesBlocked: selectedSweepstakesBlocked,
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
                router.push('/admin/sweepstakes');
            }
        },
    });

    return (
        <Layout title="View Sweepstakes">
            <PageHeader
                title="Sweepstakes"
                button={{ text: 'Add new Sweepstakes', link: '/admin/sweepstakes/add' }}
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    { text: 'Sweepstakes', key: 'Sweepstakes', href: '/admin/sweepstakes' },
                    {
                        text: 'Edit Sweepstakes',
                        key: 'addsweepstakes',
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
                                <Dropdown
                                    label="Sweepstakes Name"
                                    autoComplete="on"
                                    err
                                    options={SweepstakesName}
                                    selectedKey={selectedSweepstakes.key}
                                    onChange={onSweepstakesChange}
                                    errorMessage={sweepstakesError}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <Dropdown
                                    label="Company Name"
                                    selectedKey={selectedCompany.key}
                                    autoComplete="on"
                                    options={CompanyName}
                                    errorMessage={error}
                                    onChange={onCompanyChange}
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

                        <ChoiceGroup
                            options={UserBlockedoptions}
                            defaultSelectedKey={
                                props.data.CompanySweepstakes[0] && props.data.CompanySweepstakes[0].SweepstakesBlocked
                                    ? props.data.CompanySweepstakes[0].SweepstakesBlocked
                                    : ''
                            }
                            label="Sweepstakes Blocked:"
                            optionsContainIconOrImage={false}
                            onChange={(event, item) => {
                                setSelectedSweepstakesBlocked(item.key);
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
                                            'Update Sweepstakes'
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
    const { SweepstakesKey } = context.query;
    let CompanySweepstakes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-sweepstakes/${SweepstakesKey}`
    );
    CompanySweepstakes = await CompanySweepstakes.json();

    let Sweepstakes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sweepstakes`);
    Sweepstakes = await Sweepstakes.json();

    let Company = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company`);
    Company = await Company.json();

    const token = await jwt.getToken({
        req: context.req,
        secret: process.env.JWT_SECRET,
        encryption: true,
    });
    return {
        props: {
            token,
            data: {
                CompanySweepstakes: CompanySweepstakes.data,
                Sweepstakes: Sweepstakes.data,
                Company: Company.data,
            },
        },
    };
}

ViewSweepstake.propTypes = {
    data: PropTypes.array,
    token: PropTypes.any,
};

export default ViewSweepstake;
