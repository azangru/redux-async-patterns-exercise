import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// for react server-side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import ClientApp from '../src/js/app';
import clientRoutes from '../src/js/routes';
import configureStore from '../src/js/state/store';


import router from './routes';

let app = express();
let store = configureStore();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);

app.get('*', (req, res) => {
    match({ routes: clientRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
            console.log('redirect location');
        } else if (renderProps) {
            console.log('components', renderProps.components);
          const app = ReactDOMServer.renderToString(
            React.createElement(Provider, {store},
              React.createElement(RouterContext, renderProps)
            )
          )
          res.render('index.ejs', {app});
        //   res.status(200).send(template({body}))
        } else {
          res.status(404).send('not found lol')
        }
    })

});



app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});


export default app;
