process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}), (err) =>{
      done();
    });
  });

  describe('Create user', )
    it('it should create user without errors', (done) =>{
    let dados = {

    }
    chai.request(sever)
        .get('/api/users')
        .end((err, res) => {

        })
  })
})
