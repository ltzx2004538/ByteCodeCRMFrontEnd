import React from 'react';
// import RegLogo from './components/RegLogo';
import SignUpform from '../../components/SignUpForm';
import './SignUpPage.scss';

const SignUpPage = () => (
    <div className="signUpPage">
        <div className="signUpPage__wrapper">
            <div className="signUpPage__wrapper__sideBar">
                <div className="signUpPage__wrapper__sideBar__top">
                    <span className="top__logo">
                        ByteCode
                    </span>
                </div>
                <div className="signUpPage__wrapper__sideBar__content">
                    <span className="text">
                        ByteCode CRM is 100% free.
                        <strong className="text--Strong">Forever.</strong>
                    </span>   
                </div>
            </div>

            <div className="signUpPage__wrapper__form">
                <SignUpform />
            </div>
        </div>
    </div>
);
export default SignUpPage;
