import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
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

export class Header extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.loginActions.logout();
    }

    loginOrLogoutLink () {
        if (!this.props.user.authenticated) {
            return <Link to={'/login'}>Log in</Link>;
        } else {
            return <a href="#" onClick={this.logout}>Logout</a>;
        }
    }

    render() {
        return (
            <div>
                <span>HEADER</span>
                <span>UPLOAD</span>
                {this.loginOrLogoutLink()} <br/>
            </div>
        );
    }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Header);
