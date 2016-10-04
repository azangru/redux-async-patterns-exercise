import fetch from './fetch';

export const login = function (credentials) {
    return fetch('/api/accounts/login/', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
};

export const logout = function () {
    return fetch('/api/accounts/logout/');
};


/**
* @param cookies — optional; is provided during server-side rendering
*/
export const getUser = function (cookies) {
    let url = '/api/accounts/visitor/';

    let headers = {};

    // if request is made from the server side, add cookies to the request
    if (cookies) {
        headers.cookie = cookies;
    }

    return fetch(url, {headers});
};
