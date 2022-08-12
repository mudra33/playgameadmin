import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Layout from '../../components/Layout/Pre';
import {
    DefaultButton,
    Text,
    TextField,
    Link,
    PrimaryButton,
    Dropdown,
    Label,
    CommandBarButton,
} from '@fluentui/react';

const customerEdit = () => {
    const options = [
        { text: 'Arizona', key: 'Arizona' },
        { text: 'Hawaai', key: 'Hawaai' },
    ];
    const labelStyles = {
        root: {
            letterSpacing: 0,
            color: '#000000',
            textAlign: 'left',
            font: 'normal normal medium 20px/33px Montserrat',
            marginBottom: '10px',
        },
    };
    const buttonStylesAccept = {
        root: {
            height: '48px',
            borderRadius: '8px',
            width: '245px',
            background: '#EF3625 0% 0% no-repeat padding-box',
            opacity: 1,
            marginRight: '10px',
            marginTop: '20px',
        },
        label: {
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
        },
    };

    const dropdownStyles = {
        label: {
            textAlign: 'left',
            font: 'normal normal 600 20px/18px Montserrat',
            letterSpacing: 0,
            color: '#000000',
        },
        title: {
            height: '48px',
            fontWeight: 600,
            border: '1px solid #C4C4C4',
            borderRadius: '8px',
            background: '#00B1FF1A 0% 0% no-repeat padding-box',
            display: 'flex',
            letterSpacing: 0,
            fontSize: '18px',
            textAlign: 'left',
            lineHeight: '18px',
            alignItems: 'center',
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
        },
        caretDown: {
            color: '#000000',
        },
        caretDownWrapper: {
            top: '20%',
        },
        dropdownItemSelected: {
            background: '#00B1FF 0% 0% no-repeat padding-box',
        },
    };

    const PageEdit = { iconName: 'PageEdit' };
    const editButtonStyles = {
        root: {
            top: '20px',
            right: '10px',
            height: '38px',
            marginRight: '10px',
            marginBottom: '10px',
            borderRadius: '8px',
            position: 'absolute',
        },
        label: {
            color: '#000000',
            textAlign: 'center',
            letterSpacing: '0.2px',
            font: 'normal normal medium 20px/33px Montserrat',
        },
    };

    const buttonStylesDecline = {
        root: {
            height: '48px',
            borderRadius: '8px',
            width: '245px',
            background: '#2845A7 0% 0% no-repeat padding-box',
            opacity: 1,
            marginTop: '20px',
        },
        label: {
            textAlign: 'center',
            font: 'normal normal bold 20px/15px Montserrat',
            letterSpacing: '0.2px',
            color: '#FFFFFF',
        },
    };

    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            borderRadius: '8px',
            marginTop: '10px',
            marginBottom: '20px',
            border: '1px solid #E5E5E5',
            background: '#E5E5E5 0% 0% no-repeat padding-box',
        },
        label: {
            color: '#999999',
            textAlign: 'center',
            letterSpacing: '0.2px',
            font: 'normal normal bold 20px/18px Montserrat',
        },
    };

    const labelFieldStyles = {
        root: {
            color: '#000000',
            letterSpacing: 0,
            textAlign: 'left',
            fontSize: '18px',
            lineHeight: '24px',
            font: 'normal normal medium',
            fontFamily: "'Montserrat'",
            opacity: 1,
        },
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            city: '',
            zip: '',
            driverLicenseNumber: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(' First Name is required'),
            lastName: Yup.string().required(' Last Name is required'),
            phoneNumber: Yup.string().required(' Phone Number is required'),
            email: Yup.string().required(' Email is required'),
            addressLine1: Yup.string().required(' Addreess Line 1 is required'),
            addressLine2: Yup.string().required('Addewaa Line 2  is required'),
            state: Yup.string().min(10, 'Too Short!').max(10, 'Too Long!').required('State Is required'),
            city: Yup.string().required('city is required'),
            zip: Yup.string().required('Zip is required'),
            driverLicenseNumber: Yup.string().required('driverLicenseNumber is required'),
        }),
        onSubmit: async (values) => {
            await fetch('', {
                body: JSON.stringify({
                    addressLine1: '',
                    addressLine2: '',
                    zip: '',
                    state: values.state,
                    city: values.city,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
        },
    });

    return (
        <Layout title="Add Customer Edit">
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
                CUSTOMER
            </h1>

            <form
                onSubmit={formik.handleSubmit}
                style={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    opacity: 1,
                    padding: '30px 30px 30px 30px',
                    width: '660px',
                    margin: '0 auto',
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                }}>
                <CommandBarButton text="Edit" styles={editButtonStyles} iconProps={PageEdit} />

                <Label style={labelStyles}>{"86'd - Asked to Leave"}</Label>

                <DefaultButton text="Transaction # XXXXXX" styles={exitButtonStyles} />
                <Text style={labelFieldStyles}>Only Highlighted Fields May Be Edited.See Agent For Other C hanges</Text>

                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    <div className="ms-Grid-row" style={{ paddingLeft: '10px' }}>
                        <Label styles={labelStyles}>Id# XXXXXXXXXXX</Label>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <TextField
                                label="First Name:"
                                styles={getInputStyles}
                                {...formik.getFieldProps('firstName')}
                                errorMessage={
                                    formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : null
                                }
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <TextField
                                label="Last Name:"
                                styles={getInputStyles}
                                {...formik.getFieldProps('lastName')}
                                errorMessage={
                                    formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : null
                                }
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
                        <div className="ms-Grid-col ms-sm4">
                            <TextField
                                label="Phone #"
                                styles={getInputHighlightedStyles}
                                {...formik.getFieldProps('phoneNumber')}
                                errorMessage={
                                    formik.touched.phoneNumber && formik.errors.phoneNumber
                                        ? formik.errors.phoneNumber
                                        : null
                                }
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm8">
                            <TextField
                                label="Email:"
                                styles={getInputHighlightedStyles}
                                {...formik.getFieldProps('email')}
                                errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                            />
                        </div>
                    </div>
                </div>

                <TextField
                    label="Address Line 1:"
                    styles={getInputHighlightedStyles}
                    {...formik.getFieldProps('addressLine1')}
                    errorMessage={
                        formik.touched.addressLine1 && formik.errors.addressLine1 ? formik.errors.addressLine1 : null
                    }
                />

                <TextField
                    label="Address Line 2:"
                    styles={getInputHighlightedStyles}
                    {...formik.getFieldProps('addressLine2')}
                    errorMessage={
                        formik.touched.addressLine2 && formik.errors.addressLine2 ? formik.errors.addressLine2 : null
                    }
                />

                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4">
                            <TextField
                                label="City:"
                                styles={getInputHighlightedStyles}
                                {...formik.getFieldProps('city')}
                                errorMessage={formik.touched.city && formik.errors.city ? formik.errors.city : null}
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm4">
                            <Dropdown styles={dropdownStyles} placeholder="State" options={options} label="State:" />
                        </div>

                        <div className="ms-Grid-col ms-sm4">
                            <TextField
                                label="Zip:"
                                styles={getInputHighlightedStyles}
                                {...formik.getFieldProps('zip')}
                                errorMessage={formik.touched.zip && formik.errors.zip ? formik.errors.zip : null}
                            />
                        </div>
                    </div>
                </div>

                <TextField
                    label="Driver Licence Number [Or any Other Government Issue Photo Id]"
                    styles={getInputStyles}
                    placeholder="XXXXXXXXX"
                    {...formik.getFieldProps('driverLicenseNumber')}
                    errorMessage={
                        formik.touched.driverLicenseNumber && formik.errors.driverLicenseNumber
                            ? formik.errors.driverLicenseNumber
                            : null
                    }
                />

                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <img
                                style={{
                                    width: '245px',
                                    height: '125px',
                                    borderRadius: '8px',
                                    opacity: 1,
                                }}
                                alt=""
                                src="/images/image2.png"
                            />
                        </div>

                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                            <img
                                style={{
                                    width: '245px',
                                    height: '125px',
                                    borderRadius: '8px',
                                    opacity: 1,
                                }}
                                alt=""
                                src="/images/image1.png"
                            />
                        </div>
                    </div>
                </div>

                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton text="Temp Lock" styles={buttonStylesAccept} />
                        </div>

                        <div className="ms-Grid-col ms-sm6">
                            <PrimaryButton text="Continue" styles={buttonStylesDecline} />
                        </div>
                    </div>
                </div>

                <DefaultButton text="Exit" styles={exitButtonStyles} />

                <Link
                    href="/auth/signup"
                    style={{
                        font: 'normal normal bold 16px/20px Montserrat',
                        textAlign: 'center',
                    }}>
                    Request Password Change
                </Link>
            </form>
        </Layout>
    );
};
function getInputStyles(props) {
    const { required } = props;
    return {
        root: {
            paddingBottom: '15px',
        },
        field: {
            borderRadius: '8px',
        },
        label: {
            display: 'none',
        },
        revealButton: {
            height: '45px',
        },
        fieldGroup: [
            {
                height: '48px',
                border: '1px solid #C4C4C4',
                borderRadius: '8px',
            },
            required && {
                borderTopColor: props.theme.semanticColors.errorText,
            },
        ],
        errorMessage: {
            bottom: '-4px',
            paddingTop: 0,
            position: 'absolute',
        },
        subComponentStyles: {
            label: getLabelStyles,
        },
    };
}

function getInputHighlightedStyles(props) {
    const { required } = props;
    return {
        root: {
            paddingBottom: '15px',
        },
        field: {
            borderRadius: '8px',
        },
        label: {
            display: 'none',
        },
        revealButton: {
            height: '45px',
        },
        fieldGroup: [
            {
                height: '48px',
                border: '1px solid #C4C4C4',
                borderRadius: '8px',
                background: '#00B1FF1A 0% 0% no-repeat padding-box',
            },
            required && {
                borderTopColor: props.theme.semanticColors.errorText,
            },
        ],
        errorMessage: {
            bottom: '-4px',
            paddingTop: 0,
            position: 'absolute',
        },
        subComponentStyles: {
            label: getLabelStyles,
        },
    };
}

function getLabelStyles(props) {
    const { required } = props;
    return {
        root: [
            {
                textAlign: 'left',
                font: 'normal normal 600 20px/18px Montserrat',
                letterSpacing: 0,
                color: '#000000',
            },
            required && {
                color: props.theme.palette.themePrimary,
            },
        ],
    };
}

export default customerEdit;
