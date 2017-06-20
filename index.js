const server = require('./services/dist/server');
// server.default();
server.listen(3000, () => {
    console.log('App listening on port 3000!');
});
