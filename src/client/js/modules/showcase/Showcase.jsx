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
        this.props.showcaseActions.getShowcase();
    }

    render() {
        const cards = this.props.showcase.cards.map((card, index) => (
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
        ));
        return (
            <div>
                <h1>Here is a list of video cards</h1>
                <ul>
                    {cards}
                </ul>
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


Showcase.preload = [fetchShowcaseSaga];

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Showcase);
