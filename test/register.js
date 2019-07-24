process.env.NODE_ENV = "test";
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp);


describe('/register student success', () => {
    it('it should create teacher and register user', (done) => {
        const registerRequest = {
            teacher: "12345@school.com",
            students: [
                "student1@school.com",
                "student2@school.com"
            ]
        };
        chai.request(app)
            .post('/api/register')
            .send(registerRequest)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});


describe('/register student failed', () => {
    it('it should return error as teacher is not email', (done) => {
        const registerRequest = {
            teacher: "12345 @school.com",
            students: [
                "student1@school.com",
                "student2@school.com"
            ]
        };
        chai.request(app)
            .post('/api/register')
            .send(registerRequest)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });
});