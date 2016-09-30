import fetch from 'isomorphic-fetch';
import config from '~/../../../config.json';

export const login = function (credentials) {
    return fetch('/api/accounts/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });
};

export const logout = function () {
    return fetch('/api/accounts/logout/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return true;
        });
};

/**
* @param cookies — optional; is provided during server-side rendering
*/
export const getUser = function (cookies) {
    let url = '/api/accounts/visitor/';

    // using absolute url on the server and relative url on the client
    if (typeof window === 'undefined') {
        url = config.host + url;
    }

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    // if request is made from the server side, add cookies to the request
    if (cookies) {
        headers.cookie = cookies;
    }

    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: headers
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } else if (response.status === 204) {
                // user is not authenticated
                return false;
            }
            return response.json().then((user) => {
                return user;
            });
        });    
};
