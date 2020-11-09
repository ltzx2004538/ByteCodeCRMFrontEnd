import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RegisterUser } from '../../../Api/User';
import GoogleIcon from '../../../../img/logsys/googleIcon.svg';

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
    response.then(response=>{
      if (response.status === 200){
        this.props.history.push('/login'); 
      }
    }).catch((error) =>{
      const errorMsg = error.response.data;
      this.setState({
        error: errorMsg,
      })
    });
  };

  render() {
    return (
      <div className="reg-formContainer">
        <form className="regForm" action="" onSubmit={this.handleSubmit}>
          <p className="asking">
            Have an account?&nbsp;
            <Link className="reg-signInLink" to="/login">
              Sign in
            </Link>
          </p>
          <h3>Create your free account</h3>
          <span className="slogan">Free forever. No credit card needed</span>
          <div className="googleSignUpWrapper">
            <img className="googleIcon" src={GoogleIcon} alt="" />
            <button className="googleSignUpBtn">Sign up with google</button>
          </div>
          <hr />
          <label className="reg-inputLabel" htmlFor="firstname">
            First Name
          </label>
          <br />
          <input
            className="reg-firstNameInput"
            type="text"
            onChange={this.handleOnFirstnameChange}
            id="firstname"
            name="firstname"
            value={this.state.newUser.firstname}
          />
          <span className="reg-errMsg">
            {' '}
            {this.state.firstnameErrMsg}
            {' '}
          </span>
          <br />
          <label className="reg-inputLabel" htmlFor="lastname">
            Last Name
          </label>
          <br />
          <input
            className="reg-lastNameInput"
            type="text"
            onChange={this.handleOnLastnameChange}
            id="lastname"
            name="lastname"
            value={this.state.newUser.lastname}
          />
          <span className="reg-errMsg">
            {' '}
            {this.state.lastnameErrMsg}
            {' '}
          </span>
          <br />
          <label className="reg-inputLabel" htmlFor="email">
            Email address
          </label>
          <br />
          <input
            className="reg-emailInput"
            type="text"
            onChange={this.handleOnEmailChange}
            id="email"
            name="email"
            value={this.state.newUser.email}
          />
          <span className="reg-errMsg">
            {' '}
            {this.state.emailErrMsg}
            {' '}
          </span>
          <br />
          <label className="reg-inputLabel" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="reg-pwdInput"
            type="password"
            onChange={this.handleOnPasswordChange}
            id="password"
            name="password"
            value={this.state.newUser.password}
          />
          <span className="reg-errMsg">{this.state.passwordErrMsg}</span>
          <br />
          <button className="reg-submitBtn" onClick={this.handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(RegisterForm);
