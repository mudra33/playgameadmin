import React from 'react';
import Layout from '../../components/Layout/Pre';
import { PrimaryButton, ChoiceGroup, Text, Label, DefaultButton } from '@fluentui/react';

const FreeSweepStakes = () => {
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

    const choiceGroupStyles = {
        root: { paddingBottom: '20px' },
        label: {
            color: '333333',
            textAlign: 'center',
            letterSpacing: '0.2px',
            fontSize: '20px',
            lineHeight: '18px',
            fontWeight: 'medium',
            fontFamily: "'Montserrat'",
        },
        flexContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
        },
    };

    const choiceGroupOptionStyles = {
        root: {
            ':nth-child(odd)': {
                marginRight: '10px',
            },
        },
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
            width: '245px',
            height: '75px',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #C4C4C4',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            'label.is-checked': {
                width: '245px',
                height: '75px',
                display: 'flex',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #00B1FF',
                background: '#00B1FF1A 0% 0% no-repeat padding-box',
            },
        },
        selectedImageWrapper: {
            background: 'red',
        },
    };

    const options = [
        {
            key: 'Sweeps 1',
            text: 'Sweeps 1',
            styles: choiceGroupOptionStyles,
        },
        {
            key: 'Sweeps 2',
            text: 'Sweeps 2',
            styles: choiceGroupOptionStyles,
        },
        { key: 'Sweeps 3', text: 'Sweeps 3', styles: choiceGroupOptionStyles },
        { key: 'Sweeps 4', text: 'Sweeps 4', styles: choiceGroupOptionStyles },
    ];

    return (
        <Layout title="Auth Free Sweepstakes">
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
                FREE SWEEPSTAKES
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
                        <div
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Label styles={labelStyles}> Thank You,&nbsp;</Label>
                            <Text styles={textStyles}> Xxxxx Xxxxxxx</Text>
                        </div>
                    </div>
                </div>

                <Label styles={labelStyles}>
                    With your purchase you can receive free sweepstakes entries&nbsp;
                </Label>
                <h2
                    style={{
                        textAlign: 'left',
                        font: 'normal normal 600 22px/30px Montserrat',
                        letterSpacing: '0.22px',
                        color: '#000000',
                        textTransform: 'uppercase',
                        opacity: 1,
                    }}>
                    Which Sweepstakes would you like?
                </h2>

                <ChoiceGroup
                    options={options}
                    styles={choiceGroupStyles}
                    optionsContainIconOrImage={false}
                />

                <div className="ms-Grid" dir="ltr">
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
        </Layout>
    );
};

export default FreeSweepStakes;
