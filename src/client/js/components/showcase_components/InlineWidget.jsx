import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '~/state/action_creators';


function mapDispatchToProps(dispatch) {
    return {
        showcaseActions: bindActionCreators(Actions, dispatch),
    };
}

export class InlineWidget extends Component {

    // props will include an array of cards
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }

    buildCards() {
        return this.props.cards.map((card, index) => {
            card = this.standardizeCard(card);
            return (
                <article key={index} className='videocard'>
                    <div className='item-preview'>
                        <img src={card.thumbnail_url} className='item-preview-image'></img>
                    </div>
                    <div className='card-info'>
                        <div className='video-title'>
                            {card.title}
                        </div>
                        <div className='video-description'>
                            {card.description}
                        </div>

                    </div>
                </article>
            );
        });
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
    
    loadMore() {
        if (this.props.widgetData.has_next) {
            const payload = {
                id: this.props.widgetData.id,
                url: this.props.widgetData.next
            };
            this.props.showcaseActions.loadCardsForResources([payload]);
        }
    }

    render() {
        const cards = this.buildCards();
        if (!cards.length) {
            return null;
        } else {
            return (
                <div>
                    <div>Right</div>
                    <div>
                        {cards}
                    </div>
                    <div>Left</div>
                    <button onClick={this.loadMore}>Load More</button>
                </div>
            );
        }
    }
}



export default connect(
  null,
  mapDispatchToProps
)(InlineWidget);
