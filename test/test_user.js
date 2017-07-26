process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    Usuario.remove({}), (err) =>{
      done();
    });
  });

  describe('Create user', () =>{
    it('it should create user without errors', (done) =>{
      let user = {
        matricula: "201413530213",
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
          matricula: "2014 13530213",
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
          matricula: "201413530213",
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
            matricula: "201413530213",
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


                describe('GET Users', () => {
                  beforeEach((done) => {
                    Usuario.remove({}), (err) =>{
                      done();
                    });
                  });


            describe('GET user', () =>{
              it('it should GET a user without errors', (done) => {
                let user = new Usuario({
                  matricula: "201413530213",
              	  nome: "Ale",
              	  senha: "oioioi",
              	  adm: true,
              	  limite: 3,
                })
                user.save((err, user) => {
                    console.log('erro', err)
                    console.log('user', user)
                    chai.request(server)
                    .get('/api/users/' + user._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql('true');
                        res.body.should.have.property('result');
                        res.body.should.have.property('matricula').eql("201413530213");
                        res.body.should.have.property('nome').eql("Ale");
                        res.body.should.have.property('senha').eql("oioioi");
                        res.body.should.have.property('adm').eql('true');
                        res.body.should.have.property('limite').eql('3');
                        res.body.should.have.property('_id').eql(user._id);
                      done();
                    });
                });

              });

              /*it('it should not GET a user with invalid matricula ', (done) => {
                let user = new Usuario({
                  matricula: "201413530213",
                  nome: "Ale",
                  senha: "oioioi",
                  adm: true,
                  limite: 3,
                })
                user.save((err, user) => {
                    console.log('erro', err)
                    console.log('user', user)
                    chai.request(server)
                    .get('/api/users/' + user._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql('true');
                        res.body.should.have.property('result');
                        res.body.should.have.property('matricula').eql("201413530213");
                      done();
                    });
                });

              });
*/




          });
