import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// for logging purposes
import morgan from 'morgan';
import util from 'util';
import averageCpuUsage from './utils/cpu-usage';

// for react server-side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import clientRoutes from '../client/js/routes';
import configureStore from '../client/js/state/store';
import waitAll from '../client/js/state/sagas/waitAll';

import router from './routes';

let app = express();
app.use(morgan('dev')); // logging

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);

app.get('*', (req, res) => {
    // FOR LOGGING PURPOSES
    const startResponseTimestamp = Date.now();

    let store = configureStore(); // creating a new store every new request
    store.dispatch({
        type: 'GREET',
        payload: {message: "Hello world!"}
    });

    match({ routes: clientRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
            console.log('redirect location');
        } else if (renderProps) {
            const preloaders = renderProps.components
                .filter((component) => component && component.preload)
                .map((component) => component.preload)
                .reduce((result, preloaders) => result.concat(preloaders), []);

            store.runSaga(waitAll(preloaders)).done.then(() => {
                const endApiQueryTimestamp = Date.now();
                
                const app = ReactDOMServer.renderToString(
                    React.createElement(Provider, {store},
                        React.createElement(RouterContext, renderProps)
                    )
                );

                // FOR LOGGING PURPOSES
                const endResponseTimestamp = Date.now();

                averageCpuUsage().then((percentCpuUsage) => {
                    util.log(`time to response from api: ${endApiQueryTimestamp - startResponseTimestamp} ms; time for rendering: ${endResponseTimestamp - endApiQueryTimestamp} ms; total response time: ${endResponseTimestamp - startResponseTimestamp} ms; memory consumption: ${util.inspect(process.memoryUsage())}; CPU usage: ${percentCpuUsage}%`);
                });

                res.render('index.ejs', {app, store: store.getState()});
            });
        } else {
          res.status(404).send('not found lol');
        }
    });

});



app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});


export default app;
