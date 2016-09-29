import React, {Component} from 'react';
import { Link } from 'react-router';
import Showcase from '~/modules/showcase/Showcase';

export class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                This is the main page <br />
            <Link to={'/hashtag-autocompletion-with-draftjs'}>Check out the page with hashtag autocompletion</Link> <br/>
            <Link to={'/login'}>Log in</Link> <br/>
            <Showcase {...this.props} />
            </div>
        );
    }
}

Main.preload = Showcase.preload;

export default Main;
