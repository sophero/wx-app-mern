const assert = require('assert');
const request = require('supertest');
const app = require('../../services/dist/server');
const mongoose = require('mongoose');
const User = mongoose.model('user');

describe('Users controller', () => {

    it('Post to api/users creates a new user', (done) => {
        User.count().then((count) => {
            request(app)
                .post('/api/users')
                .send({ email: 'test@test.com', password: 'hey' })
                .end(() => {
                    User.count().then(newCount => {
                        assert(count + 1 === newCount)
                        done();
                    });
                });
        });
    });

    it('PUT to /api/users/id edits an existing user', (done) => {
        const user = new User({ email: 't@t.com', password: 'hey' });
        user.save().then(() => {
            request(app)
                .put(`/api/users/${user._id}`)
                .send({ password: 'ho' })
                .end(() => {
                    User.findOne({ email: 't@t.com' })
                    .then((user) => {
                        assert(user.password === 'ho');
                        done();
                    })
                })
        });
    });

    it('DELETE to /api/users/id deletes an existing user', (done) => {
        const user = new User({ email: 'test@test.com', password: 'hey' });
        user.save().then(() => {
            request(app)
                .delete(`/api/users/${user._id}`)
                .end(() => {
                    User.findOne({ email: 'test@test.com' })
                    .then((user) => {
                        assert(user === null);
                        done();
                    });
                });
        });
    });

});
