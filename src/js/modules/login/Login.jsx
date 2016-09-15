import React, {Component} from 'react';

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
