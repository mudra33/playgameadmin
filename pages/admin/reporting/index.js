import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Layout from '../../../components/Layout/Post';
import PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import DefaultButton from '../../../components/Button/DefaultButton';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import Dropdown from '../../../components/Dropdown';
import Checkbox from '../../../components/CheckBox';
import DatePicker from '../../../components/DatePicker';

const Reporting = () => {
    const time = [
        { text: '10 AM', key: '10 AM' },
        { text: '11 AM', key: '11 AM' },
        { text: '11 AM', key: '11 AM' },
        { text: '11 AM', key: '11 AM' },
        { text: '11 AM', key: '11 AM' },
        { text: '11 AM', key: '11 AM' },
        { text: '11 AM', key: '11 AM' },
    ];

    const formik = useFormik({
        initialValues: {
            Order: '',
        },
        validationSchema: Yup.object({
            Order: Yup.string()
                .trim()
                .matches(/^[A-Za-z ]*$/, 'Order should only contain Characters')
                .required('Order is required')
                .min(3, 'Too short! Minimum allowed length is 3')
                .max(30, 'Too long! Maximum allowed length is 30'),
        }),
        onSubmit: async () => {},
    });

    return (
        <Layout title="Admin Reporting">
            <h1
                style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    font: 'normal normal 700 34px/50px Montserrat',
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    opacity: 1,
                    paddingBottom: '17px',
                }}>
                REPORTING
            </h1>
            <div
                style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    opacity: 1,
                    padding: '50px',
                    width: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown placeholder="Store Name:" />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown placeholder="Store Id:" />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <DatePicker label="From:" placeholder="Date" />
                        </div>

                        <div
                            className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"
                            style={{ paddingTop: '27px' }}>
                            <Dropdown placeholder="Time" options={time} />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <DatePicker label="To:" placeholder="Date" />
                        </div>

                        <div
                            className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"
                            style={{ paddingTop: '27px' }}>
                            <Dropdown placeholder="Time" options={time} />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <TextField
                                label="Order #:"
                                formik={{
                                    touched: formik.touched.Order,
                                    errors: formik.errors.Order,
                                }}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown options={time} label="Transaction:" />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown options={time} label="Cashier:" />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown options={time} label="Customer:" />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown options={time} label="Sweepstakes:" />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <Checkbox label="Only Prizes:" />
                        </div>
                    </div>

                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <Dropdown options={time} label="Credits Purchased:" />
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
                        <div className="ms-Grid-col ms-sm6">
                            <DefaultButton text="EXIT" />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton text="Create Report" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

Reporting.propTypes = {
    required: PropTypes.any,
    theme: PropTypes.any,
};

export default Reporting;
