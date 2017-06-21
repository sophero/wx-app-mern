const UsersController = require('./controllers/users_controller');
const WxApiController = require('./controllers/wx_api_controller');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile('/index.html');
    });

    app.post('/api/users', UsersController.create);
    app.put('/api/users/:id', UsersController.edit);
    app.delete('/api/users/:id', UsersController.delete);

    app.get('/api/wx/:lat/:lng', WxApiController.curWeather);
    app.get('/api/radar/:lat/:lng', WxApiController.curRadar);
};
