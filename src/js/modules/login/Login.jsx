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
        greetingActions: bindActionCreators(Actions, dispatch),
    };
}

export class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>This is the login page</h1>
                <label>
                    <input
                      type="text"
                    />
                    username
                </label>
                <label>
                    <input
                      type="password"
                    />
                    password
                </label>
                <button>Log in</button>
            </div>
        );
    }
}


export default Login;
