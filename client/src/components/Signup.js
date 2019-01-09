import React, {Component} from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton.js";

const SignupStyle = {
    padding: "60px 0",
    margin: "0 auto",
    maxWidth: "320px",
    fontSize: "14px",
    paddingBottom: "10px",
    color: "#999"
};

const formStyle = {
    margin: "0 auto",
    maxWidth: "320px",
    fontSize: "14px",
    paddingBottom: "10px",
    color: "#999"
}

const helpBlockStyle = {
    fontSize: "14px",
    paddingBottom: "10px",
    color: "#999"
};


export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.lenght > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    // handleSubmit = async event => {
    //     event.preventDefault();

    //     this.setState({isLoading: true});

    //     try {
    //         const newUser = await Auth.signUp({
    //             username: this.state.email,
    //             password: this.state.password
    //         });
    //         this.setState({
    //             newUser
    //         });
    //     } catch (e) {
    //         alert(e.message);
    //     }
    //     this.setState({isLoading: false});
    // }

    // handleConfirmationSubmit = async event => {
    //     event.preventDefault();

    //     this.setState({ isLoading: true });

    //     try {
    //         await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
    //         await Auth.signIn(this.state.email, this.state.password);

    //         this.props.userHasAuthenticated(true);
    //         this.props.history.push("/");
    //     } catch (e) {
    //         alert(e.message);
    //         this.setState({isLoading: false});
    //     }
    // }
    
    renderConfirmationForm() {
        return (
            <form style = {formStyle} onSubmit = {this.handleConfirmationSubmit}>
                <FormGroup controlId = "confirmationCode" bsSize = "large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type = "tel"
                        value = {this.state.confirmationCode}
                        onChange = {this.handleChange}
                    />
                    <HelpBlock style = {helpBlockStyle}>Please check your email for the code!</HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    bsSize = "large"
                    disabled = {this.validateConfirmationForm()}
                    type = "submit"
                    isLoading = {this.state.isLoading}
                    text = "Verify"
                    loadingText = "Verifing..."
                />
            </form>
        );
    }

    renderForm() {
        return (
            <form style = {formStyle} onSubmit = {this.handleSubmit}>
                <FormGroup controlId = "email" bsSize = "large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type = "email"
                        value = {this.state.email}
                        onChange = {this.handleChange}
                    /> 
                </FormGroup>
                <FormGroup controlId = "password" bsSize = "large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value = {this.state.password}
                        onChange = {this.handleChange}
                        type = "password"
                    /> 
                </FormGroup>
                <FormGroup controlId = "confirmPassword" bsSize = "large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value = {this.state.confirmPassword}
                        onChange = {this.handleChange}
                        type = "password"
                    /> 
                </FormGroup>
                <LoaderButton
                    block
                    bsSize = "large"
                    disabled = {!this.validateForm()}
                    type = "submit"
                    isLoading = {this.state.isLoading}
                    text = "Signup"
                    ladingText = "Signing up..."
                />
            </form>
        );
    }

    render() {
        return (
            <div style = {SignupStyle} className = "Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}