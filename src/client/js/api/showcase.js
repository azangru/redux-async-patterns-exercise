import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import config from '~/../../../config.json';

export const showcaseFetcher = function (showcaseName = 'index') {
    let url = `/api/feeds/${showcaseName}`; // hardcoded, because this is just an example

    // using absolute url on the server and relative url on the client
    if (typeof window === 'undefined') {
        url = config.host + url;
    }

    return fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).catch((e) => {
            console.log('ERROR!', e);
        });
};


export const tabFetcher = function (tab) {
    const resources = tab.resources || [];
    // get an array of promises
    const fetchPromises = resources.map((resource) => {
        let url = resource.url; // https://rutube.ru/api/blah...
        const pathname = new URI(url).pathname(); // /api/blah...

        // using absolute url on the server and relative url on the client
        if (typeof window !== 'undefined') {
            url = pathname;
        }
        return fetchCreator(url);
    });
    return Promise.all(fetchPromises).then((results) => {
        return results;
    }).catch((e) => {
        console.log(`error while fetching tab resources: ${e}`)
    });
};

// A function that returns a Fetch promise for a given url
// (it is implied that the url belongs to a json api)
function fetchCreator (url) {
    return fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).catch((e) => {
            console.log('ERROR!', e);
        });
}
