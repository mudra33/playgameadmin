import React from 'react';
import Layout from '../../components/Layout/Pre';
import { PrimaryButton, ChoiceGroup, Text, Label, DefaultButton } from '@fluentui/react';

const internationalEca = () => {
    const labelStyles = {
        root: {
            letterSpacing: 0,
            color: '#000000',
            textAlign: 'left',
            fontSize: '22px',
            fontWeight: 500,
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
        },
    };

    const textStyles = {
        root: {
            color: '#000000',
            letterSpacing: 0,
            textAlign: 'left',
            fontSize: '22px',
            fontWeight: 600,
            lineHeight: '30px',
            font: 'normal normal',
            fontFamily: "'Montserrat', sans-serif",
        },
    };
    const buttonStyles = {
        root: {
            width: '100%',
            height: '48px',
            boxShadow: '0px 15px 40px #1C283129',
            borderRadius: '8px',
        },
        label: {
            textAlign: 'center',
            font: 'normal normal 700 20px/15px Montserrat',
            letterSpacing: '0.2px',
        },
    };
    const exitButtonStyles = {
        root: {
            width: '100%',
            height: '48px',
            marginRight: '10px',
            borderRadius: '8px',
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
    const choiceGroupStyles = {
        root: { paddingBottom: '20px' },
        label: {
            color: '333333',
            textAlign: 'left',
            letterSpacing: '0.2px',
            fontSize: '20px',
            lineHeight: '18px',
            fontWeight: 'medium',
            fontFamily: "'Montserrat'",
            marginRight: '10px',
        },
        flexContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
    };

    const choiceGroupOptionStyles = {
        field: {
            color: '#333333',
            fontWeight: 600,
            letterSpacing: 0,
            fontSize: '20px',
            lineHeight: '18px',
            textAlign: 'center',
            paddingLeft: 0,
            fontFamily: "'Montserrat'",
            ':before': {
                display: 'none',
            },
            ':after': {
                display: 'none',
            },
            '.ms-ChoiceFieldLabel': {
                paddingLeft: '0 !important',
            },
        },
        choiceFieldWrapper: {
            width: ' 160px',
            height: '107px',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            border: ' 1px solid #C4C4C4',
            background: '#F4F4F4 0% 0% no-repeat padding-box',
            'label.is-checked': {
                width: ' 160px',
                height: '107px',
                display: 'flex',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                border: ' 1px solid #C4C4C4',
                background: '#00B1FF1A 0% 0% no-repeat padding-box',
            },
        },
        selectedImageWrapper: {
            background: 'red',
        },
    };

    const options = [
        { key: '$20', text: '$20', styles: choiceGroupOptionStyles },
        { key: '$30', text: '$30', styles: choiceGroupOptionStyles },
        { key: '$40', text: '$40', styles: choiceGroupOptionStyles },
        { key: '$50', text: '$50', styles: choiceGroupOptionStyles },
        { key: '$60', text: '$60', styles: choiceGroupOptionStyles },
        { key: '$70', text: '$70', styles: choiceGroupOptionStyles },
        { key: '$80', text: '$80', styles: choiceGroupOptionStyles },
        { key: '$90', text: '$90', styles: choiceGroupOptionStyles },
        { key: '$100', text: '$100', styles: choiceGroupOptionStyles },
    ];
    return (
        <Layout title="Auth International Long Distance ECA">
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
                International
                <br /> Long Distance
            </h1>

            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
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
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Label styles={labelStyles}>Name:&nbsp;</Label>
                                    <Text styles={textStyles}> Xxxxx Xxxxxxx</Text>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                    }}>
                                    <Label styles={labelStyles}>Add Funds to Phone&nbsp;</Label>
                                    <Text styles={textStyles}>#XXX-XXX-XXXX</Text>
                                </div>
                            </div>
                        </div>

                        <ChoiceGroup
                            label="AMOUNT TO ADD"
                            options={options}
                            styles={choiceGroupStyles}
                            optionsContainIconOrImage={false}
                        />

                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6">
                                <DefaultButton text="Exit" styles={exitButtonStyles} />
                            </div>

                            <div className="ms-Grid-col ms-sm6">
                                <PrimaryButton text="Continue" styles={buttonStyles} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default internationalEca;
