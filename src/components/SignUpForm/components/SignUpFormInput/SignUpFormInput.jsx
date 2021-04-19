import React from 'react';
import { components } from 'react-select';
import './SignUpFormInput.scss';



class SignUpFormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
        }
    }

    render() {
        return(
            <div className="signUpForm__wrapper__mid">
            <input
                className="signUpFormMid__name"
                placeholder="First Name"
                type="text"

                id="firstname"
                name="firstname"
                value={this.state.firstName}
            />

            <input
                className="signUpFormMid__name"
                placeholder="Last Name"
                type="text"

                id="lastName"
                name="lastName"
                value={this.state.lastName}
            />
        </div>
        )
    }
}

export default SignUpFormInput;