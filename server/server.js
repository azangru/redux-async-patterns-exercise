import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import router from './routes';

let app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, '../dist')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});


export default app;
