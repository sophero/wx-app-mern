const User = require('../models/user');

module.exports = {

    create(req, res, next) {
        const userProps = req.body;
        User.create(userProps)
            .then(user => res.send(user))
            .catch(next);
    },

    edit(req, res, next) {
        const userId = req.params.id;
        const userProps = req.body;

        User.findByIdAndUpdate(userId, userProps)
            .then(() => User.findById(userId))
            .then(user => res.send(user))
            .catch(next);
    },

    delete(req, res, next) {
        const userId = req.params.id;

        User.findByIdAndRemove(userId)
            .then(user => res.status(204).send(user))
            .catch(next);
    }

};
