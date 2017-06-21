import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import routes from '../routes';

const app = express();
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/wx');
}


app.use(bodyParser.json()); // must be placed above routes call!!
routes(app);

// app.use(express.static( __dirname + '/client/public'));

module.exports = app;
