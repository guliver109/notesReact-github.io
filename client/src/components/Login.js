import React, {Component} from "react";
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton.js"

// @media all and (min-width: "480px") {}

const LoginStyle = {
    padding: "60px 0",
    margin: "0 auto",
    maxWidth: "320px"
};

const formForm = {
    margin: "0 auto",
    maxWidth: "320px"
}

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.lenght > 0 && this.state.password.length > 0;
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
    //         await Auth.signIn(this.state.email, this.state.password);
    //              this.props.userHasAuthenticated(true);
    //                this.props.history.push("/");
    //     } catch (e) {
    //         alert (e.message);
    //         this.setState({ isLoading: false});
    //     }
    // }

    render() {
        return (
            <div style = {LoginStyle} className = "Login">
                <form style = {formForm} onSubmit = {this.handleSubmit}>
                    <FormGroup controlId = "email" bsSize = "large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type = "email"
                            value = {this.state.email}
                            onChange = {this.state.handleChange}
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
                    <LoaderButton
                        block
                        bsSize = "large"
                        disabled = {!this.validateForm()}
                        type = "submit"
                        isLoading = {this.state.isLoading}
                        text = "Login"
                        loadingText = "Logging in..."
                    >
                        Login
                    </LoaderButton>
                </form>
            </div>
        );
    }
}