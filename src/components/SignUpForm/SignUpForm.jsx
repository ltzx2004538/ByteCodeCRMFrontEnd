import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RegisterUser } from '../Api/User';
import SignUpFormInput from './components/SignUpFormInput/';
import GoogleIcon from '../../img/logsys/googleIcon.svg';
import './SignUpForm.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      error: null,
      firstnameErrMsg: '',
      lastnameErrMsg: '',
      emailErrMsg: '',
      passwordErrMsg: '',
    };
    this.handleOnFirstnameChange = this.handleOnFirstnameChange.bind(this);
    this.handleOnLastnameChange = this.handleOnLastnameChange.bind(this);
    this.handleOnEmailChange = this.handleOnEmailChange.bind(this);
    this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnFirstnameChange(e) {
    const { value } = e.target;
    this.setState(
      (prevState) => ({
        newUser: {
          ...prevState.newUser,
          firstName: value,
        },
      }),
      () => console.log(this.state.newUser),
    );
  }

  handleOnLastnameChange(e) {
    const { value } = e.target;
    this.setState(
      (prevState) => ({
        newUser: {
          ...prevState.newUser,
          lastName: value,
        },
      }),
      () => console.log(this.state.newUser),
    );
  }

  handleOnEmailChange(e) {
    const { value } = e.target;
    this.setState(
      (prevState) => ({
        newUser: {
          ...prevState.newUser,
          email: value,
        },
      }),
      () => console.log(this.state.newUser),
    );
  }

  handleOnPasswordChange(e) {
    const { value } = e.target;
    this.setState(
      (prevState) => ({
        newUser: {
          ...prevState.newUser,
          password: value,
        },
      }),
      () => console.log(this.state.newUser),
    );
  }

  validate() {
    let emailErrMsg = '';
    let passwordErrMsg = '';
    let firstnameErrMsg = '';
    let lastnameErrMsg = '';

    if (!this.state.newUser.firstname) {
      firstnameErrMsg = 'Please enter your firstname.';
    }

    if (!this.state.newUser.lastname) {
      lastnameErrMsg = 'Please enter your lastname';
    }

    if (!this.state.newUser.email) {
      emailErrMsg = 'Email cannot be blank..';
    } else if (typeof this.state.newUser.email !== 'undefined') {
      const emailPattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );

      if (!emailPattern.test(this.state.newUser.email)) {
        emailErrMsg = 'Enter valid email format.';
      }
    }

    if (!this.state.newUser.password) {
      passwordErrMsg = 'Password cannot be blank.';
    } else if (typeof this.state.newUser.password !== 'undefined') {
      const passwordPattern = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
      );

      if (!passwordPattern.test(this.state.newUser.password)) {
        passwordErrMsg = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
      }
    }

    if (firstnameErrMsg || lastnameErrMsg || emailErrMsg || passwordErrMsg) {
      this.setState({
        firstnameErrMsg,
        lastnameErrMsg,
        emailErrMsg,
        passwordErrMsg,
      });
      return false;
    }

    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        firstnameErrMsg: '',
        lastnameErrMsg: '',
        emailErrMsg: '',
        passwordErrMsg: '',
      });
    }
    const body = this.state.newUser;
    const response = RegisterUser(body);
    response.then(response => {
      if (response.status === 200) {
        this.props.history.push('/login');
      }
    }).catch((error) => {
      const errorMsg = error.response.data;
      this.setState({
        error: errorMsg,
      })
    });
  };

  render() {
    return (
      <div className="signUpForm">
        <div className="signUpForm__wrapper">
          <div className="signUpForm__wrapper__top">
            <div className="signUpFormTop__header">
              <p className="signUpFormTop__header__label">
                Have an account?&nbsp;
              <Link className="signUpFormTop__header__link" to="/login">
                  Sign in
              </Link>
              </p>
            </div>
            <div className="signUpFormTop__body">
              <div className="signUpFormTop__body__layoutHeader">
                <h1>Create your free account</h1>
                <p> Free forever. No credit card needed </p>
              </div>
              <div className="signUpFormTop__body__googleBar">
                <button className="googleBtn">
                  <div className="googleBtn__left">
                    <img className="googleBtn__left__icon" src={GoogleIcon} alt="" />
                  </div>
                  <div className="googleBtn__right">
                    <span className="googleBtn__right__text">
                      Sign up with google
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="signUpForm__wrapper__separator">
            <div className="signUpFormSeparator">
              <span className="signUpFormSeparator__label">Or</span>
            </div>
          </div>

          <SignUpFormInput/>

        </div>
      </div>
    );
  }
}
export default withRouter(RegisterForm);
