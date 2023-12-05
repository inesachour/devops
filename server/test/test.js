const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API Tests', () => {
  let userId;

  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/create-user')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        designation: 'Software Engineer',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message', 'Record Created Successfully');
        userId = res.body.data._id; // Save user ID for future tests
        done();
      });
  });

  it('should fetch all users', (done) => {
    chai
      .request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  /*it('should fetch an individual user', (done) => {
    chai
      .request(app)
      .get(`/users/${userId}`)
      .end((err, res) => {
        console.log("Response:", res.body); 
        if(err){
            console.error(err);
            done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('_id', userId);
        done();
      });
  });*/

  it('should update an individual user', (done) => {
    chai
      .request(app)
      .patch(`/update/${userId}`)
      .send({ designation: 'Senior Software Engineer' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message', 'Details Updated Successfully');
        expect(res.body.data).to.have.property('designation', 'Senior Software Engineer');
        done();
      });
  });

  it('should delete an individual user', (done) => {
    chai
      .request(app)
      .delete(`/delete/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message', 'User Deleted Successfully');
        done();
      });
  });
});
