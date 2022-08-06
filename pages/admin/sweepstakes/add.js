import React, { useState } from 'react';
import * as Yup from 'yup';
import jwt from 'next-auth/jwt';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ComboBox from '../../../components/ComboBox';
import Layout from '../../../components/Layout/Post';
import TextField from '../../../components/TextField';
import { Spinner, SpinnerSize } from '@fluentui/react';
import PageHeader from '../../../components/PageHeader';
import MessageBar from '../../../components/MessageBar';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const AddSweepstakes = (props) => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedSweepstakes, setSelectedSweepstakes] = useState([]);
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({
        message: '',
        messageBarType: '',
    });

    const CompanyName = [];

    const SweepstakesName = [];

    if (props.data.Company && props.data.Company.length > 0) {
        props.data.Company.map((company) => {
            CompanyName.push({ text: company.CompanyName, key: company.CompanyKey });
        });
    }
    if (props.data.Sweepstakes && props.data.Sweepstakes.length > 0) {
        props.data.Sweepstakes.map((sweepstakes) => {
            SweepstakesName.push({
                text: sweepstakes.SweepstakesName,
                key: sweepstakes.SweepstakesKey,
            });
        });
    }
    const [options, setOptions] = useState(CompanyName);
    const [sweepstakesOptions, setSweepstakesOptions] = useState(SweepstakesName);
    const [validationError, setValidationError] = useState('');
    const [sweepstakesValidationError, setSweepstakesValidationError] = useState('');

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
                setSelectedKeys(option);
                setValidationError('');
            } else {
                setError('Company Name Is Required');
                setValidationError('');
            }
        } else {
            setValidationError('Enter a Valid Name');
        }
    };

    const onSweepstakesChange = (event, option, index, value) => {
        if (validate(value)) {
            if (!option && value) {
                option = { key: value, text: value };
                setSweepstakesOptions((prevOptions) => [...prevOptions, option]);
                setSweepstakesValidationError('');
            }
            if (option || value) {
                setError('');
                setSelectedSweepstakes(option);
                setSweepstakesValidationError('');
            } else {
                setError('Sweepstakes Name Is Required');
            }
        } else {
            setSweepstakesValidationError('Enter a Valid Name');
        }
    };

    const formik = useFormik({
        initialValues: {
            Comments: '',
        },
        validationSchema: Yup.object({
            Comments: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Comments should only contain Characters')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(50, 'Too long! Maximum allowed length is 50'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (selectedKeys && selectedKeys.length < 1) {
                setError('No Company Name Found');
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sweepstakes`, {
                    body: JSON.stringify({
                        CompanyNames: selectedKeys,
                        SweepstakesNames: selectedSweepstakes,
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
                    router.push('/admin/sweepstakes');
                }
            }
        },
    });

    return (
        <Layout title="Add Sweepstakes">
            <PageHeader
                title="Sweepstakes"
                breadcrumb={[
                    { text: 'Home', key: 'home', href: '/admin/home' },
                    {
                        text: 'Sweepstakes',
                        key: 'Sweepstakes',
                        href: '/admin/sweepstakes',
                    },
                    {
                        text: 'Add new Sweepstakes',
                        key: 'addSweepstakes',
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
                                <ComboBox
                                    label="Sweepstakes Name"
                                    options={sweepstakesOptions}
                                    onChange={onSweepstakesChange}
                                    errorMessage={error || sweepstakesValidationError}
                                />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <ComboBox
                                    options={options}
                                    onChange={onChange}
                                    label="Company Name"
                                    errorMessage={error || validationError}
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

    let company = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    let sweepstakes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sweepstakes`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    company = await company.json();

    sweepstakes = await sweepstakes.json();

    return {
        props: {
            token,
            data: { Company: company.data, Sweepstakes: sweepstakes.data },
        },
    };
}

AddSweepstakes.propTypes = {
    token: PropTypes.any,
    data: PropTypes.any,
};

export default AddSweepstakes;
