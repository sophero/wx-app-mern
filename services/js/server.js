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
//
// app.listen(3000, () => {
//     console.log('App listening on port 3000!');
// });

module.exports = app;

// var logError = (error) => {
//     if (error) {
//         throw error;
//     }
// }

// var server = () => {
//     app.use(express.static( __dirname + '/client/public'));
//
//     app.get('/get/all', (request, response) => {
//         toDoModel.find((error, todos) => {
//             logError(error);
//             response.send(todos);
//         });
//     });
//
//     app.get('/save/:todo', (request, response) => {
//         let { todo } = request.params; // able to use this because params.todo << same variable name. assigns value of params.todo to variable todo.
//         new toDoModel({todo}).save((error, savedToDo) => {
//             logError(error);
//             response.send(savedToDo);
//         });
//     });
//
//     app.get('/remove/:date', (request, response) => {
//         let { date } = request.params;
//         toDoModel.remove({date}, (error, deletedToDo) => {
//             logError(error);
//             response.send(deletedToDo);
//         });
//     });
//
//     app.listen(3000, () => {
//         console.log('App listening on port 3000!');
//     });
// }

// export default server;
