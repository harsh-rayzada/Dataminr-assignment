import chai from 'chai';
import ChaiHttp from 'chai-http';
import app from '../app';
let should = chai.should();
chai.use(ChaiHttp);

describe('/GET all tasks', () => {
    it('it should get all tasks', (done) => {
        chai.request(app)
        .get('/api/tasks')
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('tasks');
            res.body.tasks.should.be.a('array');
            if(res.body.tasks.length > 0){
                res.body.tasks[0].should.be.a('object');
                res.body.tasks[0].should.have.property('task_id');
            }
            res.should.have.status(200);
            done();
        });
    });
});

describe('/POST create single task', () => {
    it('it should create single task based on given input', (done) => {
        chai.request(app)
        .post('/api/task')
        .send({
            title: 'Task22',
            description: 'description of Task22'
        })
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Task created successfully');
            res.should.have.status(200);
            done();
        });
    });
});