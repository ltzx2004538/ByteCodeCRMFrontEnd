import React from 'react';
import { components } from 'react-select';
import './SignUpFormInput.scss';



class SignUpFormInput extends React.Component {
    constructor(props) {
        super(props);
        const { firstName, lastName, email } = this.props;
        this.state = {
            firstName,
            lastName,
            email,
        }
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(event, type) {
        event.preventDefault();
        if (type == "first") {
            this.props.handleOnFirstnameChange(event.target.value);
        }
        else {
            this.props.handleOnLastnameChange(event.target.value);
        }
    }

    render() {
        return (
            <div className="signUpFormInput">
                <form className="signUpFormInput__form" onSubmit={this.handleSubmit}>
                    <div className="signUpFormInput__form__top">
                        <input
                            className="signUpFormInput__form__top__name"
                            placeholder="First Name"
                            type="text"
                            onChange={(e) => this.onNameChange(e, "first")}
                            id="firstname"
                            name="firstname"
                            value={this.state.firstName}
                        />

                        <input
                            className="signUpFormInput__form__top__name"
                            placeholder="Last Name"
                            type="text"
                            onChange={(e) => this.onNameChange(e, "last")}
                            id="lastName"
                            name="lastName"
                            value={this.state.lastName}
                        />
                    </div>
                    <div className="signUpFormInput__form__bottom">
                        <input
                            className="signUpFormInput__form__bottom__email"
                            placeholder="Email address"
                            type="text"
                            onChange={(e) => this.onNameChange(e, "last")}
                            id="lastName"
                            name="lastName"
                            value={this.state.lastName}
                        />
                    </div>
                </form>
                <button className="signUpFormInput__submitBtn">
                    <span className="signUpFormInput__submitBtn__label">
                        {'Next  >'}
                    </span>
                </button>
                <div className="signUpFormInput__footer">
                    <span>
                        {`By continuing, you're agreeing to the `}
                        <a>
                            HubSpot Customer Terms of Service
                        </a>
                         {` and `}
                        <a>
                            Privacy Policy
                        </a>
                    </span>

                </div>
            </div>
        )
    }
}

export default SignUpFormInput;