import fetch from 'isomorphic-fetch';

export const showcaseFetcher = function () {
    return fetch('https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=titles', {
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
        });
};
