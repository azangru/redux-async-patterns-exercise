import React, {Component} from 'react';
import { Link } from 'react-router';

export class Uploader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                This is the main page <br />
            <Link to={'/hashtag-autocompletion-with-draftjs'}>Check out the page with hashtag autocompletion</Link> <br/>
            <Link to={'/login'}>Log in</Link> <br/>
            <Link to={'/showcase'}>Main showcase titles</Link>
            </div>
        );
    }
}


export default Uploader;
