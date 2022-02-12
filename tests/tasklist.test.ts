import chai from 'chai';
import ChaiHttp from 'chai-http';
import app from '../app';
let should = chai.should();
chai.use(ChaiHttp);

describe('/GET all task lists', () => {
    it('it should get all task lists', (done) => {
        chai.request(app)
        .get('/api/tasklists')
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('tasklists');
            res.body.tasklists.should.be.a('array');
            if(res.body.tasklists.length > 0){
                res.body.tasklists[0].should.be.a('object');
                res.body.tasklists[0].should.have.property('tasklist_id');
            }
            res.should.have.status(200);
            done();
        });
    });
});

describe('/POST create single tasklist', () => {
    it('it should create single tasklist based on given input', (done) => {
        chai.request(app)
        .post('/api/tasklist')
        .send({
            title: 'TaskList99',
            description: 'description of Tasklist99'
        })
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Tasklist created successfully');
            res.should.have.status(200);
            done();
        });
    });
});