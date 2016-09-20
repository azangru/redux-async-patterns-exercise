import express from 'express';
import fetch from 'isomorphic-fetch';

let router = express.Router();

// this should work basically as a proxy, sending requests to Rutube api and
// passing them back
router.get('*', (req, res) => {
    return fetch(`https://rutube.ru/api${req.path}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            response.json().then((body) => {
                res.send(body);
            });
            // return response.json();
        });
});

export default router;
