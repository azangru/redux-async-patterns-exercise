import fetch from 'isomorphic-fetch';

export const login = function (credentials) {
    return fetch('http://localhost:3000/api/login', {
        method: 'POST',
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
