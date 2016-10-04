import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchUser as fetchUserSaga} from '~/state/sagas/userSagas';

import Header from '~/components/header/Header';


function mapStateToProps(state) {
    return {
        user: state.userReducer
    };
}

export class Layout extends Component {

    constructor(props) {
        super(props);
    }

    greet() {
        if (!this.props.user.authenticated) {
            return 'world';
        } else {
            return this.props.user.name;
        }
    }

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

/**
* Preload function gets 2 arguments from server.js:
* - renderProps.params (which are router params)
* - request object from Express.js
*/
Layout.preload = (routeParams, request) => {
    return [
        [fetchUserSaga, request.headers.cookie]
    ];
};

export default connect(
  mapStateToProps, null
)(Layout);
