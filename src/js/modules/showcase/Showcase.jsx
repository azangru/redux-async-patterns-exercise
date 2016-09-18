import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '~/state/action_creators';

function mapStateToProps(state) {
    return {
        showcase: state.showcaseReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showcaseActions: bindActionCreators(Actions, dispatch),
    };
}

export class Showcase extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.showcaseActions.getTitles();
    }

    render() {
        const titles = this.props.showcase.titles.map((title, index) => (
            <li key={index}>{title}</li>
        ));
        return (
            <div>
                <h1>Here is a list of some titles (from Wikipedia)</h1>
                <ul>
                    {titles}
                </ul>
            </div>
        );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Showcase);
