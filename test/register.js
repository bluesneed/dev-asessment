process.env.NODE_ENV = "test";
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)


describe('/Create Teacher', () => {
    it('it should create user', (done) => {
        const teacher = {
            email: "12345"
        };
        chai.request(app)
            .post('/register')
            .send(teacher)
            .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.be.a('object');
                done();
            });
    });
});