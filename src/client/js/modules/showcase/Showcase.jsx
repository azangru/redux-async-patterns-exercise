import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '~/state/action_creators';
import {fetchShowcase as fetchShowcaseSaga} from '~/state/sagas';

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
        let {showcase, tab} = this.props.params;
        this.props.showcaseActions.getShowcase({showcase, tab});
    }

    buildCards() {
        if (this.props.showcase.entities && this.props.showcase.entities.cards) {
            return Object.keys(this.props.showcase.entities.cards)
                .map((key) => this.props.showcase.entities.cards[key])
                .map((card, index) => {
                    card = this.standardizeCard(card);
                    return (
                        <article key={index} style={styles.card.card}>
                            <div className='item-preview' style={styles.card.imageContainer}>
                                <img src={card.thumbnail_url} style={styles.card.image}></img>
                            </div>
                            <div className='card-info'>
                                <div className='video-title' style={styles.card.videoTitle}>
                                    {card.title}
                                </div>
                                <div className='video-description'>
                                    {card.description}
                                </div>

                            </div>
                        </article>    
                    );
                });
        } else {
            return null;
        }
    }
    
    standardizeCard(card) {
        if (card.video) {
            return card.video;
        } else if (card.object) {
            return Object.assign({}, card.object,
                {title: card.object.name, thumbnail_url: card.picture}
            );
        } else {
            if (card.picture && !card.thumbnail_url){
                card.thumbnail_url = card.picture;
            }
            return card;
        }
    }

    render() {
        const cards = this.buildCards();
        return (
            <div>
                <h1>Here is a list of video cards</h1>
                <div>
                    {cards}
                </div>
            </div>
        );
    }
}

const styles = {
    card: {
        card: {
            display: 'inline-block',
            width: '232px',
            height: '298px',
            overflowY: 'hidden',
            verticalAlign: 'top',
            margin: '0 20px 20px',
            borderRadius: '6px'
        },
        imageContainer: {
            width: '232px',
            height: '131px',
            borderRadius: '8px 8px 0 0',
        },
        image: {
            width: '100%',
            height: '100%'
        },
        videoTitle: {
            fontWeight: 'bold',
            marginBottom: '1em'
        }
    }
};

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
