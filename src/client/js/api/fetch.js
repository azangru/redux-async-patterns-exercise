import fetch from 'isomorphic-fetch';
import omit from 'lodash/omit';
import URI from 'urijs';
import config from '~/../../../config.json';

export default function (url, options={}) {
    url = prepareUrl(url);

    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const headers = options.headers ? 
        Object.assign({}, defaultHeaders, options.headers) : defaultHeaders;
    
    const fetchOptions = {
        headers,
        credentials: 'include'
    };
    Object.assign(fetchOptions, omit(options, headers));

    return fetch(url, fetchOptions)
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).catch((e) => {
            console.log('ERROR!', e);
        });
}

const prepareUrl = (url) => {
    // we strip away the host name on the client (always using relative urls to avoid CORS)
    // and add the host name on the server (because the server needs absolute urls)
    const uri = new URI(url);
    const pathname = `${uri.pathname()}${uri.search()}`; // /api/blah...

    if (typeof window === 'undefined') {
        url = config.host + pathname;
    } else {
        url = pathname;
    }
    return url;
};
