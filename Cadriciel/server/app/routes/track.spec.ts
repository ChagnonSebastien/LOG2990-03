import { assert } from 'chai';

describe('Track', () => {
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    chai.use(chaiHttp);
    const apiUrl = 'http://localhost:3000/api';

    it('Should be true', (done) => {
        assert(true);
        done();
    });

    it('Should create a new track in the database', (done) => {
        chai.request(apiUrl)
            .post('/tracks')
            .send({
                id: "1",
                name: "test",
                description: "this is a test",
                type: "pro",
                trackIntersections: [{ "x": 1, "y": 1 }],
                puddles: [{ "distance": 1, "offset": 1 }],
                potholes: [{ "distance": 1, "offset": 1 }],
                boosters: [{ "distance": 1, "offset": 1 }]
            }).end((err: any, res: any) => {
                assert(JSON.parse(res.text).data === 'success');
                done();
            });
    });

    it('Should return a list of tracks', (done) => {
        chai.request(apiUrl)
            .get('/tracks')
            .end((err: any, res: any) => {
                let tracks = JSON.parse(res.text);
                assert(tracks.length > 0);
                done();
            });
    });
});