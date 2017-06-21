// const assert = require('assert');
// const request = require('supertest');
// const app = require('../../services/dist/server');
// const mongoose = require('mongoose');
// const Post = mongoose.model('post');
//
// describe('Post controller', () => {
//
//     it('GET to /api/posts finds posts in a location', (done) => {
//         seattleDriver = new Driver({
//             email: 'seattle@test.com',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [-122.4759902, 47.6147628]
//             }
//         });
//         miamiDriver = new Driver({
//             email: 'miami@test.com',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [-80.253, 25.791]
//             }
//         });
//         Promise.all([ seattleDriver.save(), miamiDriver.save() ])
//             .then(() => {
//                 request(app)
//                     // .get('/api/drivers?lng=-80&lat=25')
//                     .get('/api/drivers?lng=-122&lat=48')
//                     .end((err, response) => {
//                         console.log(response.body);
//                         // dis = distance in metres
//                         assert(response.body.length === 1);
//                         assert(response.body[0].obj.email === 'seattle@test.com');
//                         done();
//                     });
//             });
//     });
//
// }
