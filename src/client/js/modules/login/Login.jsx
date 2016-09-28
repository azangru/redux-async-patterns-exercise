import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '~/state/action_creators';

function mapStateToProps(state) {
    return {
        user: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(Actions, dispatch),
    };
}

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.bindFunctions();
    }
    
    bindFunctions() {
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    changeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleClick() {
        this.props.loginActions.login({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <div>
                <h1>This is the login page</h1>
                <label>
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.changeEmail}
                    />
                    email
                </label>
                <label>
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.changePassword}
                    />
                    password
                </label>
                <button
                    onClick={this.handleClick}
                >Log in</button>
            </div>
        );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
