import React, {Component} from 'react';
import { connect } from 'react-redux';


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
                Hello {this.greet()}!
                {this.props.children}
            </div>
        );
    }
}


export default connect(
  mapStateToProps, null
)(Layout);
