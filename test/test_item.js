process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    Item_Biblioteca.remove({}), (err) =>{
      done();
    });
  });

// NÃO MEXI AINDA

  describe('Create item', () =>{
    it('it should create user without errors', (done) =>{
      let user = {
        matricula: 201413530213,
    	  nome: "Ale",
    	  senha: "oioioi",
    	  adm: true,
    	  limite: 3,
          }
      chai.request(sever)
        .post('/api/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('sucess').eql(true);
          res.body.should.have.property('user');
          done();
        });
      });

      it('it should not create a user with invalid matricula', (done) => {
        let user = {
          matricula: "201413530213",
        	nome: "Ale",
        	senha: "oioioi",
        	adm: true,
        	limite: 3,
        }
        chai.request(server)
          .post('/api/user')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.deep.property('details.errors.matricula');
            done();
            });
      });

      it('it should not create a user with invalid nome', (done) => {
        let user = {
          matricula: 201413530213,
          nome: "Ale Linda",
          senha: "oioioi",
          adm: true,
          limite: 3,
            }
        chai.request(server)
          .post('/api/user')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.deep.property('details.errors.nome');
            done();
                });
          });

        it('it should not create a user with invalid senha', (done) => {
            let user = {
              matricula: "201413530213",
              nome: "Ale",
              senha: "oi oi oi",
              adm: true,
              limite: 3,
                  }
            chai.request(server)
              .post('/api/user')
              .send(user)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.deep.property('details.errors.senha');
                done();
                    });
                });

        it('it should not create a user with invalid adm', (done) => {
          let user = {
            matricula: 201413530213,
            nome: "Ale",
            senha: "oioioi",
            adm: "true",
            limite: 3,
                    }
          chai.request(server)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.deep.property('details.errors.adm');
              done();
              });
          });

          it('it should not create a user with invalid limite', (done) => {
            let user = {
              matricula: "201413530213",
              nome: "Ale",
              senha: "oioioi",
              adm: true,
              limite: "3",
            }
            chai.request(server)
              .post('/api/user')
              .send(user)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.deep.property('details.errors.limite');
                done();
                });
              });
  })
