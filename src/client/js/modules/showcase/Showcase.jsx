import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '~/state/action_creators';
import {fetchShowcase as fetchShowcaseSaga} from '~/state/sagas';
import InlineWidget from '~/components/showcase_components/InlineWidget';
import RegularCardsContainer from '~/components/showcase_components/RegularCardsContainer';

function mapStateToProps(state) {
    return {
        showcases: state.showcaseReducer
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
        let {showcase, tab} = this.props.params;
        this.props.showcaseActions.getShowcase({showcase, tab});
    }

    buildInlineWidgets() {
        if (!this.props.showcases.entities || !this.props.showcases.entities.resources) {
            return null;
        }

        const activeTab = this.props.showcases.entities.tabs[this.props.showcases.activeTabId];
        const resourceIds = activeTab.resources;
        const resources = resourceIds.map((id) => this.props.showcases.entities.resources[id]);
        const inlineWidgets = resources.filter((resource) => resource.inline_widget)
            .map((widgetData) => (
                <InlineWidget
                    key={widgetData.id}
                    widgetData={widgetData}
                    cards={this.selectCards(widgetData.results)}
                />
            ));

        return inlineWidgets;
    }

    buildRegularCardsContainer() {
        if (!this.props.showcases.entities || !this.props.showcases.entities.resources) {
            return null;
        }

        const activeTab = this.props.showcases.entities.tabs[this.props.showcases.activeTabId];
        const resourceIds = activeTab.resources;
        const resources = resourceIds.map((id) => this.props.showcases.entities.resources[id]);
        const regularResources = resources.filter((resource) => {
            return !resource.inline_widget
                    && resource.content_type.model !== 'iframewidget'
                    && resource.content_type.model !== 'subscriptionwidget';
        });
        const regularResourceCards = regularResources.map((resource) => this.selectCards(resource.results))
            .reduce((accumulator, currentCardsArray) => (accumulator.concat(currentCardsArray)), []);
        return <RegularCardsContainer cards={regularResourceCards} />;
    }

    selectCards(ids) {
        if (!ids) {
            return [];
        }
        return ids.map((id) => this.props.showcases.entities.cards[id]);
    }

    render() {
        const inlineWidgets = this.buildInlineWidgets();
        this.buildRegularCardsContainer();
        // const cards = this.buildCards();
        return (
            <div>
                <h1>Here is a list of video cards</h1>
                {inlineWidgets}
                <div>
                    Here will be non-widget cards <br />
                    {this.buildRegularCardsContainer()}
                </div>
            </div>
        );
    }
}

/**
* Preload function gets 2 arguments from server.js:
* - renderProps.params (which are router params)
* - request object from Express.js
*/
Showcase.preload = (routeParams, request) => {
    return [
        [fetchShowcaseSaga, {payload: routeParams}]
    ];
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Showcase);
