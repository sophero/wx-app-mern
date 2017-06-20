import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import axios from 'axios';

const darkSkyApiKey = process.env.DARK_SKY_API_KEY;

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todos');

let toDoModel = mongoose.model('todo', {
    todo: String,
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

var logError = (error) => {
    if (error) {
        throw error;
    }
}

var server = () => {
    app.use(express.static('client/public'));

    app.get('/get/all', (request, response) => {
        toDoModel.find((error, todos) => {
            logError(error);
            response.send(todos);
        });
    });

    app.get('/save/:todo', (request, response) => {
        let { todo } = request.params; // able to use this because params.todo << same variable name. assigns value of params.todo to variable todo.
        new toDoModel({todo}).save((error, savedToDo) => {
            logError(error);
            response.send(savedToDo);
        });
    });

    app.get('/remove/:date', (request, response) => {
        let { date } = request.params;
        toDoModel.remove({date}, (error, deletedToDo) => {
            logError(error);
            response.send(deletedToDo);
        });
    });

    app.get('/wx/:lat/:lng', (req, res) => {
        let reqBody = req.body;
        let url = `https://api.darksky.net/forecast/${darkSkyApiKey}/${req.params.lat},${req.params.lng}`;
        axios.get(url).then((wxRes) => {
            var cur = wxRes.data.currently;
            res.send({
                currentWx: {
                    temp: cur.temperature,
                    dewPoint: cur.dewPoint,
                    pressure: cur.pressure,
                    windBearing: cur.windBearing,
                    windSpeed: cur.windSpeed
                }
            });
        });
    });

    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
}

export default server;
