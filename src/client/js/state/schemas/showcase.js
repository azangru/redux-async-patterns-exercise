// examples: 
// - https://github.com/paularmstrong/normalizr,
// - http://www.robinwieruch.de/the-soundcloud-client-in-react-redux-normalizr/
// - https://medium.com/@mcowpercoles/using-normalizr-js-in-a-redux-store-96ab33991369

import { Schema, arrayOf } from 'normalizr';

const showcase = new Schema('showcases');
const tab = new Schema('tabs');
const resource = new Schema('resources');
const card = new Schema('cards');

showcase.define({
    tabs: arrayOf(tab)
});

tab.define({
    resources: arrayOf(resource)
});

resource.define({
    results: arrayOf(card)
});
