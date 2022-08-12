import React from 'react';
import Layout from '../../components/Layout/Pre';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { PrimaryButton, Label } from '@fluentui/react';

const Countries = (props) => {
    const router = useRouter();
    const buttonStyles = {
        root: {
            height: '48px',
            borderRadius: '8px',
            width: '460px',
            background: '#E5E5E5 0% 0% no-repeat padding-box',
            opacity: 1,
        },
        label: {
            textAlign: 'center',
            font: 'normal normal 700 20px/15px Montserrat',
            letterSpacing: '0.2px',
            textTransform: 'uppercase',
        },
    };

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

    return (
        <Layout title="Countries List">
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
                COUNTRIES WE SERVE
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
                <div
                    className="ms-Grid"
                    dir="ltr"
                    style={{
                        padding: '30px 0 0 0',
                    }}>
                    {props.data && props.data.length > 0
                        ? props.data.map((country) => {
                              return (
                                  <>
                                      <div className="ms-Grid-row" style={{ paddingBottom: '20px' }}>
                                          <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                                              <Label style={labelStyles}>{country.CountryKey}</Label>
                                          </div>
                                          <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                                              <Label style={labelStyles}>{country.CountryName}</Label>
                                          </div>

                                          <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                                              <Label style={labelStyles}>{country.CountryName}</Label>
                                          </div>
                                          <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                                              <Label style={labelStyles}>{country.CountryDescription}</Label>
                                          </div>
                                      </div>
                                  </>
                              );
                          })
                        : ''}
                </div>

                <PrimaryButton text="Back" onClick={() => router.back()} styles={buttonStyles} />
            </div>
        </Layout>
    );
};

export async function getServerSideProps() {
    let country = await fetch(`/api/country`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    country = await country.json();

    return {
        props: {
            data: country.data,
        },
    };
}

Countries.propTypes = {
    data: PropTypes.any,
};

export default Countries;
