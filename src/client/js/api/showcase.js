import fetch from './fetch';

export const showcaseFetcher = function (showcaseName = 'index') {
    let url = `/api/feeds/${showcaseName}`; // hardcoded, because this is just an example
    return fetch(url);
};

export const resourcesFetcher = function (urls) {
    const fetchPromises = urls.map(url => fetch(url));
    return Promise.all(fetchPromises).then((results) => {
        return results;
    }).catch((e) => {
        console.log(`error while fetching tab resources: ${e}`);
    });
};
